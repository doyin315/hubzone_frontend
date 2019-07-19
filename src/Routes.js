import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";


export default () =>
    <Switch>
        <Route path="/" exact component={Layout} />
        <Route path="/landing" exact component={Landing} />
    </Switch>;
