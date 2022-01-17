import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Entries from "./pages/Entries";
import Budget from "./pages/Budget";
import Layout from "./pages/Layout";
import FrontPage from "./pages/FrontPage";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FrontPage />} />
          <Route path="entries" element={<Entries />} />
          <Route path="budget" element={<Budget />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
