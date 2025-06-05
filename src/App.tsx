
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DemoPage from "./pages/DemoPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";
import Dashboard from "./pages/Dashboard";
import ActionDetailPage from "./pages/ActionDetailPage";
import RisksPage from "./pages/RisksPage";
import MatrixPage from "./pages/MatrixPage";
import ActionsPage from "./pages/ActionsPage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import AIAdvisorPage from "./pages/AIAdvisorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
          
          {/* Pages du tableau de bord */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/risks" element={<RisksPage />} />
          <Route path="/dashboard/matrix" element={<MatrixPage />} />
          <Route path="/dashboard/actions" element={<ActionsPage />} />
          <Route path="/dashboard/actions/:id" element={<ActionDetailPage />} />
          <Route path="/dashboard/reports" element={<ReportsPage />} />
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/ai-advisor" element={<AIAdvisorPage />} />
          
          {/* Route de fallback pour les pages non trouvées */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
