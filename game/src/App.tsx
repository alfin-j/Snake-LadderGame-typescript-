import Ladder from "./Ladder";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/game" element={<Ladder />} />
      </Routes>
    </Router>
  );
}

export default App;
