
import * as React from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Layout
import { MainLayout } from "./components/layout/MainLayout"

// Pages
import Auth from "./pages/Auth"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import Estoque from "./pages/Estoque"
import Vendas from "./pages/Vendas"
import Clientes from "./pages/Clientes"
import Financeiro from "./pages/Financeiro"
import Relatorios from "./pages/Relatorios"
import Configuracoes from "./pages/Configuracoes"
import NotFound from "./pages/NotFound"
import { AuthGuard } from "./components/auth/AuthGuard"
import ConsultaPlaca from "./pages/ConsultaPlaca"
import WhatsAppCRM from "./pages/WhatsAppCRM"

// Public Pages
import Home from "./pages/public/Home"
import Vehicles from "./pages/public/Vehicles"
import VehicleDetails from "./pages/public/VehicleDetails"
import Contact from "./pages/public/Contact"
import Financiamento from "./pages/public/Financiamento"
import Index from "./pages/Index"

// Providers
import { WhatsAppProvider } from "./hooks/whatsapp/useWhatsAppContext"

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WhatsAppProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              {/* Public Routes - Listed first to take priority */}
              <Route path="/" element={<Index />} />
              <Route path="/veiculos" element={<Vehicles />} />
              <Route path="/veiculos/:id" element={<VehicleDetails />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/financiamento" element={<Financiamento />} />
              
              {/* Auth Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                } />
                <Route path="/estoque" element={
                  <AuthGuard>
                    <Estoque />
                  </AuthGuard>
                } />
                <Route path="/consulta-placa" element={
                  <AuthGuard allowedRoles={['administrator', 'seller', 'financial', 'dispatcher']}>
                    <ConsultaPlaca />
                  </AuthGuard>
                } />
                <Route path="/vendas" element={
                  <AuthGuard allowedRoles={['administrator', 'seller']}>
                    <Vendas />
                  </AuthGuard>
                } />
                <Route path="/clientes" element={
                  <AuthGuard allowedRoles={['administrator', 'seller', 'financial', 'dispatcher']}>
                    <Clientes />
                  </AuthGuard>
                } />
                <Route path="/financeiro" element={
                  <AuthGuard allowedRoles={['administrator', 'financial']}>
                    <Financeiro />
                  </AuthGuard>
                } />
                <Route path="/relatorios" element={
                  <AuthGuard allowedRoles={['administrator', 'seller', 'financial']}>
                    <Relatorios />
                  </AuthGuard>
                } />
                <Route path="/configuracoes" element={
                  <AuthGuard>
                    <Configuracoes />
                  </AuthGuard>
                } />
                <Route path="/whatsapp" element={
                  <AuthGuard allowedRoles={['administrator', 'seller']}>
                    <WhatsAppCRM />
                  </AuthGuard>
                } />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </WhatsAppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
