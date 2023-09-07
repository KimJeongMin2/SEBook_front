import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MainAppBar() {

  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense" sx={{ backgroundColor: "#F8E8EE", display:"flex" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", whiteSpace: "nowrap", color:"black", flex:1, textAlign:"center"}}
          onClick={() => navigate("/")}
        >
          SEBook
        </Typography>
        <Typography variant="h6" sx = {{fontSize:"15px", color:"black"}} onClick={()=> navigate("/SignIn")}>
           로그인
        </Typography>
        <Typography variant="h6" sx = {{fontSize:"15px", color:"black", ml:"3rem"}} onClick={()=> navigate("/SignUp")}>
           회원가입
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
