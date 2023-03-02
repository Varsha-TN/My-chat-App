import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import "./App.css";
import { SidebarData } from "./components/SidebarData";

function App() {
  const [message, setMessage] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [file, setFile] = useState("");
  const [messageArr, setMessageArr] = useState([]);
  const [filteredMessage, setFilteredMessage] = useState([])
  const [searchInput, setSearchInput] = useState("")

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  function handleUpload(event) {
    setFile(event.target.files[0]);
  }
  const handleSendMessage = () => {
    if (!activeUser) {
      console.error("please select user ");
    }

    let messageObj = {
      userId: activeUser?.id,
      text: message
    };
    let merged = [...messageArr, messageObj]
    setMessageArr(merged);
    localStorage.setItem("messageArr", JSON.stringify(merged));
    setMessage("");
  };


  useEffect(() => {
    let localMessage = localStorage?.getItem("messageArr")
    if (!!localMessage) {
      setMessageArr(JSON.parse(localMessage))
    }
  }, [])

  useEffect(() => {
    let activeUserFilterMessage = messageArr?.filter((key) => {
      return key?.userId === activeUser?.id
    })
    console.log("folter", activeUserFilterMessage, { activeUser })
    setFilteredMessage(activeUserFilterMessage)
  }, [messageArr, activeUser])

  return (
    <div className="App">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">
            <div className="Sidebar">
              <ul className="SidebarList">
                {SidebarData?.filter((key) => key?.name?.toLowerCase().includes(searchInput?.toLowerCase())).map((key, val) => {
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
          <div className="col-md-9">

            <TextField
              label="Search User Profile"
              variant="outlined"
              value={searchInput}
              onChange={(e) => setSearchInput(e?.target?.value)}
              style={{ margin: "20px" }}
            />
            <h1> {activeUser?.name}</h1>

            <ul>
              {filteredMessage?.length > 0 &&
                filteredMessage?.map((message, index) => {
                  return <li className="list" key={index}> {message?.text}</li>;
                })}
            </ul>
            <div className="messageBox">
              <div className="d-flex">
                <TextField
                  label="Type Message!"
                  variant="outlined"
                  value={message}
                  onChange={handleInputChange}
                  style={{ marginRight: "20px" }}
                />
                <Button variant="contained" onClick={handleSendMessage}>
                  Send Message
                </Button>
              </div>

              <div className="d-flex">
                <TextField
                  type="file"
                  onChange={handleUpload}
                  style={{ margin: "20px", display: "block" }}
                />
              </div>


              {file && <ImageThumb image={file} />}
            </div>
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