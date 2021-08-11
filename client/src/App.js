import React, { useEffect } from 'react'
import tweetService from './services/tweetService';
import './App.css';

const App = () => {

  useEffect(() => {
    (async () => {
      const response = await tweetService.getInitialData()
      console.log(response)
    })()
  })

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
