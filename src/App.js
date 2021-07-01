import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homescreen from "./pages/homescreen/index";
import Category from "./pages/category/index";
import Game from "./pages/game/index";

import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Homescreen} />
        <Route path="/games/:category" exact component={Category} />
        <Route path="/game/:id" exact component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
