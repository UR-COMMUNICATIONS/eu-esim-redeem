import { cn } from "@/lib/utils";

const NavBarSecondarySkeleton = () => {
    return (
        <header
            className={cn(
                "sticky top-0 left-0 w-full z-40 duration-300 border-b border-neutral-200 bg-gray-100"
            )}
        >
            <div className="w-full max-w-[1600px] mx-auto">
                <nav
                    className={cn(
                        "w-full duration-300 flex items-center lg:gap-10 2xl:gap-15 justify-between px-4 py-2 sm:py-4"
                    )}
                >
                    {/* Left side: Logo + Mobile icons */}
                    <div className="flex w-full xl:w-auto items-center gap-2 sm:gap-6 justify-between">
                        <div className="h-8 w-28 bg-gray-300 rounded-[12px] animate-pulse"></div>

                        <div className="flex flex-col gap-1 xl:hidden">
                            <div className="h-1 w-6 bg-gray-300 animate-pulse"></div>
                            <div className="h-1 w-6 bg-gray-300 animate-pulse"></div>
                            <div className="h-1 w-6 bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Right side: Menu items + Buttons */}
                    <div
                        className={cn(
                            "flex-1 hidden xl:flex items-center justify-between text-lg xl:text-sm font-semibold"
                        )}
                    >
                        {/* Menu links */}
                        <ul className="flex gap-4">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <li
                                    key={idx}
                                    className="h-5 w-20 bg-gray-300 rounded-full animate-pulse"
                                ></li>
                            ))}
                        </ul>

                        {/* Action buttons */}
                        <div className="flex gap-3 items-center">
                            <div className="h-10 w-44 bg-gray-300 rounded-[12px] animate-pulse"></div>
                            <div className="h-10 w-44 bg-gray-300 rounded-[12px] animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default NavBarSecondarySkeleton;
