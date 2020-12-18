import React, { useState, useEffect } from 'react';

function ExampleEffect() {
  const [count, setCount] = useState(0);
  useEffect(() => { // Update browser title
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default ExampleEffect;
