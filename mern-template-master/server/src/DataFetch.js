import React, { useState, useEffect} from 'react';


function DataFetch(){

    const[person, setPerson] = useState(null);
    
    useEffect(async() => { 
        //const fetchData = async () => {
          // Just some example data from a public and open API
          const url = "https://krdo-cooking-api.herokuapp.com/api/cooking";
          const response = await fetch(url);
          const data = await response.json();
          const [item] = data;
          setPerson(item);
        }, []); // Only use this effect after first render
    
      return (
          <ul>
  {person && <li>{person.title}</li>}
    </ul>
    );
}
export default DataFetch;
