import axios from "axios";
import { Stock } from "../store/StockContext";

export class ServiceModel {
  backendUrl: string;
  errorCallback: (err: string) => void;
  constructor({
    backendUrl,
    errorCallback,
  }: {
    backendUrl: string;
    errorCallback: (err: string) => void;
  }) {
    this.backendUrl = backendUrl;
    this.errorCallback = errorCallback;
  }

  async getPortfolio(): Promise<Stock[]> {
    try {
      const url = new URL("portfolio", this.backendUrl).toString();
      const response = await axios.get(url);
      return response.data.portfolio;
    } catch (error) {
      if (error instanceof Error) {
        this.errorCallback(error.message);
      }
    }
    return [];
  }

  async generateReport(currentStock: Stock): Promise<string> {
    try {
      const url = new URL("run-technical-analysis", this.backendUrl).toString();
      const response = await axios.post(url, currentStock, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.report;
    } catch (error) {
      if (error instanceof Error) {
        this.errorCallback(error.message);
      }
    }
    return "";
  }
}
