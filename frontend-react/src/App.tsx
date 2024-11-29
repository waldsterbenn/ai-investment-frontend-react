import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import About from "./pages/About";
import SelectStock from "./pages/SelectStock";
import TechnicalAnalysis from "./pages/TechicalAnalysis";
import StockContext, { Stock } from "./store/StockContext";

const Overview = () => <div>Overview Content</div>;
const FundamentalAnalysis = () => <div>Fundamental Analysis Content</div>;

// Define a type for the component map
type ComponentMap = {
  [key: string]: React.ComponentType<any>;
};

const componentMap: ComponentMap = {
  Overview,
  SelectStock,
  TechnicalAnalysis,
  FundamentalAnalysis,
  About,
};

function App() {
  const [currentComponentName, setCurrentComponentName] =
    useState<string>("Overview");

  const links = useMemo(
    () => [
      { to: "/", text: "Overview", component: "Overview" },
      { to: "/selectstock", text: "Select Stock", component: "SelectStock" },
      {
        to: "/fundamentalanlysis",
        text: "Fundamental Analysis",
        component: "FundamentalAnalysis",
      },
      {
        to: "/technicalanalysis",
        text: "Technical Analysis",
        component: "TechnicalAnalysis",
      },
      { to: "/about", text: "About", component: "About" },
    ],
    []
  );

  const CurrentComponent = componentMap[currentComponentName];

  const routeLinks = links.map((link) => (
    <li className="nav-item ms-2" key={link.to}>
      <button
        className="btn btn-primary"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setCurrentComponentName(link.component);
        }}
      >
        {link.text}
      </button>
    </li>
  ));

  // The simple, but no good solution, will reinit the ctx object on every render
  // const ctx: StockContextProps = {
  //   currentStock: currentStock,
  //   isLoading: false,
  //   setCurrentStock: (stock) => setCurrentStock(stock),
  //   error: (err) => alert(err),
  // };

  const [currentStock, setCurrentStock] = useState<Stock | null | undefined>();

  //Make a persisting reference to an object
  const currentStockRef = useRef<Stock | null | undefined>(null);
  //Update the ref'ed obj when state changes
  useEffect(() => {
    currentStockRef.current = currentStock;
  }, [currentStock]);
  //Use memo to remember the expensive object creation, and avoid recreates
  const ctx = useMemo(
    () => ({
      currentStock: currentStockRef.current,
      isLoading: false,
      setCurrentStock: (stock: Stock) => setCurrentStock(stock),
      error: (err: String) => alert(err),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStockRef.current]
  );

  return (
    <StockContext.Provider value={ctx}>
      <div className="">
        <header className="">
          <div className="">
            <nav className="navbar navbar-expand-lg bg-primary-subtle border border-primary rounded mb-2">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentComponentName("Overview");
                    }}
                  >
                    Reset
                  </button>
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {routeLinks}
                  </ul>

                  {currentStock?.name ? (
                    <span className="nav-text">
                      {currentStock.name} ({currentStock.ticker_symbol})
                    </span>
                  ) : (
                    <span className="nav-text">No company selected</span>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div className="wrapper container py-4 px-3 mx-auto">
          <CurrentComponent />
        </div>
      </div>
    </StockContext.Provider>
  );
}

export default App;
