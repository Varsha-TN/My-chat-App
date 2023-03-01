import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';


function App() {

  const [text, setText] = useState("");
  const [sendMsg, setSendMsg] = useState([]);


  const handleInputChange = (e) => {
    setText(e.target.value);
  }
  
const handleSendMsg =() => {
  setSendMsg([...sendMsg, text]);
}
  return (
    <div className="App">
      <div className="Sidebar">
          <Sidebar/>
      </div>
      <div className="Chatbox">
          <input value={text} onChange={handleInputChange}/>
          <button onClick={handleSendMsg}>Send Text</button>
      </div>
    </div>
  );
}

export default App;
