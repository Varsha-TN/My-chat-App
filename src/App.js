import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useState } from "react";
import "./App.css";
import { SidebarData } from "./components/SidebarData";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function App() {
  const [message, setMessage] = useState("");
  const [activeUser, setActiveUser] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [messageArr, setMessageArr] =  useState(() => {
    const savedTodos = localStorage.getItem("messageArr");
    if (savedTodos) { 
      return JSON.parse(savedTodos);
    } else {  
      return [];
    }
  });
  const [file, setFile] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = SidebarData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(SidebarData)
    }
}

  useEffect(() => {

    localStorage.setItem("messageArr", JSON.stringify(messageArr));
    // return () => setMessageArr("");
  }, [messageArr]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // setMessageArr("");
  };

  function handleUpload(event) {
    setFile(event.target.files[0]);
  }
  const handleSendMsg = () => {
    if (!activeUser) {
      console.error("please select user ");
    }
    console.log("Send", messageArr);
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
              {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                                    <h4>{item.name}</h4>             
                        )
                    })
                ) : 
                (
                  SidebarData.map((key, val) => {
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
                  })
                )}
              
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8">
        <div>
            <Box sx={{ flexGrow: 2 ,marginLeft:"150px"}}>
              <AppBar position="relative">
                <Toolbar>
                  <Search onChange={(e) => searchItems(e.target.value)}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                      <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      />
                  </Search>
                </Toolbar>
              </AppBar>
          </Box>
      </div>
          <h1> {activeUser?.name}</h1>
         
          <ul>           
            {messageArr?.length > 0 &&
              messageArr?.map((message) => {
                return <li className="list"> {message?.text}</li>;
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