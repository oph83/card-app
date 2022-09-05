import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import RandomCard from "./components/RandomCard"
import RawPoker from "./components/RawPoker"
import Home from "./components/Home"

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/random">Random Card</Link>
        <Link style={padding} to="/raw">Raw Poker</Link>
      </div>
      <Routes>
        <Route path="/random" element={<RandomCard />} />
        <Route path="/raw" element={<RawPoker />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App