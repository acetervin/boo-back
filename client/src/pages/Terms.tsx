
import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-playfair text-4xl font-bold text-deep-navy mb-8">Terms of Service</h1>
        <Card>
          <CardContent className="p-8 prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Kenya Stays services, you agree to these terms.</p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">2. Booking and Payments</h2>
            <p>All payments are processed in USD. Local currency rates are provided for reference only.</p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">3. Cancellation Policy</h2>
            <p>Cancellations must be made 48 hours before check-in for a full refund.</p>
            
            <h2 className="text-2xl font-semibold mb-4 mt-8">4. Property Rules</h2>
            <p>Guests must follow all property-specific rules and regulations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
