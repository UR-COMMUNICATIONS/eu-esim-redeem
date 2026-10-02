import React, { useRef, useEffect } from 'react';

const AutoResizeText = ({ children, maxLines = 2, className = '', baseFontSize = 64 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const adjustFontSize = () => {
      const container = containerRef.current;
      if (!container) return;

      // Reset to base font size first
      container.style.fontSize = `${baseFontSize}px`;

      const lineHeight = parseFloat(getComputedStyle(container).lineHeight);
      const maxHeight = lineHeight * maxLines;
      let currentFontSize = baseFontSize;

      while (container.scrollHeight > maxHeight && currentFontSize > 10) {
        currentFontSize -= 1;
        container.style.fontSize = `${currentFontSize}px`;
      }
    };

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [children, maxLines, baseFontSize]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default AutoResizeText;