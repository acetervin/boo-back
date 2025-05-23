import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StickyContactButtons() {
  const whatsappNumber = "+254700000000";
  const phoneNumber = "+254700000000";
  
  const handleWhatsAppClick = () => {
    const message = "Hi, I'm interested in your luxury villas";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-whatsapp hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 w-14 h-14"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <Button
        onClick={handlePhoneClick}
        className="bg-terracotta hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 w-14 h-14"
        size="icon"
      >
        <Phone className="h-6 w-6" />
      </Button>
    </div>
  );
}
