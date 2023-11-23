import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Cookies from 'js-cookie';

const settings = ['Profile', 'Logout'];
const csrftoken = Cookies.get('csrftoken');
function MainAppBar() {
  const [myInfo, setMyInfo] = useState();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/user/memberSearch", {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log("myInfo : " + response.data);
        setMyInfo(response.data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
      });
  }, []);


  const logout = () => {
    axios.get("http://127.0.0.1:8000/user/logout", { withCredentials: true })
      .then(response => {
        if (response.status === 202) {
          window.location.reload();
        }
      });
  }


  return (
    <AppBar position="fixed">
      <Toolbar sx={{ width: '100%', backgroundColor: "#F8E8EE", display: "flex" }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'black',
            textDecoration: 'none',
            marginLeft: '680px'
          }}
        >
          SEBook
        </Typography>
        <AutoStoriesIcon style={{ color: 'black', marginLeft: '-10px' }}></AutoStoriesIcon>
        <Box sx={{ flexGrow: 0, marginLeft: '600px' }}>
          {isLoggedIn ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  <div style={{ marginLeft: '10px', fontSize: '15px' }}></div>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={1} onClick={handleCloseUserMenu}>
                  <div style={{ width: '200px', height: '100px' }}>
                    <div style={{ height: '50px', textAlign: 'center', lineHeight: '50px' }}>{myInfo?.name}님</div>
                    <div style={{ textAlign: 'center' }}>사용자 계정 : {myInfo?.userId}</div>
                  </div>
                </MenuItem>
                <MenuItem key={2} onClick={logout}>
                  <Typography textAlign="center">LOGOUT</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div style={{ display: 'flex', marginRight: '100px' }}>
              <Button variant="contained" style={{ width: '90px', height: '30px', backgroundColor: "#EF9A9A", color: "#ffffff", marginRight: "10px" }} onClick={() => navigate("/signin")}>로그인</Button>
              <Button variant="contained" style={{ width: '90px', height: '30px', backgroundColor: "#EF9A9A", color: "#ffffff" }} onClick={() => navigate("/signup")}>회원가입</Button>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;