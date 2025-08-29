import { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'KES' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number; // Fixed rate: 1 USD = X KES
  convertPrice: (price: number, fromCurrency: Currency, toCurrency: Currency) => number;
  formatPrice: (price: number, currency?: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Fixed exchange rate (1 USD = 130 KES)
const FIXED_EXCHANGE_RATE = 130;

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>('KES');

  const convertPrice = (price: number, fromCurrency: Currency, toCurrency: Currency): number => {
    if (fromCurrency === toCurrency) return price;
    
    if (fromCurrency === 'KES' && toCurrency === 'USD') {
      return price / FIXED_EXCHANGE_RATE;
    } else if (fromCurrency === 'USD' && toCurrency === 'KES') {
      return price * FIXED_EXCHANGE_RATE;
    }
    
    return price;
  };

  const formatPrice = (price: number, targetCurrency?: Currency): string => {
    const curr = targetCurrency || currency;
    
    if (curr === 'USD') {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    } else {
      return `KES ${Math.round(price).toLocaleString('en-KE')}`;
    }
  };

  const value = {
    currency,
    setCurrency,
    exchangeRate: FIXED_EXCHANGE_RATE,
    convertPrice,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}