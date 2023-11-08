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

// const cardData = [
//   {
//     isbn13: 1,
//     title: "어린왕자",
//     author: "생텍쥐베리",
//     image: "https://www.munhak.com/data/book/img_201807275280055_b.jpg",
//   },
//   {
//     isbn13: 2,
//     title: "백설공주",
//     author: "야코프 그림",
//     image:
//       "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788965671527.jpg",
//   },
//   {
//     isbn13: 3,
//     title: "인어공주",
//     author: "한스 크리스티안 안데르센",
//     image:
//       "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788939570504.jpg",
//   },
//   {
//     isbn13: 4,
//     title: "신데렐라",
//     author: "샤를 페르",
//     image:
//       "https://image.aladin.co.kr/product/1634/30/cover500/8965671566_1.jpg",
//   },
//   {
//     isbn13: 5,
//     title: "앤서니 브라운 코끼리",
//     author: "앤서니 브라운",
//     image: "https://img.vogue.co.kr/vogue/2019/08/style_5d5cadfdadb7c.jpeg",

//   },
//   {
//     isbn13: 6,
//     title: "1%를 읽는 힘",
//     author: "메르",
//     image:
//       "https://image.aladin.co.kr/product/32289/45/cover500/k852834850_1.jpg",
//   },
//   {
//     isbn13: 7,
//     title: "아메리칸 프로메테우스",
//     author: "카이 버드",
//     image:
//       "https://image.aladin.co.kr/product/31892/3/cover500/k342833636_1.jpg",
//   },
//   {
//     isbn13: 8,
//     title: "슈퍼노멀",
//     author: "주언규",
//     image:
//       "https://image.aladin.co.kr/product/32308/43/cover500/890127437x_1.jpg",
//   },
// ];

function MyLikedBookList() {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const [readLikeBook, setReadLikeBook] = useState([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalData = readLikeBook.length;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };


  useEffect(() => {
    axios
      .get("http://192.168.0.8:8000/book/likeBookListRead", {
        params: {
          userNum: 1
        },
      })
      .then((response) => {
        console.log(response.data.likeBookList);
        setReadLikeBook(response.data.likeBookList);
      })
      .catch((error) => console.error(error));
  }, []);

  const getPageData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return readLikeBook.slice(start, end);
  };
  const [likes, setLikes] = useState({});

  const sendDeleteBook = (isbn13) => {
    axios.delete("http://172.30.127.93:8000/book/bookLike", {
      params: {
        isbn13: isbn13,
        userNum: 1
      }
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
            {getPageData().map((data) => (
              <Grid item xs={12} sm={3} md={0}>
                <Card sx={{ maxWidth: 280, margin: 1 }} style={{ width: '220px', height: '220px' }}
                  onClick={() => navigate(`/BookDetail/${data.isbn13}`, { state: data })}
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
                        <FavoriteIcon style={{ color: likes[data.isbn13] ? "#EF9A9A" : "gray" }} />
                      </IconButton>
                    }
                    subheader={data.author}
                    titleTypographyProps={{ variant: "body1" }}
                    subheaderTypographyProps={{ variant: "body2" }}
                    onClick={() =>
                      navigate(`/BookDetail/${data.isbn13}`, { state: data })
                    }
                  />
                  <CardMedia
                    component="img"
                    height="200"
                    image={data.cover}
                    alt="Paella dish"
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
            ))}
            <Pagination count={totalPages} color="primary"
              style={{
                margin: '3px 0',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
              onChange={handleChangePage}
            />
          </Box>
        </Grid>

      </Box>
    </>
  );
}

export default MyLikedBookList;
