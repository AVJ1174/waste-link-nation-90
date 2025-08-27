import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VendorPage from "./pages/VendorPage";
import KabadiwalaPage from "./pages/KabadiwalaPage";
import HubDashboard from "./pages/HubDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import SettlementDashboard from "./pages/SettlementDashboard";
import AuthPage from "./pages/AuthPage";
import AdminRegister from "./pages/AdminRegister";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vendor" element={<VendorPage />} />
          <Route path="/kabadiwala" element={<KabadiwalaPage />} />
          <Route path="/hub" element={<HubDashboard />} />
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/government" element={<GovernmentDashboard />} />
          <Route path="/settlement" element={<SettlementDashboard />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;