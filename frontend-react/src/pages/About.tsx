export default function About() {
  return (
    <div className="container text-left w-75">
      <div className="row justify-content-md-center">
        <div className="col col-lg-2"></div>
        <div className="col col-md-auto">
          <div className="card">
            <header className="card-header">
              <h3 className="card-title">About this app</h3>
            </header>
            <div className="card-body">
              <blockquote className="blockquote">
                <span className="card-text">
                  You can analyse company stocks and use the reports as you see
                  fit.
                </span>
              </blockquote>
              <h4>Features:</h4>
              <ol>
                <li>
                  Techical Analysis: LLM will analyse a stock's performance and
                  evaluate it's near-term price direction, based on technical
                  indicators.
                </li>
                <li>
                  You can copy an analysis report and save the Markdown text for
                  later.
                </li>
              </ol>
            </div>
            <footer className="card-footer text-end"></footer>
          </div>
        </div>
        <div className="col col-lg-2"></div>
      </div>
    </div>
  );
}
