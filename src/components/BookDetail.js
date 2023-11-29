import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import Cookies from "js-cookie";
const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  position: "relative",
  borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
  backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
  marginRight: 0,
  marginLeft: "auto", // 오른쪽 정렬 적용
  marginTop: "1ch",
  marginRight: "18ch",
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

const csrftoken = Cookies.get("csrftoken");

function BookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState();

  const [isSelectedLike, setIsSelectedLike] = useState(
    location.state.isUserLikeBook
  );

  const [likes, setLikes] = useState({});
  const selectLike = () => {
    setIsSelectedLike(!isSelectedLike);
  };
  const [likeCount, setLikeCount] = useState(location.state.num_likes);

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

  const sendLikeBook = (isbn13) => {
    if (!myInfo) {
      toast.warning(
        () => (
          <div style={{ margin: "25px 0 0 10px" }}>
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
            const newSelectedLike = !isSelectedLike;
            setIsSelectedLike(newSelectedLike);
            setLikeCount((prevCount) =>
              newSelectedLike ? prevCount + 1 : prevCount - 1
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
        <div style={{ display: "flex", marginTop: "70px" }}>
          <Search style={{ marginTop: "20px", marginRight: "255px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              style={{ fontSize: "13px" }}
              placeholder="도서명 또는 작가명을 입력하세요."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </div>
        <div
          style={{
            display: "flex",
            margin: "10px auto",
            padding: "20px",
            backgroundColor: "#F9F5F6",
            width: "62%",
            height: "350px",
          }}
        >
          <div
            style={{
              width: "250px",
              padding: "10px",
              height: "330px",
              backgroundColor: "#F8E8EE",
            }}
          >
            <motion.img
              src={location.state.cover}
              style={{ width: "250px", height: "330px" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          <div style={{ margin: "0 0px 0 20px", width: "620px" }}>
            <div
              style={{
                margin: "5px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "22px" }}>{location.state.title}</div>
              <div>{location.state.categoryName}</div>
            </div>
            <div
              style={{
                display: "flex",
                margin: "5px",
                justifyContent: "space-between",
              }}
            >
              <div>{location.state.depth1}</div>
            </div>
            <div
              style={{
                display: "flex",
                margin: "5px",
                justifyContent: "space-between",
              }}
            >
              <div>
                {location.state.author} | {location.state.publisher} |{" "}
                {location.state.pubDate}
              </div>
              <div>{location.state.priceStandard} 원</div>
            </div>
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                width: "96%",
                height: "180px",
                backgroundColor: "#F8E8EE",
              }}
            >
              <div>
                {location.state.description
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  margin: "20px 10px 0 0",
                  fontSize: "12px",
                  color: "#cccccc",
                }}
              >
                도서 DB 제공 : 알라딘 인터넷 서점(www.aladin.co.kr)
              </div>
              <Stack spacing={0} direction="row">
                <Button
                  variant="contained"
                  style={{
                    marginTop: "10px",
                    marginRight: "5px",
                    width: "100px",
                    height: "30px",
                    backgroundColor: "#EF9A9A",
                    color: "#ffffff",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  구매하기
                </Button>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "10px",
                    marginRight: "5px",
                    width: "120px",
                    height: "30px",
                    backgroundColor: "#EF9A9A",
                    color: "#ffffff",
                  }}
                  onClick={() => {
                    navigate("/CommunityRegist", {
                      state: {
                        book: location.state.title,
                        author: location.state.author,
                        publisher: location.state.publisher,
                        isbn13: location.state.isbn13,
                      },
                    });
                  }}
                >
                  구절등록하기
                </Button>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "10px",
                    marginRight: "5px",
                    width: "120px",
                    height: "30px",
                    backgroundColor: "#EF9A9A",
                    color: "#ffffff",
                  }}
                  onClick={() => {
                    navigate("/BookReportRegist", {
                      state: {
                        book: location.state.title,
                        author: location.state.author,
                        publisher: location.state.publisher,
                        isbn13: location.state.isbn13,
                      },
                    });
                  }}
                >
                  독후감 작성
                </Button>
              </Stack>
              <div style={{ display: "flex", margin: "5px 5px 0 0px" }}>
                <div>
                  {isSelectedLike ? (
                    <FavoriteIcon
                      style={{ fontSize: "30px", color: "#EF9A9A" }}
                      onClick={() => sendLikeBook(location.state.isbn13)}
                    ></FavoriteIcon>
                  ) : (
                    <FavoriteBorderIcon
                      style={{ fontSize: "30px", color: "#EF9A9A" }}
                      onClick={() => sendLikeBook(location.state.isbn13)}
                    ></FavoriteBorderIcon>
                  )}
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "-10px",
                      fontSize: "13px",
                    }}
                  >
                    {likeCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default BookDetail;
