import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

import CreatePlayer from "./components/playersPage/create-player.component";
import Players from "./components/playersPage/players.component";
import NavBar from "./components/navBar";
import Home from "./components/homePage";

function App() {
  return (
    <div className="App">
      <NavBar
        list={<List>
                <ListItem button component={Link} to='/createPlayer'>
                    <ListItemText primary="Lineups"></ListItemText>
                </ListItem>
                <ListItem button component={Link} to='/players'>
                    <ListItemText primary="Players"></ListItemText>
                </ListItem>
              </List>}
        routing={<div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path="/createPlayer" component={CreatePlayer} />
                        <Route path="/players" component={Players} />
                      </Switch>
                    </div>
                  </div>
                </div>}
      />
    </div>
  );
}

export default App;