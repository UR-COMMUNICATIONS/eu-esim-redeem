import AppRouter from "./routes/Router";
// import { routes } from "./routes/Router";
import { HelmetProvider } from "react-helmet-async";
import DefaultSEO from "./components/SEO/DefaultSEO";

function App() {
  console.log = function () {};
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
