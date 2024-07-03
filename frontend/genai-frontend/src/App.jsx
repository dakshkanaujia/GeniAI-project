import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

        const response = await fetch("http://localhost:5000/api/process" , {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              input  
            })
        })
        const data = await response.json();
        setResult(data.data)
    } catch (error) {
      console.error('Error processing data', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      
      {result && (
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
