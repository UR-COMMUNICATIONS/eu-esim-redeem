import { commercialRoutes, images } from "@/services";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div>
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-10">
          <div className="w-full max-w-[640px] mx-auto">
            <img src={images.notFoundPage} alt="" className="w-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Page Not Found</h2>
          <Link
            to={commercialRoutes.home.path}
            className="px-6 py-3 bg-main-600 text-white font-medium rounded-full"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
