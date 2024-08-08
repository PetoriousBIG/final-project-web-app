import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import FinalProject from "./FinalProject";
function App() {
  return (
    <HashRouter>
      <div className="h-100">
        <Routes>
          <Route path="/" element={<Navigate to="FinalProject" />} />
          <Route path="/FinalProject/*" element={<FinalProject />} />
        </Routes>
    </div> 
    </HashRouter>
 );
}

export default App;

