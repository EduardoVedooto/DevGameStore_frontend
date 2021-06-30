import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homescreen from "./pages/homescreen/index";
import Signup from "./pages/sign-up";
import Signin from "./pages/sign-in";
import GlobalStyles from "./styles/GlobalStyles";
import Cart from "./pages/cart";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Homescreen} />
        <Route path="/sign-up" exact component={Signup} />
        <Route path="/sign-in" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </Router>
  );
}

export default App;
