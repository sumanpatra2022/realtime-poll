import { Routes, Route } from "react-router-dom";
import CreatePoll from "./pages/CreatePoll";
import PollRoom from "./pages/PollRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePoll />} />
      <Route path="/poll/:id" element={<PollRoom />} />
    </Routes>
  );
}

export default App;
