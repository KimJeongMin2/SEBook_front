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
        console.log("bestSeller: " + response.data.bestsellerList);
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
      toggleLike(isbn13);
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

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

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
            marginLeft: "140px",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {myInfo?.name
            ? `${myInfo?.name}님, 맞춤 도서 추천`
            : "맞춤도서를 추천 받아 보고 싶으시다면 로그인 하세요!"}
          <img src="data:image/png;base64,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" alt="이미지_설명" style={{ width: '50px', height: '50px', marginTop: '-12px' }} />
        </Typography>
        <Typography
          sx={{
            marginLeft: "140px",
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 'bold', color: '#EF9A9A' }}>지식그래프</div>
          를 기반으로 사용자에게&nbsp;
          <div>{" "}</div>
          <div style={{ fontWeight: 'bold', color: '#EF9A9A' }}>맞춤형 도서</div>
          를 추천해드립니다
        </Typography>
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
            <Slider {...settings} autoplay={true} autoplaySpeed={3000}>
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
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <CardActions disableSpacing>
                      <FavoriteIcon
                        style={{
                          color: likes[data.isbn13] ? "#EF9A9A" : "gray",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          sendLikeBook(data.isbn13);
                        }}
                      />
                      <div style={{ marginLeft: '5px' }}>{data.num_likes}</div>
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
            marginLeft: "140px",
            fontSize: "20px",
            marginTop: "50px",
          }}
        >
          도서 Top5!
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
                    title={<>
                      <div style={{ display: 'flex' }}>
                        <div style={{ borderRadius: '5px', display: 'flex', width: '20px', height: '20px', backgroundColor: '#EF9A9A', lineHeight: '20px', marginRight: '5px' }}>
                          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>{(index + 1)}</span>
                        </div>
                        {` ` + truncate(data.title, 11)}
                      </div>
                    </>}
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
                      <div style={{ marginLeft: '5px', fontSize: '15px' }}>{data.num_likes}</div>
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
            marginLeft: "140px",
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
            {bookTop5List?.map((data, index) => (
              <Grid onClick={() => handleOpenBookReport(data)}>
                <Card
                  sx={{ maxWidth: 280, margin: 1 }}
                  style={{ width: "220px" }}
                >
                  <CardHeader
                    title={<>
                      <div style={{ display: 'flex' }}>
                        <div style={{ borderRadius: '5px', display: 'flex', width: '20px', height: '20px', backgroundColor: '#EF9A9A', lineHeight: '20px', marginRight: '5px' }}>
                          <span style={{ fontSize: '16px', paddingLeft: '5px' }}>{(index + 1)}</span>
                        </div>
                        {` ` + truncate(data.reportTitle, 11)}
                      </div>
                    </>}
                    subheader={data.title}
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
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginLeft: '-5px', fontSize: '15px' }}>{data.like_count}</div>
                      <div style={{ marginLeft: '80px' }}>by. {truncate(data.username, 3)}</div>
                    </div>
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
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: '16px' }}>독후감 제목 | </span>
                    <span style={{ fontSize: '16px' }}>{selectedBookReport.reportTitle}</span>
                  </div>
                  <div
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: '16px' }}>글쓴이 | </span>
                    <span style={{ fontSize: '16px' }}>{selectedBookReport.username}</span>
                  </div>
                  <div
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: '16px' }}>도서명 | </span>
                    <span style={{ fontSize: '16px' }}>{selectedBookReport.title}</span>
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    {truncate(selectedBookReport.writer, 13)}
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold", fontSize: '16px' }}>내용 | </span>
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
      </Box >
    </>
  );
}

export default MainPage;