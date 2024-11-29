import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import StockContext, { Stock } from "../store/StockContext";

export default function SelectStock() {
  const [items, setItems] = useState<Stock[]>([]);

  // Get ref to global app storage. Set selected value on the ctx to send changes to others
  const stockCtx = useContext(StockContext);

  //Memorize function to avoid recreating on subsequent renders
  const fetchPortfolio = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/portfolio");
      setItems(response.data.portfolio);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        //Send error up
        stockCtx?.error(error.message);
      }
    }
  }, [stockCtx]);

  // Use useEffect to trigger the API call when component mounts
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return (
    <div className="container text-start">
      <div className="row justify-content-md-center">
        <div className="col col-lg-2"></div>
        <div className="col col-md-auto">
          <div className="card">
            <header className="card-header">
              <h3 className="card-title">Portfolio with available companies</h3>
              <span className="card-text">
                Select a company to continue with the investigation.
              </span>
            </header>
            <div className="card-body">
              <div className="form-check">
                {items?.map((item, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="stockSelection"
                      onChange={() => stockCtx?.setCurrentStock(item)}
                    />
                    <label className="form-check-label">
                      {item.name} ({item.ticker_symbol})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <footer className="card-footer text-end">
              <button className="btn btn-primary" type="button">
                Back
              </button>
            </footer>
          </div>
        </div>
        <div className="col col-lg-2"></div>
      </div>
    </div>
  );
}
