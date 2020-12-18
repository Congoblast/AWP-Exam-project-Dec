import React from 'react';
import { Link } from "@reach/router";

function Nav() {

    
    return (
<>
      <ul><Link to="/">Home</Link></ul>
      <ul><Link to="/LoginPage">Login</Link></ul>
</>
    );
}

export default Nav