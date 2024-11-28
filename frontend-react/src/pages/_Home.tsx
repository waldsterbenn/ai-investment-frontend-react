"use client";
import { useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([
    { to: "/", text: "Overview" },
    { to: "/selectstock", text: "Select Stock" },
    { to: "/fundamentalanlysis", text: "Fundamental Analysis" },
    { to: "/technicalanalysis", text: "Technical Analysis" },
    { to: "/about", text: "About" },
  ]);
  const routeLinks = links.map((link) => (
    <li className="nav-item" key={link.to}>
      <button
        className="btn btn-primary"
        type="button"
        // onClick={() => router.push("/" + link.text)}
      >
        {link.text}
      </button>
    </li>
  ));

  const [selectedItem] = useState({ stock: "" });

  return (
    <>
      <div className="container py-4 px-3 mx-auto">
        <nav className="navbar navbar-expand-lg bg-primary-subtle border border-primary rounded mb-2">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <button className="btn btn-secondary" type="button">
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">{routeLinks}</ul>

              {selectedItem.stock ? (
                <span className="nav-text">
                  {/* <ToolingIcon /> {{ selectedItem.stock.name }} ({{ selectedItem.stock.ticker_symbol }})
              <!-- <p>Buy Price: {{ selectedItem.stock.buy_price }} {{ selectedItem.stock.currency }}</p>
                  <p>Buy Date: {{ selectedItem.stock.buy_date }}</p> --> */}
                </span>
              ) : (
                <span className="nav-text">No company selected</span>
              )}
            </div>
          </div>
        </nav>

        <div className="wrapper">test</div>
      </div>
    </>
  );
}
