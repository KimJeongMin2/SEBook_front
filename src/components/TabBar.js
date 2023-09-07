import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function TabBar() {

  const navigate = useNavigate();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        // value={value}
        aria-label="basic tabs example"
        centered
      >
        <Tab label="도서" sx={{color:"black", marginLeft:"1em", marginRight:"1em"}} onClick={() => navigate("/BookList")}/>
        <Tab label="독후감" sx={{color:"black", marginLeft:"1em", marginRight:"1em"}}/>
        <Tab label="커뮤니티" sx={{color:"black", marginLeft:"1em", marginRight:"1em"}}/>
        <Tab label="마이페이지" sx={{color:"black", marginLeft:"1em", marginRight:"1em"}} onClick={() => navigate("/MyPage")}/>
      </Tabs>
    </Box>
  );
}

export default TabBar;
