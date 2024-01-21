import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Homepage from "./pages/Home/Homepage";
import About from "./pages/About/About";
import AddCard from "./pages/AddCard/AddCard";
import AllCards from "./pages/AllCards/AllCards";
import Train from "./pages/Train/Train";
import Progress from "./pages/Progress/Progress";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Faq from "./pages/Faq/Faq";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout();
  }, [pathname, t]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="longman" element={<Homepage />} />
            <Route path="longman/about" element={<About />} />
            <Route path="longman/addcard" element={<AddCard />} />
            <Route path="longman/cards" element={<AllCards />} />
            <Route path="longman/train" element={<Train />} />
            <Route path="longman/progress" element={<Progress />} />
            <Route path="longman/faq" element={<Faq />} />
            <Route
              path="longman/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
