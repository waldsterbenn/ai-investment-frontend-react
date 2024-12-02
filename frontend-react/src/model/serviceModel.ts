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
    const newLocal = new URL("portfolio", this.backendUrl);
    const url = newLocal.toString();
    const response = await axios.get(url);
    return response.data.portfolio;
  }
}
