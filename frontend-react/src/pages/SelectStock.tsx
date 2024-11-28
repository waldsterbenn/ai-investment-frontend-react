import axios from "axios";
import { useCallback, useState } from "react";

export default function SelectStock() {
  const [items, setItems] =
    useState<[{ name: string; ticker_symbol: string }]>();

  useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/portfolio");
      setItems(response.data.portfolio);
    } catch (error) {
      console.error(error);
      //setItems([{ id: -1, name: 'Error fetching message' }]);
    }
  }, []);

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
              <div v-for="item in items" className="form-check">
                {items!.map((item) => (
                  <>
                    <input
                      type="radio"
                      className="form-check-input"
                      v-model="selectedItem.stock"
                    />
                    <label className="form-check-label">
                      {item.name} ({item.ticker_symbol})
                    </label>
                  </>
                ))}
              </div>
            </div>
            <footer className="card-footer text-end">
              {/* <RouterLink to="/"> */}
              <button className="btn btn-primary" type="button">
                Back
              </button>
              {/* </RouterLink> */}
            </footer>
          </div>
        </div>
        <div className="col col-lg-2"></div>
      </div>
    </div>
  );
}
