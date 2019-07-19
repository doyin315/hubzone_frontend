import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import "./../styles/App.css";
import Body from './Body';
import Landing from './Landing';

export default class Layout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={Body} />
                    <Route path="/landing/" component={Landing} />
                </Switch>
            </div>
        );
    }
}