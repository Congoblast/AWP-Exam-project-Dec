import React, {useState, useEffect} from 'react';
import axios from 'axios';

import ExampleButton from './ExampleButton';
import ExampleEffect from './ExampleEffect';
import DataFetch from './DataFetch';
import Posting from './Posting';

function App() {
  const [data, setData] = useState([]);
//  const[person, setPerson] = useState(null);


 // useEffect(async() => { 
    //const fetchData = async () => {
      // Just some example data from a public and open API
      //const url = "https://krdo-cooking-api.herokuapp.com/api/cooking";
     // const response = await fetch(url);
    //  const data = await response.json();
   //   const [item] = data;
 //     setPerson(item);
 //   }, []); // Only use this effect after first render

  return (
    <div className="App">
<Posting />
      <h2>React Hooks</h2>

      <ExampleButton></ExampleButton>

      <ExampleEffect></ExampleEffect>
      <h3>Data from API:</h3>
     <DataFetch></DataFetch>
    </div>
  );
}

export default App;
