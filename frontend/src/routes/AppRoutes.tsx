import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/mainPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
