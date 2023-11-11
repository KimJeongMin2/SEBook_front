import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Toolbar,
  Typography,
} from "@mui/material";
import TabBar from "./TabBar";
import MainAppBar from "./MainAppBar";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useLocation } from "react-router-dom"
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
  height: "35px",
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

const cardData = [
  {
    id: 1,
    title: "어린왕자",
    author: "생텍쥐베리",
    image: "https://www.munhak.com/data/book/img_201807275280055_b.jpg",
    like: 1
  },
  {
    id: 2,
    title: "백설공주",
    author: "야코프 그림",
    image:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788965671527.jpg",
    like: 1
  },
  {
    id: 3,
    title: "인어공주",
    author: "한스 크리스티안 안데르센",
    image:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788939570504.jpg",
    like: 1
  },
  {
    id: 4,
    title: "신데렐라",
    author: "샤를 페르",
    image:
      "https://image.aladin.co.kr/product/1634/30/cover500/8965671566_1.jpg",
    like: 1
  },
  {
    id: 5,
    title: "앤서니 브라운 코끼리",
    author: "앤서니 브라운",
    image: "https://img.vogue.co.kr/vogue/2019/08/style_5d5cadfdadb7c.jpeg",
    like: 1
  },
  {
    id: 6,
    title: "1%를 읽는 힘",
    author: "메르",
    image:
      "https://image.aladin.co.kr/product/32289/45/cover500/k852834850_1.jpg",
    like: 1
  },
  {
    id: 7,
    title: "아메리칸 프로메테우스",
    author: "카이 버드",
    image:
      "https://image.aladin.co.kr/product/31892/3/cover500/k342833636_1.jpg",
    like: 1
  },
  {
    id: 8,
    title: "슈퍼노멀",
    author: "주언규",
    image:
      "https://image.aladin.co.kr/product/32308/43/cover500/890127437x_1.jpg",
    like: 1
  },
];
const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  width: "5ch",
  color: "inherit",
  backgroundColor: "rgba(255, 182, 193, 0.4)",
  borderRadius: "50px 50px 50px 50px",
  border: "none",
  [theme.breakpoints.up("md")]: {
    width: "20ch",
  },
}));

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};


function BookList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const [bookList, setBookList] = useState(location.state?.bookList || []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [searchType, setSearchType] = useState("도서명");

  const [likes, setLikes] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get("http://192.168.123.158:8000/book/bookListRead")
      .then((response) => {
        console.log(response.data.bookList);
        setBookList(response.data.bookList);

        if (location.state.bookList) {
          console.log("look ..: " + location.state.bookList);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const sendLikeBook = (isbn13) => {
    axios.post("http://192.168.123.158:8000/book/bookLike", {
      isbn13: isbn13,
      userNum: 1
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const searchBookByAuthor = () => {
    axios.get(`http://192.168.123.158:8000/book/searchBookByAuthor`, {
      params: {
        author: searchTerm
      }
    })
      .then(response => {
        setBookList(response.data);
      })
      .catch(error => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };

  const searchBookByTitle = () => {
    axios.get(`http://192.168.123.158:8000/book/searchBookByTitle`, {
      params: {
        title: searchTerm
      }
    })
      .then(response => {
        setBookList(response.data);
      })
      .catch(error => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };



  const toggleLike = (id) => {
    setLikes({
      ...likes,
      [id]: !likes[id],
    });
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const getPageData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return bookList.slice(start, end);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (searchType === '작가명') {
        searchBookByAuthor();
      } else if (searchType === '도서명') {
        searchBookByTitle();
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px", marginBottom: "10px" }}>
        <TabBar />
        <div style={{ display: "flex", marginTop: "60px", alignItems: "center" }}>
          <div
            style={{
              marginTop: "35px",
              marginLeft: "230px",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            도서
          </div>
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <StyledSelect
              sx={{
                marginTop: "30px",
                marginRight: "10px",
                height: "35px",
                fontSize: "13px",
              }}
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              defaultValue={"도서명"}
            >
              <MenuItem value={"도서명"} style={{ fontSize: "13px" }}>
                도서명
              </MenuItem>
              <MenuItem value={"작가명"} style={{ fontSize: "13px" }}>
                작가명
              </MenuItem>
            </StyledSelect>
            <Search style={{ marginTop: "30px", height: "35px", marginLeft: "auto" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                style={{ fontSize: "13px" }}
                placeholder="도서명 또는 작가명을 입력하세요."
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyPress}
              />
            </Search>
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
                <Card
                  sx={{ maxWidth: 280, margin: 1 }}
                  style={{ width: "230px", height: "220px" }}
                >
                  <CardHeader
                    title={truncate(data.title, 15)}
                    action={
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(data.isbn13);
                          sendLikeBook(data.isbn13);
                        }}
                      >
                        <FavoriteIcon style={{ color: likes[data.isbn13] ? "#EF9A9A" : "gray" }} />
                      </IconButton>
                    }
                    subheader={truncate(data.author, 10)}
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
                    onClick={() =>
                      navigate(`/BookDetail/${data.isbn13}`, { state: data })
                    }
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                      {data.like}
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
            <Pagination
              count={Math.ceil(bookList.length / itemsPerPage)}
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
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default BookList;
