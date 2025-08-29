import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  ArrowLeft, 
  CheckCircle,
  Calendar,
  Users,
  MapPin
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useToast } from '@/hooks/use-toast';
import type { Property } from '@shared/schema';

export default function PaymentPage() {
  const [, params] = useRoute('/payment/:id');
  const propertyId = params?.id ? parseInt(params.id) : null;
  const { formatPrice, convertPrice, currency } = useCurrency();
  const { toast } = useToast();
  
  const [guestInfo, setGuestInfo] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'mpesa'>('paypal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    enabled: !!propertyId,
  });

  useEffect(() => {
    const stored = localStorage.getItem('guest-info');
    if (stored) {
      setGuestInfo(JSON.parse(stored));
    } else {
      // Redirect back if no guest info
      window.location.href = propertyId ? `/checkout/${propertyId}` : '/properties';
    }
  }, [propertyId]);

  if (isLoading || !guestInfo || !property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { bookingDetails, pricing } = guestInfo;
  const checkIn = parseISO(bookingDetails.checkIn);
  const checkOut = parseISO(bookingDetails.checkOut);

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Create PayPal order
      const orderResponse = await fetch('/api/paypal/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: currency === 'USD' ? pricing.total : convertPrice(pricing.total, 'KES', 'USD'),
          currency: 'USD', // PayPal works better with USD
          intent: 'CAPTURE',
          description: `Booking for ${property.name}`,
          bookingData: guestInfo,
        }),
      });

      const orderData = await orderResponse.json();
      
      if (orderData.id) {
        // Redirect to PayPal for approval
        const approvalUrl = orderData.links.find((link: any) => link.rel === 'approve')?.href;
        if (approvalUrl) {
          window.location.href = approvalUrl;
        }
      } else {
        throw new Error(orderData.error || 'Failed to create PayPal order');
      }
    } catch (error) {
      console.error('PayPal payment error:', error);
      toast({
        title: 'Payment Error',
        description: 'Failed to initiate PayPal payment. Please try again.',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };

  const handleMpesaPayment = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/mpesa/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: pricing.total,
          phone: guestInfo.phone,
          description: `Booking for ${property.name}`,
          bookingData: guestInfo,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: 'M-Pesa Payment Initiated',
          description: 'Please check your phone for the M-Pesa prompt and complete the payment.',
        });
        
        // Poll for payment status
        pollPaymentStatus(result.transactionId);
      } else {
        throw new Error(result.error || 'Failed to initiate M-Pesa payment');
      }
    } catch (error) {
      console.error('M-Pesa payment error:', error);
      toast({
        title: 'Payment Error',
        description: 'Failed to initiate M-Pesa payment. Please try again.',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };

  const pollPaymentStatus = (transactionId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/mpesa/status/${transactionId}`);
        const result = await response.json();
        
        if (result.status === 'completed') {
          clearInterval(interval);
          setPaymentSuccess(true);
          setIsProcessing(false);
          
          toast({
            title: 'Payment Successful!',
            description: 'Your booking has been confirmed.',
          });
        } else if (result.status === 'failed') {
          clearInterval(interval);
          setIsProcessing(false);
          
          toast({
            title: 'Payment Failed',
            description: 'Your M-Pesa payment was not completed. Please try again.',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error polling payment status:', error);
      }
    }, 3000); // Poll every 3 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(interval);
      if (isProcessing) {
        setIsProcessing(false);
        toast({
          title: 'Payment Timeout',
          description: 'Payment verification timed out. Please contact support if payment was completed.',
          variant: 'destructive'
        });
      }
    }, 300000);
  };

  const handlePayment = () => {
    if (paymentMethod === 'paypal') {
      handlePayPalPayment();
    } else {
      handleMpesaPayment();
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-8">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h1>
                <p className="text-muted-foreground">
                  Your booking for {property.name} has been confirmed.
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-left space-y-2">
                  <p><strong>Check-in:</strong> {format(checkIn, 'MMMM dd, yyyy')}</p>
                  <p><strong>Check-out:</strong> {format(checkOut, 'MMMM dd, yyyy')}</p>
                  <p><strong>Guests:</strong> {bookingDetails.guests}</p>
                  <p><strong>Total Paid:</strong> {formatPrice(pricing.total)}</p>
                </div>

                <Alert>
                  <AlertDescription>
                    A confirmation email has been sent to {guestInfo.email}. Please save this information for your records.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col space-y-2">
                  <Button asChild>
                    <Link href="/properties">View More Properties</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href={`/checkout/${propertyId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Booking Details
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Payment</h1>
          <p className="text-muted-foreground">Secure payment for your reservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Info */}
                <div>
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src={property.main_image_url || property.image_url} 
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <p className="text-muted-foreground flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                </div>

                <Separator />

                {/* Guest Info */}
                <div>
                  <h4 className="font-medium mb-2">Guest Information</h4>
                  <p className="text-sm text-muted-foreground">
                    {guestInfo.firstName} {guestInfo.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{guestInfo.email}</p>
                  <p className="text-sm text-muted-foreground">{guestInfo.phone}</p>
                </div>

                <Separator />

                {/* Booking Details */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span className="font-medium">{format(checkIn, 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span className="font-medium">{format(checkOut, 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="font-medium flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {bookingDetails.guests}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nights:</span>
                    <span className="font-medium">{pricing.nights}</span>
                  </div>
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>{formatPrice(pricing.serviceFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(pricing.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Options */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <div className="flex-1">
                        <Label htmlFor="paypal" className="font-medium flex items-center cursor-pointer">
                          <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                          PayPal
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay securely with PayPal - Credit cards, debit cards, and PayPal balance
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Secure
                          </Badge>
                          <Badge variant="secondary" className="text-xs">International</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <div className="flex-1">
                        <Label htmlFor="mpesa" className="font-medium flex items-center cursor-pointer">
                          <Smartphone className="h-5 w-5 mr-2 text-green-600" />
                          M-Pesa
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay with M-Pesa mobile money - Quick and convenient for Kenyan users
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            <Smartphone className="h-3 w-3 mr-1" />
                            Mobile Money
                          </Badge>
                          <Badge variant="secondary" className="text-xs">Kenya</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your payment information is encrypted and secure. We never store your payment details.
                {paymentMethod === 'mpesa' && ' You will receive an M-Pesa prompt on your phone to complete the payment.'}
              </AlertDescription>
            </Alert>

            {/* Payment Button */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{formatPrice(pricing.total)}</p>
                    <p className="text-muted-foreground">Total amount to pay</p>
                  </div>
                  
                  <Button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    size="lg" 
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {paymentMethod === 'mpesa' ? 'Processing M-Pesa...' : 'Processing PayPal...'}
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'paypal' ? (
                          <CreditCard className="mr-2 h-5 w-5" />
                        ) : (
                          <Smartphone className="mr-2 h-5 w-5" />
                        )}
                        Pay with {paymentMethod === 'paypal' ? 'PayPal' : 'M-Pesa'}
                      </>
                    )}
                  </Button>

                  {isProcessing && paymentMethod === 'mpesa' && (
                    <Alert>
                      <Smartphone className="h-4 w-4" />
                      <AlertDescription>
                        Please check your phone for the M-Pesa payment prompt. Complete the payment to confirm your booking.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}