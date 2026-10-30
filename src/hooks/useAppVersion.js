
import { useEffect } from "react";


// 1 minute	60_000
// 2 minutes	120_000
// 5 minutes	300_000
// 10 minutes	600_000
// 15 minutes	900_000
// 30 minutes	1_800_000

const CHECK_INTERVAL = 60_000;

export function useAppVersion() {
    useEffect(() => {
        console.log('inside version effect');
        let currentVersion = null;
        let stopped = false;
        let checking = false;

        async function checkVersion() {
            console.log('inside version');

            if (stopped || checking) return;
            checking = true;

            try {
                const response = await fetch("/version.json", {
                    cache: "no-store",
                });

                if (!response.ok) return;

                const data = await response.json();

                if (typeof data.version !== "string") return;

                if (currentVersion === null) {
                    currentVersion = data.version;
                    return;
                }

                if (data.version !== currentVersion) {
                    // Prevent repeated reload attempts.
                    stopped = true;
                    window.location.reload();
                }
            } catch (error) {
                // A temporary network failure should not break the app.
                console.warn("Unable to check app version:", error);
            } finally {
                checking = false;
            }
        }

        checkVersion();

        const intervalId = window.setInterval(
            checkVersion,
            CHECK_INTERVAL
        );

        // Check immediately when the user returns to the tab.
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                checkVersion();
            }
        };

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        return () => {
            stopped = true;
            window.clearInterval(intervalId);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);
}
