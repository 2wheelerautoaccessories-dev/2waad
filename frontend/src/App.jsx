import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import { SettingsProvider } from './context/SettingsContext';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-navy">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: '#000000', color: '#F5F5F5', border: '1px solid #C0C0C0' },
          }}
        />
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;
