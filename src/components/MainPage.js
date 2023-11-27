import { React, useEffect, useState, useContext } from "react";
import MainAppBar from "./MainAppBar";
import { motion } from "framer-motion";
import TabBar from "./TabBar";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Grid,
  IconButton,
  InputBase,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSpring, animated } from 'react-spring';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Slider from "react-slick";
import "../slick.css";
import "../slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  position: "relative",
  borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
  backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
  marginRight: 0,
  marginLeft: "auto", // 오른쪽 정렬 적용
  marginTop: "10ch",
  marginRight: "20ch",
  width: "35ch",
  minWidth: "32ch", // 최소 가로 길이 조절
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

const csrftoken = Cookies.get("csrftoken");

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

function MainPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(-1);
  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? -1 : id);
  };

  const [recommendBook, setRecommendBook] = useState([]);

  const [likes, setLikes] = useState({});
  const [searchType, setSearchType] = useState("도서명");

  const [searchTerm, setSearchTerm] = useState("");

  const [bookList, setBookList] = useState([]);
  const [bookTop5List, setBookTop5List] = useState([]);
  const [bestsellerList, setBestsellerList] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedRecommandBook, setSelectedRecommandBookok] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookReport, setSelectedBookReport] = useState(null);
  const [myInfo, setMyInfo] = useState();
  const [likedBookReportList, setLikedBookReportList] = useState([]);
  const [openRecommandBookDialog, setOpenRecommandBookDialog] = useState(false);
  const [openBookReportDialog, setOpenBookReportDialog] = useState(false);
  
  const props = useSpring({
    from: { transform: 'translate3d(0px,0px,-800px)' },
    to: { transform: 'translate3d(0px,0px,0px)' },
    config: { duration: 1000 },
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/user/memberSearch", {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("myInfo : " + response.data);
        setMyInfo(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/book/recommendBook", {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setRecommendBook(response.data.recommendations);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/book/BestsellerListRead")
      .then((response) => {
        console.log("bestSeller: " + response.data.topRatedBookReports);
        setBestsellerList(response.data.bestsellerList);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bookReport/bookReportReadTop5")
      .then((response) => {
        console.log("독후감 Top5", response.data.topRatedBookReports);
        console.log("bookreportNum", response.data.reportNum);
        setBookTop5List(response.data.topRatedBookReports);
      })
      .catch((error) => console.error(error));
  }, []);

  const searchBookByAuthor = () => {
    axios
      .get(`http://127.0.0.1:8000/book/searchBookByAuthor`, {
        params: {
          author: searchTerm,
        },
      })
      .then((response) => {
        setBookList(response.data.bookList);
        navigate(`/BookList`, {
          state: {
            bookList: response.data.bookList,
          },
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };

  const searchBookByTitle = () => {
    axios
      .get(`http://127.0.0.1:8000/book/searchBookByTitle`, {
        params: {
          title: searchTerm,
        },
      })
      .then((response) => {
        setBookList(response.data.bookList);
        console.log("검색결과 : " + response.data);
        navigate(`/BookList`, {
          state: {
            bookList: response.data.bookList,
          },
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };

  const sendLikeBook = (isbn13) => {
    if (!myInfo) {
      toast.warning(
        () => (
          <div>
            로그인 후 이용 가능한 서비스입니다. 로그인하러 가시겠습니까?
            <br />
            <br />
            <br />
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate("/signin")}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "15px",
                backgroundColor: "#EF9A9A",
                color: "white",
                border: "1px solid #EF9A9A",
              }}
            >
              네
            </Button>
          </div>
        ),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/book/bookLike",
          {
            isbn13: isbn13,
          },
          {
            headers: {
              "X-CSRFToken": csrftoken,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setLikes((likes) => ({
              ...likes,
              [isbn13]: !likes[isbn13],
            }));
          }
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendLikeBookReport = (bookReportNum) => {
    if (!myInfo) {
      toast.warning(
        () => (
          <div>
            로그인 후 이용 가능한 서비스입니다. 로그인하러 가시겠습니까?
            <br />
            <br />
            <br />
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate("/signin")}
              style={{
                position: "absolute",
                right: "10px",
                bottom: "15px",
                backgroundColor: "#EF9A9A",
                color: "white",
                border: "1px solid #EF9A9A",
              }}
            >
              네
            </Button>
          </div>
        ),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/bookReport/bookReportLike",
          {
            reportNum: bookReportNum,
          },
          {
            headers: {
              "X-CSRFToken": csrftoken,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setLikes((likes) => ({
              ...likes,
              [bookReportNum]: !likes[bookReportNum],
            }));
          }
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bookReport/bookReportReadLike", {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then((response) => {
        setLikedBookReportList(response.data.likeBookReportList);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchType === "작가명") {
        searchBookByAuthor();
      } else if (searchType === "도서명") {
        searchBookByTitle();
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleLike = (id) => {
    setLikes({
      ...likes,
      [id]: !likes[id],
    });
  };

  const handleRecommendBookOpen = (book) => {
    setSelectedRecommandBookok(book);
    setOpenRecommandBookDialog(true);
  };

  const handleRecommendBookClose = () => {
    setSelectedRecommandBookok(null);
    setOpenRecommandBookDialog(false);
  };

  const handleOpen = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedBook(null);
    setOpen(false);
  };

  const handleOpenBookReport = (bookReport) => {
    setSelectedBookReport(bookReport);
    setOpenBookReportDialog(true);
  };
  const handleCloseBookReport = () => {
    setSelectedBookReport(null);
    setOpenBookReportDialog(false);
  };
  const currentUser = myInfo?.userNum;

  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            marginRight: "4ch",
          }}
        >
          <StyledSelect
            sx={{
              marginTop: "80px",
              marginLeft: "780px",
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
          <Search
            style={{
              marginTop: "80px",
              marginLeft: "10px",
              marginRight: "125px",
              width: "100px",
            }}
          >
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
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
            marginLeft: "160px",
            fontSize: "20px",
            marginTop: "-28px",
          }}
        >
          {myInfo?.name
            ? `${myInfo?.name}님, 맞춤 도서 추천`
            : "맞춤도서를 추천 받아 보고 싶으시다면 로그인 하세요!"}
        </Typography>
        {/* <>{isExploding && <ConfettiExplosion />} </>
        <Confetti
          width={width}
          height={height}
        /> */}
        {/* 빵빠레.. 구리긴한데 일단은 냅둠 */}
        <Grid container spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "80%",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "#F9F5F6",
              marginTop: "30px",
            }}
          >
            <Slider {...settings}>
              {recommendBook?.map((data, index) => (
                <Grid onClick={() => handleRecommendBookOpen(data)}>
                  <Card
                    sx={{ maxWidth: 280, margin: 1 }}
                    style={{ width: "220px" }}
                  >
                    <CardHeader
                      title={truncate(data.title, 12)}
                      subheader={truncate(data.author, 10)}
                      titleTypographyProps={{ variant: "body1" }}
                      subheaderTypographyProps={{ variant: "body2" }}
                    />
                    <motion.img
                      component="img"
                      width="220px"
                      height="200px"
                      src={data.cover}
                      alt="Paella dish"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 5 }}
                      transition={{ delay: index * 0.2 }}
                    />
                    <CardActions disableSpacing>
                      <FavoriteIcon
                        style={{
                          color: likes[data.isbn13] ? "#EF9A9A" : "gray",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(data.isbn13);
                          sendLikeBook(data.isbn13);
                        }}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Slider>
          </Box>
          <Dialog
            open={openRecommandBookDialog}
            onClose={handleRecommendBookClose}
          >
            <DialogTitle
              style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {"도서 정보"}
              {selectedRecommandBook ? (
                <FavoriteIcon
                  style={{
                    color: likes[selectedRecommandBook.isbn13]
                      ? "#EF9A9A"
                      : "gray",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(selectedRecommandBook.isbn13);
                    sendLikeBook(selectedRecommandBook.isbn13);
                  }}
                />
              ) : null}
            </DialogTitle>
            <DialogContent>
              {selectedRecommandBook ? (
                <>
                  <div
                    style={{
                      fontFamily: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>도서명 | </span>
                    {selectedRecommandBook.title}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>작가명 | </span>
                    {selectedRecommandBook.author}
                  </div>
                  <div style={{ fontSize: "15px" }}>
                    {selectedRecommandBook.description
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">")}
                  </div>
                </>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRecommendBookClose}>닫기</Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Typography
          sx={{
            fontWeight: "bold",
            marginLeft: "160px",
            fontSize: "20px",
            marginTop: "10px",
          }}
        >
          좋아요 많이 받은 도서 Top5!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "80%",
              height: "350px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "#F9F5F6",
              marginTop: "30px",
            }}
          >
            {bestsellerList.map((data, index) => (
              <Grid onClick={() => handleOpen(data)}>
                <Card
                  sx={{ maxWidth: 280, margin: "10px" }}
                  style={{ width: "220px" }}
                >
                  <CardHeader
                    title={truncate(data.title, 15)}
                    subheader={truncate(data.author, 10)}
                    titleTypographyProps={{ variant: "body1" }}
                    subheaderTypographyProps={{ variant: "body2" }}
                  />
                  <motion.img
                    component="img"
                    width="220px"
                    height="200px"
                    src={data.cover}
                    alt="Paella dish"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                  />

                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon
                        style={{
                          color: data.user_liked.includes(currentUser)
                            ? "#EF9A9A"
                            : "gray",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(data.isbn13);
                          sendLikeBook(data.isbn13);
                        }}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold"
              }}
            >
              {"도서 정보"}
              {selectedBook ? (
                <FavoriteIcon
                  style={{
                    color: selectedBook.user_liked.includes(currentUser)
                      ? "#EF9A9A"
                      : "gray",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(selectedBook.isbn13);
                    sendLikeBook(selectedBook.isbn13);
                  }}
                />
              ) : null}
            </DialogTitle>
            <DialogContent>
              {selectedBook ? (
                <>
                  <div
                    style={{
                      fontFamily: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>도서명 | </span>
                    {selectedBook.title}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>작가 | </span>
                    {selectedBook.author}
                  </div>
                  <div style={{ fontSize: "15px" }}>
                    {selectedBook.description
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">")}
                  </div>
                </>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>닫기</Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Typography
          sx={{
            fontWeight: "bold",
            marginLeft: "160px",
            fontSize: "20px",
            marginTop: "50px",
          }}
        >
          독후감 Top5!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "#F9F5F6",
              margin: "30px 0 100px",
            }}
          >
            {bookTop5List?.map((data) => (
              <Grid onClick={() => handleOpenBookReport(data)}>
                <Card
                  sx={{ maxWidth: 280, margin: 1 }}
                  style={{ width: "220px" }}
                >
                  <CardHeader
                    title={data.title}
                    subheader={data.writer}
                    titleTypographyProps={{ variant: "body1" }}
                    subheaderTypographyProps={{ variant: "body2" }}
                  />
                  <motion.img
                    component="img"
                    width="220px"
                    height="200"
                    src={data.cover}
                    alt="Paella dish"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon
                        style={{
                          color: data.user_liked.includes(currentUser)
                            ? "#EF9A9A"
                            : "gray",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(data.reportNum);
                          sendLikeBookReport(data.reportNum);
                        }}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Box>
          <Dialog open={openBookReportDialog} onClose={handleCloseBookReport}>
            <DialogTitle>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "bold"
                }}
              >
                {"독후감 정보"}
                {selectedBookReport && (
                  <FavoriteIcon
                    style={{
                      color: selectedBookReport.user_liked.includes(currentUser)
                        ? "#EF9A9A"
                        : "gray",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(selectedBookReport.reportNum);
                      sendLikeBookReport(selectedBookReport.reportNum);
                    }}
                  />
                )}
              </div>
            </DialogTitle>
            <DialogContent>
              {selectedBookReport ? (
                <>
                  <div
                    style={{
                      fontSize: "18px",
                      fontFamily: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>도서명 | </span>
                    {selectedBookReport.title}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    {selectedBookReport.writer}
                  </div>
                  <div>
                  <span style={{ fontWeight: "bold" }}>내용 | </span>
                    {selectedBookReport.reportContents}
                  </div>
                </>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseBookReport}>닫기</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
    </>
  );
}

export default MainPage;
