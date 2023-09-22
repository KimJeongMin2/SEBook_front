import React from "react";
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

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/BookList");
    } else if (newValue === 1) {
      navigate("/BookReportList");
    } else if (newValue === 2) {
      navigate("/Community");
    } else if (newValue === 3) {
      navigate("/MyPage");
    }
  };

  return (
    <Box sx={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab label="도서" sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }} />
        <Tab label="독후감" sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }} />
        <Tab label="커뮤니티" sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }} />
        <Tab label="마이페이지" sx={{ color: "black", marginLeft: "1em", marginRight: "1em", fontSize: '16px' }} />
      </Tabs>
    </Box >
  );
}

export default TabBar;
