import axios from "axios";
import { useCallback, useContext, useState } from "react";
import StockContext from "../store/StockContext";

export default function TechnicalAnalysis() {
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [report, setReport] = useState<{ __html: string } | null>(null);
  const stockCtx = useContext(StockContext);

  const runTechnicalAnalysis = useCallback(async () => {
    if (!isRunningAnalysis && stockCtx?.currentStock) {
      setIsRunningAnalysis(true);
      setReport(null);
      try {
        const response = await axios.post(
          "http://localhost:3001/api/run-technical-analysis",
          stockCtx.currentStock,
          { headers: { "Content-Type": "application/json" } }
        );
        setReport({ __html: response.data.report });
      } catch (error) {
        console.error(error);
        alert(String(error));
      } finally {
        setIsRunningAnalysis(false);
      }
    }
  }, [isRunningAnalysis, stockCtx]);
  console.debug(stockCtx?.currentStock);
  return (
    <div className="pre-container">
      <div className="card">
        <div className="card-body">
          {!stockCtx?.currentStock && (
            <span>You have to select a stock before we can analyse</span>
          )}

          {stockCtx?.currentStock && !report ? (
            <span>
              You can run an analysis on {stockCtx?.currentStock.name}, it may
              take a while.
            </span>
          ) : (
            report && <div dangerouslySetInnerHTML={report} />
          )}
        </div>
        <footer className="card-footer text-end">
          <button
            disabled={!report}
            className="btn btn-secondary me-2"
            type="button"
          >
            Copy to clipboard
          </button>

          {isRunningAnalysis ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Analysing...
            </button>
          ) : (
            <button
              onClick={runTechnicalAnalysis}
              disabled={!stockCtx?.currentStock}
              className="btn btn-primary"
              type="button"
            >
              Run Analysis
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
