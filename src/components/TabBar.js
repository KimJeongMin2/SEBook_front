import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

function TabBar() {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        // value={value}
        aria-label="basic tabs example"
        centered
      >
        <Tab label="도서" sx={{color:"black", marginLeft:"1em", marginRight:"1em"}}/>
        <Tab label="독후감" sx={{color:"black", marginLeft:"1em", marginRight:"1em"}}/>
        <Tab label="커뮤니티" sx={{color:"black", marginLeft:"1em", marginRight:"1em"}}/>
        <Tab label="마이페이지" sx={{color:"black", marginLeft:"1em", marginRight:"1em"}}/>
      </Tabs>
    </Box>
  );
}

export default TabBar;
