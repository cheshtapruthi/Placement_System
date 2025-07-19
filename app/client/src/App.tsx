import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register"
import Home from "./pages/Home";
import StudentCorner from "./pages/StudentCorner";
import CompanyInfo from "./pages/CompanyInfo";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import ApplyForm from './pages/ApplyForm'; 
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isLoggedIn ? element : <Navigate to="/" replace />;
};


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply-form" element={<ApplyForm />} />

          <Route path="/home" element={<Home />} />
          <Route path="/student-corner" element={<StudentCorner />} />
          <Route path="/company-info" element={<CompanyInfo />} />
          <Route path="/results" element={<Results />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
