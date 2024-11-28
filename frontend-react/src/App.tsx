import { useState } from "react";
import "./App.css";
import About from "./pages/About";
import TechnicalAnalysis from "./pages/TechicalAnalysis";
// Create some example components to switch between
const Overview = () => <div>Overview Content</div>;
const SelectStock = () => <div>Select Stock Component</div>;
const FundamentalAnalysis = () => <div>Fundamental Analysis Content</div>;

function App() {
  const [links] = useState([
    { to: "/", text: "Overview", component: Overview },
    { to: "/selectstock", text: "Select Stock", component: SelectStock },
    {
      to: "/fundamentalanlysis",
      text: "Fundamental Analysis",
      component: FundamentalAnalysis,
    },
    {
      to: "/technicalanalysis",
      text: "Technical Analysis",
      component: TechnicalAnalysis,
    },
    { to: "/about", text: "About", component: About },
  ]);

  // State to track the current component
  const [currentComponent, setCurrentComponent] = useState(Overview);

  const routeLinks = links.map((link) => (
    <li className="nav-item" key={link.to}>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => setCurrentComponent(link.component)}
      >
        {link.text}
      </button>
    </li>
  ));

  const [selectedItem] = useState({ stock: "" });

  return (
    <div className="">
      <header className="">
        <div className="">
          <nav className="navbar navbar-expand-lg bg-primary-subtle border border-primary rounded mb-2">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setCurrentComponent(Overview)}
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

                {selectedItem.stock ? (
                  <span className="nav-text"></span>
                ) : (
                  <span className="nav-text">No company selected</span>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="wrapper container py-4 px-3 mx-auto">
        {/* Render the current component */}
        {currentComponent}
      </div>
    </div>
  );
}

export default App;
