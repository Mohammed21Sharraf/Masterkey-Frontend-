import './App.css';
import Grid from './component/Grid';
import React, { useState } from 'react';



function App() {
  const [outputString, setOutputString] = useState('');
  const [count, setCount] = useState(1);
  let extractString = ''
  const handleTileClick = (alphabet) => {
    setOutputString(prevString => {
      // Add the new letter to the previous string
      let newString = prevString + alphabet;
      
      if (prevString[prevString.length - 1] === alphabet){
        setCount(prevCount => prevCount + 1);
        console.log(count);
        if (count === 3){
          extractString = newString.slice((newString.length-count), newString.length)
          newString = newString.replace(extractString, '_')
          setCount(1)
        }
        // console.log(newString);
        // console.log(extractString);
      }

      return newString;
    });
  };
  
  return (
    <>
    <Grid onTileClick={handleTileClick} />
    <div id="outputString" style={{  marginBottom:'20px', textAlign: 'center', fontSize: '30px' }}>
      {outputString}
    </div>
    </>
  );
}

export default App;
