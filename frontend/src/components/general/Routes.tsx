import { Switch, Route } from "react-router-dom";
import { Forecast } from "../../views/Forecast";
import Home from "../../views/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:slug" component={Forecast} />
    </Switch>
  );
};

export default Routes;
