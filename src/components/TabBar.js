import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';

const csrftoken = Cookies.get('csrftoken');
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabBar() {
  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState();
  const location = useLocation();
  const [value, setValue] = useState(getInitialTab());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/user/memberSearch",{
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

  function getInitialTab() {
    switch (location.pathname) {
      case "/BookList":
        return 0;
      case "/BookReportList":
        return 1;
      case "/Community":
        return 2;
      case "/MyPage":
        return 3;
      default:
        return 4;
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/BookList");
        break;
      case 1:
        navigate("/BookReportList");
        break;
      case 2:
        navigate("/Community");
        break;
      case 3:
        if (isLoggedIn) {
          navigate("/MyPage");
        } else {
          navigate("/signin");
        }
        break;
      default:
        break;
    }
  };

  return (
    <Box
      position="fixed"
      sx={{
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab
          label="도서"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="독후감"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="커뮤니티"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="마이페이지"
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
      </Tabs>
    </Box>
  );
}

export default TabBar;