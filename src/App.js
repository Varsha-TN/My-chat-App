import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import "./App.css";
import { SidebarData } from "./components/SidebarData";

function App() {
  const [message, setMessage] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [messageArr, setMessageArr] = useState([]);
  const [file, setFile] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  function handleUpload(event) {
    setFile(event.target.files[0]);
  }
  const handleSendMsg = () => {
    if (!activeUser) {
      console.error("please select user ");
    }
    console.log("Send");
    let messageObj = {
      userId: activeUser?.id,
      text: message
    };
    setMessageArr([...messageArr, messageObj]);
    setMessage("");
  };

  return (
    <div className="App">
      <div className="SideNav">
        <div className="row">
          <div className="col-md-4">
            <div className="Sidebar">
              <ul className="SidebarList">
                {SidebarData.map((key, val) => {
                  return (
                    <li
                      key={key.id}
                      className="row"
                      onClick={() => {
                        setActiveUser(key);
                      }}
                    >
                      <div id="icon">{key.icon}</div>
                      <div id="title">{key.name}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h1> {activeUser?.name}</h1>
          <ul>
            {messageArr?.length > 0 &&
              messageArr?.map((message) => {
                return <li className="list">{message?.text}</li>;
              })}
          </ul>
          <div className="messageBox">
            <TextField
              label="Type Message!"
              variant="outlined"
              value={message}
              onChange={handleInputChange}
              style={{ marginRight: "20px" }}
            />
            <Button variant="contained" onClick={handleSendMsg}>
              Send Message
            </Button>
            <TextField
              type="file"
              onChange={handleUpload}
              style={{ margin: "20px" , display:"block"}}
            />

            {file && <ImageThumb image={file} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const ImageThumb = ({ image }) => {
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

export default App;