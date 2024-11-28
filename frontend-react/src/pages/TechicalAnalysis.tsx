import axios from "axios";
import { useCallback, useState } from "react";

export default function TechnicalAnalysis(props: any) {
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [report, setReport] = useState<{ __html: string } | null>(null);

  const runTechnicalAnalysis = useCallback(async () => {
    if (!isRunningAnalysis && props.selectedItem?.stock) {
      setIsRunningAnalysis(true);
      setReport(null);
      try {
        const response = await axios.post(
          "http://localhost:3001/api/run-technical-analysis",
          props.selectedItem.stock,
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
  }, [isRunningAnalysis, props.selectedItem?.stock]);

  return (
    <div className="pre-container">
      <div className="card">
        <div className="card-body">
          {props.selectedItem?.stock && !report ? (
            <span>
              You can run an analysis on {props.selectedItem.stock.name}, it may
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
              disabled={!props.selectedItem?.stock}
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
