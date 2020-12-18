

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const appName = "Server API"; 
const port = process.env.PORT || 8082;
const createServer = require("./server");
const server = createServer();
server.listen(port, () => console.log(`${appName} running on port ${port}!`));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
