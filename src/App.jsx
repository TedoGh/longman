import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import AddCard from "./pages/AddCard";
import AllCards from "./pages/AllCards";
import Train from "./pages/Train";
import Progress from "./pages/Progress";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Faq from "./pages/Faq";
import TermsAndConditions from "./pages/TermsAndConditions";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="longman" index element={<Homepage />} />
        <Route path="longman/about" element={<About />} />
        <Route path="longman/addcard" element={<AddCard />} />
        <Route path="longman/cards" element={<AllCards />} />
        <Route path="longman/train" element={<Train />} />
        <Route path="longman/progress" element={<Progress />} />
        <Route path="longman/faq" element={<Faq />} />
        <Route path="longman/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
