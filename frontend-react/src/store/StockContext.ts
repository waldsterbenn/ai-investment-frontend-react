import { createContext } from "react";

export class Stock {
  name: string;
  ticker_symbol: string;
  buyPrice: number;
  currency: string;
  buyDate: string;

  constructor(
    name: string,
    ticker_symbol: string,
    buyPrice: number,
    currency: string,
    buyDate: string
  ) {
    this.name = name;
    this.ticker_symbol = ticker_symbol;
    this.buyPrice = buyPrice;
    this.currency = currency;
    this.buyDate = buyDate;
  }
}

export interface StockContextProps {
  currentStock: Stock | null | undefined;
  setCurrentStock: (newStockData: Stock) => void;
  isLoading: boolean;
  error: (err: string) => void;
}

const StockContext = createContext<StockContextProps | null>(null);

export default StockContext;
