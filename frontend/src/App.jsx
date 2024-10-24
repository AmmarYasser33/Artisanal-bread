import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  // #eaa636
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
