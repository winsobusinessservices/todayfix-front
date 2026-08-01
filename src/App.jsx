import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import PublicLayout from "./pages/PublicLayout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/loader" element={<LoadingScreen />} />
      </Route>
    </Routes>
    // <div>
    //   <Navbar />
    //   <div className="w-40 h-fit bg-orange-500">
    //     <DotLottieReact
    //       src="https://lottie.host/94b45acd-333c-4a16-ad51-2f6f4dae30a9/D5aP9Ex9Rw.lottie"
    //       loop
    //       autoplay
    //     />
    //     <DotLottieReact
    //       src="https://lottie.host/29ecc613-ce51-4c04-9518-d7fa3720c893/di4hJuHTXM.lottie"
    //       loop
    //       autoplay
    //     />
    //   </div>
    //   
    // </div>
  );
}

export default App;
