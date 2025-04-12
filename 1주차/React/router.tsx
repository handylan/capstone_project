import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./pages/MainPage/MainPage";
import './reset.css'
import DevicePage from "./pages/DevicePage/DevicePage";

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/device" element={<DevicePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default router;
