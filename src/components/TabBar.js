import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
  const [value, setValue] = useState(); // Set an initial value for the active tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          onClick={() => {
            setValue(0);
            navigate("/BookList");
          }}
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="독후감"
          onClick={() => {
            setValue(1);
            navigate("/BookReportList");
          }}
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="커뮤니티"
          onClick={() => {
            setValue(2);
            navigate("/Community");
          }}
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
        <Tab
          label="마이페이지"
          onClick={() => {
            setValue(3);
            navigate("/MyPage");
          }}
          sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }}
        />
      </Tabs>
    </Box>
  );
}

export default TabBar;
