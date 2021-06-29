import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homescreen from "./pages/homescreen/index";
import Signup from "./pages/sign-up";
import Signin from "./pages/sign-in";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Homescreen} />
        <Route path="/sign-up" exact component={Signup} />
        <Route path="/sign-in" exact component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;
