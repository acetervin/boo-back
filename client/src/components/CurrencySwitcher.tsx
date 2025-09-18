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
    <Select value={currency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className="w-20 h-8 text-sm">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="KES">KES</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  const toggleCurrency = () => {
    setCurrency(currency === 'KES' ? 'USD' : 'KES');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleCurrency}
      className="text-muted-foreground hover:text-foreground transition-colors font-medium px-2 py-1 h-auto"
    >
      {currency}
    </Button>
  );
}