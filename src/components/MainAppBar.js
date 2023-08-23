import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
function MainAppBar() {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense" sx={{ backgroundColor: "#F8E8EE", display:"flex" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", whiteSpace: "nowrap", color:"black", flex:1, textAlign:"center"}}
        >
          SEBook
        </Typography>
        <Typography variant="h6" sx = {{fontSize:"15px", color:"black"}}>
           홍길동님, 환영합니다.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
