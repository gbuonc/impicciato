import React from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
   render(){
      return (
         <div style={{textAlign:'center'}}>
            <h1>L'Impicc<em>i</em>ato</h1>
            <Link to={'/game/1'} className="btn">Gioca</Link>
         </div>
      )
   }
})
export default Home;
