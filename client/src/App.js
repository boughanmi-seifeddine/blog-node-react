import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
      <Router>
          <Topbar/>
      </Router>

  );
}

export default App;
