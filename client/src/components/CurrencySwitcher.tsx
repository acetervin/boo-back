import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DollarSign, Banknote } from 'lucide-react';
import { useCurrency, type Currency } from '@/contexts/CurrencyContext';

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (value: Currency) => {
    setCurrency(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={currency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="KES">
            <div className="flex items-center space-x-2">
              <Banknote className="h-4 w-4" />
              <span>KES</span>
            </div>
          </SelectItem>
          <SelectItem value="USD">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>USD</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  const toggleCurrency = () => {
    setCurrency(currency === 'KES' ? 'USD' : 'KES');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleCurrency}
      className="flex items-center space-x-2"
    >
      {currency === 'KES' ? (
        <>
          <Banknote className="h-4 w-4" />
          <span>KES</span>
        </>
      ) : (
        <>
          <DollarSign className="h-4 w-4" />
          <span>USD</span>
        </>
      )}
    </Button>
  );
}