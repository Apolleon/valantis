import FilterPage from "./FilterPage/FilterPage.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home.tsx";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/:page" element={<Home />} />
      <Route exact path="/filter" element={<FilterPage />} />
      <Route exact path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
