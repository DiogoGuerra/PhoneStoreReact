import Home from "./components/Pages/Home";
import SecondPage from "./components/Pages/SecondPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/details" element={<SecondPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
