import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index.tsx"));
const RoomsPage = lazy(() => import("./pages/Rooms.tsx"));
const ContactPage = lazy(() => import("./pages/Contact.tsx"));
const PartnerPage = lazy(() => import("./pages/Partner.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));


const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/partner" element={<PartnerPage />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

