import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homescreen from "./pages/homescreen/index";
import Game from "./pages/game/index";
import Category from "./pages/category/index"
import Contact from "./pages/contact/index";
import Signup from "./pages/sign-up";
import Signin from "./pages/sign-in";
import GlobalStyles from "./styles/GlobalStyles";
import Cart from "./pages/cart";
import Profile from "./pages/profile";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Homescreen} />
        <Route path="/games/:category" exact component={Category} />
        <Route path="/game/:id" exact component={Game} />
        <Route path="/sign-up" exact component={Signup} />
        <Route path="/sign-in" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/contact-us" exact component={Contact} />
        <Route path="/profile/:id" exact component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
