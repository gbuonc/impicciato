import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home';
import Game from './Game';


const App = React.createClass({
   render(){
      return (
        <Router history={browserHistory}>
           <Route path="/" component={Home} ></Route>
           <Route path="/:player" component={Game} gameState={{...this.state}}/>
           <Route path="*" component={Home}/>
        </Router>
      );
   }
});

export default App;
