import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, InputBase, Pagination, Toolbar, Typography } from "@mui/material";
import TabBar from "./TabBar";
import MainAppBar from "./MainAppBar";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Cookies from 'js-cookie';
const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  position: "relative",
  borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
  backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
  marginLeft: "auto", // 오른쪽 정렬 적용
  marginTop: "1ch",
  marginRight: "27ch",
  width: "35ch",
  minWidth: "32ch", // 최소 가로 길이 조절
  height: '35px'
}));

const SearchIconWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "50ch", // 기본 가로 길이 조절
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

const csrftoken = Cookies.get('csrftoken');

function MyLikedBookList({ PROXY }) {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const [readLikeBook, setReadLikeBook] = useState([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalData = readLikeBook.length;
  // const totalPages = Math.ceil(totalData / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const updateLikesState = (likeBookReportList) => {
    const updatedLikes = {};
    likeBookReportList.forEach((report) => {
      updatedLikes[report.reportNum] = true;
    });
    setLikes(updatedLikes);
  };


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/book/likeBookListRead", {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        const likeBookList = response.data.likeBookList;
        const isbn13List = likeBookList.map(book => book.isbn13);
        setReadLikeBook(response.data.likeBookList);
        setLikeBookList(isbn13List);
        updateLikesState(likeBookList);
      })
      .catch((error) => console.error(error));
  }, []);

  const getPageData = () => {
    if (readLikeBook) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return readLikeBook.slice(start, end);
    } else {
      return [];
    }
  };
  const [likes, setLikes] = useState({});
  const [likeBookList, setLikeBookList] = useState([]);
  const sendDeleteBook = (isbn13) => {
    axios.delete("http://127.0.0.1:8000/book/bookLike", {
      params: {
        isbn13: isbn13,
      },
      headers: {
        'X-CSRFToken': csrftoken
      },
      withCredentials: true
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const toggleLike = (id) => {
    setLikes({
      ...likes,
      [id]: !likes[id],
    });
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px", marginBottom: '10px' }}>
        <TabBar />
        <div style={{ display: 'flex', marginTop: '60px' }}>
          <div style={{
            marginTop: '30px', marginLeft: '220px', fontSize: '22px', fontWeight: 'bold'
          }}>
            공감한 도서
          </div>
        </div>
        <Grid container spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "70%",
              height: '510px',
              display: "flex",
              flexWrap: 'wrap',
              backgroundColor: "#F9F5F6",
              marginTop: "30px",
              position: 'relative'
            }}
          >
            {getPageData().map((data) => {
              const isUserLikeBook =
                Array.isArray(likeBookList) && likeBookList.includes(data.isbn13);

              const rowData = {
                ...data,
                isUserLikeBook,
              };

              return (
                <Grid item xs={12} sm={3} md={0} key={data.isbn13}>
                  <Card
                    sx={{ maxWidth: 280, margin: 1 }}
                    style={{ width: '220px', height: '220px' }}
                    onClick={() => navigate(`/BookDetail/${data.isbn13}`, { state: rowData })}
                  >
                    <CardHeader
                      title={data.title}
                      action={
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(data.isbn13);
                            sendDeleteBook(data.isbn13);
                          }}
                        >
                          <FavoriteIcon style={{ color: likes[data.isbn13] ? 'gray' : '#EF9A9A' }} />
                        </IconButton>
                      }
                      subheader={data.author}
                      titleTypographyProps={{ variant: 'body1' }}
                      subheaderTypographyProps={{ variant: 'body2' }}
                      onClick={() => navigate(`/BookDetail/${data.isbn13}`, { state: rowData })}
                    />
                    <CardMedia
                      component="img"
                      height="200"
                      image={data.cover}
                      alt="Book cover"
                    />
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        aria-expanded={expanded}
                        aria-label="show more"
                        onClick={handleExpandClick}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
            {readLikeBook && (
              <Pagination
                count={Math.ceil(readLikeBook.length / itemsPerPage)}
                color="primary"
                style={{
                  margin: '-7px 0',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
                onChange={handleChangePage}
              />
            )}
          </Box>
        </Grid>

      </Box>
    </>
  );
}

export default MyLikedBookList;