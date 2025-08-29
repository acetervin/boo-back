import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Bed, Calendar as CalendarIcon, Info } from "lucide-react";
import { type CarouselApi } from "@/components/ui/carousel";
import type { Property } from "@shared/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, differenceInCalendarDays, isSameDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import BookingSummary from "@/components/BookingSummary";
import GuestSelectionPopover from "@/components/GuestSelectionPopover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const unavailableDates = [
  new Date(2025, 7, 8),
  new Date(2025, 7, 9),
  new Date(2025, 7, 10),
  new Date(2025, 7, 11),
];

export default function BookingPage() {
  const [, params] = useRoute("/booking/:id");
  const propertyId = params?.id ? parseInt(params.id) : null;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSelectionAvailable, setIsSelectionAvailable] = useState(true);

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    enabled: !!propertyId,
  });

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", handleSelect);

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (date?.from) {
      if (date.to) {
        let isUnavailable = false;
        const loopTo = new Date(date.to);
        for (let d = new Date(date.from); d <= loopTo; d.setDate(d.getDate() + 1)) {
          if (unavailableDates.some((ud) => isSameDay(ud, d))) {
            isUnavailable = true;
            break;
          }
        }
        setIsSelectionAvailable(!isUnavailable);
      } else {
        const isUnavailable = unavailableDates.some((ud) => isSameDay(ud, date.from!));
        setIsSelectionAvailable(!isUnavailable);
      }
    } else {
      setIsSelectionAvailable(true);
    }
  }, [date]);

  const totalNights = date?.from && date?.to ? differenceInCalendarDays(date.to, date.from) : 0;

  const handleBooking = () => {
    if (!date?.from || !date?.to) {
      return;
    }

    const bookingDetails = {
      propertyId,
      checkIn: date.from.toISOString(),
      checkOut: date.to.toISOString(),
      guests: adults + children,
      adults,
      children,
      totalNights,
    };

    // Store booking details in localStorage for the checkout page
    localStorage.setItem('booking-details', JSON.stringify(bookingDetails));
    
    // Redirect to checkout page
    window.location.href = `/checkout/${propertyId}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
        <p className="text-muted-foreground">The property you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/properties">View All Properties</Link>
        </Button>
      </div>
    );
  }

  const heroImage =
    property.main_image_url ||
    (Array.isArray(property.categorized_images) && property.categorized_images[0]?.images?.[0]
      ? property.categorized_images[0].images[0]
      : '/placeholder.svg');
  const allImages = Array.isArray(property.categorized_images)
    ? property.categorized_images.flatMap((cat: any) => cat.images)
    : [];

  return (
    <div className="bg-background pb-12">
      <div className="relative h-[400px]">
        <img src={heroImage} alt={property.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            {property.name}
          </h1>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-card p-4 rounded-lg shadow-lg border border-border">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="grid gap-2 flex-grow">
              <Label htmlFor="dates">Select dates</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button id="dates" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (date.to ? (<>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>) : (format(date.from, "LLL dd, y"))) : (<span>Pick a date</span>)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {!isSelectionAvailable && (
                    <div className="p-4">
                      <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Dates Unavailable</AlertTitle>
                        <AlertDescription>Part of your selection is sold out, please try different dates.</AlertDescription>
                      </Alert>
                    </div>
                  )}
                  <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={3} disabled={unavailableDates} />
                  <div className="flex justify-end gap-2 p-4 border-t border-border">
                    <Button variant="ghost" onClick={() => setDate(undefined)}>Reset</Button>
                    <Button onClick={() => setIsCalendarOpen(false)}>Done</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Select guests</Label>
              <GuestSelectionPopover
                adults={adults}
                children={children}
                maxGuests={property.max_guests}
                onAdultsChange={setAdults}
                onChildrenChange={setChildren}
              />
            </div>
            <Button variant="outline" onClick={() => setIsCalendarOpen(true)} className="self-end">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Find available dates
            </Button>
          </div>
        </div>

        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-md border border-border space-y-4">
              <Carousel setApi={setApi} className="w-full mb-6 rounded-lg overflow-hidden">
                <CarouselContent>
                  {allImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <motion.img 
                        src={image} 
                        alt={`${property.name} view ${index + 1}`} 
                        className="w-full h-96 object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: current === index ? 1 : 0.8, scale: current === index ? 1 : 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4" />
                <CarouselNext className="absolute right-4" />
              </Carousel>
              <h2 className="text-2xl font-bold text-foreground">{property.name}</h2>
              <div className="flex items-center space-x-6 text-muted-foreground mb-6">
                <span className="flex items-center"><Users className="h-5 w-5 mr-2" /> Sleeps {property.max_guests}</span>
                <span className="flex items-center"><Bed className="h-5 w-5 mr-2" /> {property.bedrooms} Bathrooms</span>
              </div>
              <p className="text-muted-foreground">Garden view • Non-smoking</p>
              {!isSelectionAvailable && (
                <div className="mt-6 text-center border-t border-border pt-4">
                  <p className="text-destructive font-semibold mb-2">The selected dates are not available.</p>
                  <Button variant="outline" onClick={() => setIsCalendarOpen(true)}>Find available dates</Button>
                </div>
              )}
            </div>
            <div className="lg:col-span-1 sticky top-24">
              <BookingSummary 
                checkInDate={date?.from || new Date()} 
                checkOutDate={date?.to || new Date()} 
                guestCount={adults + children} 
                totalNights={totalNights} 
                pricePerNight={Number(property.price_per_night)}
                onBook={handleBooking} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
