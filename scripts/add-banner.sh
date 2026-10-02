#!/usr/bin/env bash
# add-banner.sh — Convert banner images to WebP, auto-name them, and insert slide entries into Hero.jsx
# Usage: bash scripts/add-banner.sh
# Place raw images (any format) in ~/Desktop/banner-images/ before running.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BANNER_DIR="$REPO_ROOT/src/assets/images/banner"
HERO_JSX="$REPO_ROOT/src/components/commercial/home/Hero.jsx"
QUALITY=60
INPUT_DIR="$HOME/Desktop/banner-images"

# ── colours ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; YELLOW='\033[1;33m'; GREEN='\033[0;32m'; NC='\033[0m'
info()  { echo -e "${GREEN}[INFO]${NC}  $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; }

# ── dependency checks ─────────────────────────────────────────────────────────
check_deps() {
  local missing=()
  command -v cwebp  &>/dev/null || missing+=("cwebp (brew install webp)")
  command -v sips   &>/dev/null || missing+=("sips (macOS built-in — should always be present)")
  command -v python3 &>/dev/null || missing+=("python3")
  if [[ ${#missing[@]} -gt 0 ]]; then
    error "Missing dependencies:"
    for m in "${missing[@]}"; do echo "  • $m"; done
    exit 1
  fi
}

# ── helpers ───────────────────────────────────────────────────────────────────

# Returns pixel width of an image using sips
img_width() {
  sips -g pixelWidth "$1" 2>/dev/null | awk '/pixelWidth/{print $2}'
}

# Extracts the first segment before - or _ and lowercases it
# e.g. "SG-WEB.jpg" → "sg", "hk_mobile.png" → "hk"
file_prefix() {
  python3 - "$1" <<'PY'
import sys, os, re
name = os.path.splitext(os.path.basename(sys.argv[1]))[0]
prefix = re.split(r'[-_]', name)[0]
print(prefix.lower())
PY
}

# PascalCase → snake_case  e.g. "EscapeHoliday" → "escape_holiday"
pascal_to_snake() {
  python3 - "$1" <<'PY'
import sys, re
s = sys.argv[1]
s = re.sub(r'([A-Z])', r'_\1', s).lstrip('_').lower()
print(s)
PY
}

# snake_case / any string → PascalCase  e.g. "escape_holiday" → "EscapeHoliday"
to_pascal() {
  python3 - "$1" <<'PY'
import sys
parts = sys.argv[1].replace('-', '_').split('_')
print(''.join(p.capitalize() for p in parts if p))
PY
}

# PascalCase → Title Case  e.g. "EscapeHoliday" → "Escape Holiday"
to_title() {
  python3 - "$1" <<'PY'
import sys, re
s = sys.argv[1]
s = re.sub(r'([A-Z])', r' \1', s).strip()
print(s)
PY
}

# Convert a single image file to WebP
convert_to_webp() {
  local src="$1" dest="$2"
  local ext
  ext=$(printf '%s' "${src##*.}" | tr '[:upper:]' '[:lower:]')

  # cwebp supports: jpg/jpeg, png, tiff, webp
  # For other formats (heic, bmp, gif…) pre-convert with magick
  case "$ext" in
    jpg|jpeg|png|tiff|tif|webp)
      cwebp -q "$QUALITY" -mt -quiet "$src" -o "$dest"
      ;;
    *)
      if command -v magick &>/dev/null; then
        local tmp
        tmp=$(mktemp /tmp/banner_XXXXXX.png)
        magick "$src" "$tmp"
        cwebp -q "$QUALITY" -mt -quiet "$tmp" -o "$dest"
        rm -f "$tmp"
      else
        warn "Skipping $src — unsupported format ($ext) and ImageMagick not found."
        return 1
      fi
      ;;
  esac
}

# Insert a slide block before the closing ]; of heroSlides in Hero.jsx
insert_slide() {
  local block="$1"
  # Use python3 to find the last ]; and insert before it (awk on macOS has edge cases)
  python3 - "$HERO_JSX" "$block" <<'PY'
import sys

filepath = sys.argv[1]
block    = sys.argv[2]

with open(filepath, 'r') as f:
    lines = f.readlines()

# Find the last line that is exactly "];" (with optional leading whitespace)
insert_at = None
for i in range(len(lines) - 1, -1, -1):
    if lines[i].strip() == '];':
        insert_at = i
        break

if insert_at is None:
    print("ERROR: Could not find ]; in Hero.jsx", file=sys.stderr)
    sys.exit(1)

slide_lines = [l + '\n' for l in block.split('\n')]
lines[insert_at:insert_at] = slide_lines

with open(filepath, 'w') as f:
    f.writelines(lines)

print(f"Inserted slide block at line {insert_at + 1}")
PY
}

# ── process a single desktop+mobile pair ──────────────────────────────────────
process_pair() {
  local desktop_src="$1" mobile_src="$2"

  info "─────────────────────────────────────────────"
  info "Desktop : $desktop_src"
  info "Mobile  : $mobile_src"

  # Derive prefix from the desktop filename
  local PREFIX
  PREFIX=$(file_prefix "$desktop_src")
  local COUNTRY_CODE
  COUNTRY_CODE=$(printf '%s' "$PREFIX" | tr '[:lower:]' '[:upper:]')

  info "Detected country prefix: $COUNTRY_CODE"

  # Ask user for the slide key (PascalCase noun only — prefix will be prepended)
  echo ""
  printf "Enter slide key for this pair (PascalCase, e.g. EscapeHoliday): "
  local RAW_KEY
  read -r RAW_KEY < /dev/tty

  if [[ -z "$RAW_KEY" ]]; then
    warn "No key entered — skipping this pair."
    return
  fi

  # Normalise: ensure it's PascalCase regardless of what user typed
  local PASCAL_KEY
  PASCAL_KEY=$(to_pascal "$RAW_KEY")

  # Full slide key includes country prefix: HkEscapeHoliday
  local PREFIX_PASCAL
  PREFIX_PASCAL=$(to_pascal "$PREFIX")
  local SLIDE_KEY="${PREFIX_PASCAL}${PASCAL_KEY}"

  # Guard against duplicate slide keys
  if grep -q "\"$SLIDE_KEY\"" "$HERO_JSX" 2>/dev/null; then
    warn "Slide key '$SLIDE_KEY' already exists in Hero.jsx — skipping."
    return
  fi

  # Build output filenames
  local SNAKE_KEY
  SNAKE_KEY=$(pascal_to_snake "$PASCAL_KEY")
  local DESKTOP_NAME="${PREFIX}_${SNAKE_KEY}_desktop.webp"
  local MOBILE_NAME="${PREFIX}_${SNAKE_KEY}_mobile.webp"
  local DESKTOP_DEST="$BANNER_DIR/$DESKTOP_NAME"
  local MOBILE_DEST="$BANNER_DIR/$MOBILE_NAME"

  info "Output desktop : $DESKTOP_NAME"
  info "Output mobile  : $MOBILE_NAME"

  # Convert
  info "Converting desktop image..."
  if ! convert_to_webp "$desktop_src" "$DESKTOP_DEST"; then
    warn "Desktop conversion failed — skipping pair."
    return
  fi

  info "Converting mobile image..."
  if ! convert_to_webp "$mobile_src" "$MOBILE_DEST"; then
    warn "Mobile conversion failed — skipping pair."
    return
  fi

  info "Converted successfully."

  local TITLE
  TITLE=$(to_title "$PASCAL_KEY")

  # Image name strings (without .webp — Banner.jsx appends the extension at runtime)
  local DESKTOP_STR="${PREFIX}_${SNAKE_KEY}_desktop"
  local MOBILE_STR="${PREFIX}_${SNAKE_KEY}_mobile"

  # Build slide entry block using <Banner> (same as all other slides in Hero.jsx)
  local SLIDE_BLOCK
  SLIDE_BLOCK=$(cat <<BLOCK
  {
    key: '$SLIDE_KEY',
    component: (
      <Banner
        desktopImage="${DESKTOP_STR}"
        mobileImage="${MOBILE_STR}"
        altAttr="${COUNTRY_CODE} ${TITLE} Travel eSIM"
        titleAttr="${TITLE}"
      />
    ),
    navbarStyle: { isWhite: false, isRedBorder: false, isBlack: true },
    dotColor: 'bg-white',
    showForCountries: ["${COUNTRY_CODE}"],
  },
BLOCK
)

  insert_slide "$SLIDE_BLOCK"
  info "Slide '$SLIDE_KEY' inserted into Hero.jsx."
  echo ""
  info "${GREEN}Done!${NC} $SLIDE_KEY added."
}

# ── main ──────────────────────────────────────────────────────────────────────
main() {
  check_deps

  if [[ ! -d "$INPUT_DIR" ]]; then
    error "Input folder not found: $INPUT_DIR"
    error "Create the folder and place your raw banner images inside it, then re-run."
    exit 1
  fi

  if [[ ! -d "$BANNER_DIR" ]]; then
    error "Banner output dir not found: $BANNER_DIR"
    exit 1
  fi

  if [[ ! -f "$HERO_JSX" ]]; then
    error "Hero.jsx not found: $HERO_JSX"
    exit 1
  fi

  # Collect all supported image files
  local ALL_FILES=()
  while IFS= read -r f; do
    ALL_FILES+=("$f")
  done < <(find "$INPUT_DIR" -maxdepth 1 -type f \
    \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \
       -o -iname "*.webp" -o -iname "*.tiff" -o -iname "*.tif" \
       -o -iname "*.heic" -o -iname "*.bmp" \) \
    | sort)

  local TOTAL=${#ALL_FILES[@]}
  if [[ $TOTAL -eq 0 ]]; then
    warn "No images found in $INPUT_DIR"
    exit 0
  fi

  info "Found $TOTAL image(s) in $INPUT_DIR"

  # Group files by prefix using python3 (produces "fileA|fileB" lines, one per pair)
  local PAIRS
  PAIRS=$(python3 - "${ALL_FILES[@]}" <<'PY'
import sys, os, re
from collections import defaultdict

files = sys.argv[1:]
groups = defaultdict(list)

for f in files:
    name = os.path.splitext(os.path.basename(f))[0]
    prefix = re.split(r'[-_]', name)[0].lower()
    groups[prefix].append(f)

for prefix, group in sorted(groups.items()):
    if len(group) == 1:
        # single image — treat it as desktop, use itself as mobile placeholder
        print(f"{group[0]}|{group[0]}")
    else:
        # Determine which is wider (desktop) vs narrower (mobile)
        import subprocess
        def dimensions(path):
            try:
                out = subprocess.check_output(
                    ['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', path],
                    stderr=subprocess.DEVNULL
                ).decode()
                w = h = 0
                for line in out.splitlines():
                    if 'pixelWidth' in line:
                        w = int(line.split()[-1])
                    elif 'pixelHeight' in line:
                        h = int(line.split()[-1])
                return w, h
            except Exception:
                return 0, 0

        def is_landscape(path):
            w, h = dimensions(path)
            return w >= h  # landscape or square → desktop

        landscapes = [f for f in group if is_landscape(f)]
        portraits  = [f for f in group if not is_landscape(f)]
        desktop = landscapes[0] if landscapes else group[0]
        mobile  = portraits[0]  if portraits  else group[-1]
        print(f"{desktop}|{mobile}")
PY
)

  local PAIR_COUNT
  PAIR_COUNT=$(printf '%s\n' "$PAIRS" | grep -c '|' || true)
  info "Detected $PAIR_COUNT banner pair(s) to process."
  echo ""

  local i=1
  while IFS='|' read -r desktop mobile; do
    info "Processing pair $i / $PAIR_COUNT"
    process_pair "$desktop" "$mobile"
    (( i++ ))
  done <<< "$PAIRS"

  echo ""
  info "All pairs processed. Review Hero.jsx and start the dev server to verify."
}

main "$@"
