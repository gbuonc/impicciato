import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home';
import Game from './Game';


const App = React.createClass({
   render(){
      return (
        <Router history={browserHistory}>
           <Route path="/" component={Home} ></Route>
           <Route path="/:player" component={Game} />
           <Route path="*" component={Game}/>
        </Router>
      );
   }
});

export default App;
