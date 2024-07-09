import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/chat/Chat";
import Register from "./pages/Register";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
