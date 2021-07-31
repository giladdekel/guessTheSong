import "./App.css";
import GameScreen from "./screens/GameScreen/GameScreen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";
import NotFoundPage from "./screens/notfound/notfound.component";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />

        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/game">Game</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/game">
              <GameScreen />
            </Route>
            <Route path="/register">
              <RegisterScreen />
            </Route>
            {/* <Route path="/signin">
              <SigninScreen/>
            </Route> */}
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
