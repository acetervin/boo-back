import { Switch, Route } from "wouter";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import LoadingScreen from "@/components/LoadingScreen";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import About from "@/pages/About";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import BookingPage from "@/pages/BookingPage";
import CheckoutPage from "@/pages/CheckoutPage";
import PaymentPage from "@/pages/PaymentPage";
import Navigation from "@/components/Navigation";

import BackButton from "@/components/BackButton";
import StickyContactButtons from "@/components/StickyContactButtons";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/properties/:id" component={PropertyDetail} />
      <Route path="/booking/:id" component={BookingPage} />
      <Route path="/checkout/:id" component={CheckoutPage} />
      <Route path="/payment/:id" component={PaymentPage} />
      <Route path="/about" component={About} />

      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate checking if all initial resources are loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Match the 4-second animation duration

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="light">
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CurrencyProvider>
          <TooltipProvider>
            <div className="relative min-h-screen">
              <main>
                <Navigation />
                <BackButton />
                <Router />
                <StickyContactButtons />
                <ScrollToTop />
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
