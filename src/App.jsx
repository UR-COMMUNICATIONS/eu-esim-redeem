import AppRouter from "./routes/Router";
// import { routes } from "./routes/Router";
import { HelmetProvider } from "react-helmet-async";
import DefaultSEO from "./components/SEO/DefaultSEO";
import { useAppVersion } from "./hooks/useAppVersion";

function App() {
  useAppVersion();
  console.log = function () { };
  // const visitorId = useVisitorId();
  // useTracking();
  return (
    <HelmetProvider>
      <DefaultSEO />
      <div className="font-dmsans">
        <AppRouter />
      </div>
    </HelmetProvider>
  );
}

export default App;
