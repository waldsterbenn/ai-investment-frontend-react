import { useCallback, useContext, useState } from "react";
import { ServiceModel } from "../model/serviceModel";
import StockContext from "../store/StockContext";

export default function TechnicalAnalysis({
  serviceModel,
}: {
  serviceModel: ServiceModel;
}) {
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [report, setReport] = useState<{ __html: string } | null>(null);
  const stockCtx = useContext(StockContext);

  const runTechnicalAnalysis = useCallback(async () => {
    if (!isRunningAnalysis && stockCtx?.currentStock) {
      setIsRunningAnalysis(true);
      try {
        setReport(null);
        const report = await serviceModel.generateReport(stockCtx.currentStock);
        setReport({ __html: report });
      } finally {
        setIsRunningAnalysis(false);
      }
    }
  }, [isRunningAnalysis, stockCtx, serviceModel]);

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
