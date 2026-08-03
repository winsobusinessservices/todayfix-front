import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import PublicLayout from "./pages/PublicLayout";
import Home from "./pages/Home";
import { motion, AnimatePresence } from "framer-motion";
import Services from "./pages/Services";
import Vendor from "./pages/Vendor";
import Service from "./pages/Service";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import Area from "./pages/Area";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after the internal animation finishes (~2.5s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
            }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence> 
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/loader" element={<LoadingScreen />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<Service />} />
          <Route path="/vendor/:id" element={<Vendor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/cities/:slug" element={<Area />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
