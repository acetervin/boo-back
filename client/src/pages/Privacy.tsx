
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-playfair text-4xl font-bold text-deep-navy mb-8">Privacy Policy</h1>
        <Card>
          <CardContent className="p-8 prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">1. Data Collection</h2>
            <p>We collect information necessary for bookings and communications.</p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">2. Payment Information</h2>
            <p>Payment details are securely processed through PayPal's platform.</p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">3. Data Protection</h2>
            <p>Your data is protected using industry-standard security measures.</p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">4. Cookie Policy</h2>
            <p>We use cookies to improve your browsing experience.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
