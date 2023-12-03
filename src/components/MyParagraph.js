import React, { useState, useEffect } from "react";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";

import { Box, InputBase, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";

const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  position: "relative",
  borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
  backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
  marginRight: 0,
  marginLeft: "auto", // 오른쪽 정렬 적용
  marginTop: "1ch",
  marginRight: "27ch",
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

function MyParagraph({ PROXY }) {
  const navigate = new useNavigate();

  const [paragraphList, setParagraphList] = useState([]);

  const itemsPerPage = 4;
  const [myInfo, setMyInfo] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [modalLikeStatus, setModalLikeStatus] = useState(false);
  const [likes, setLikes] = useState({});

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleOpen = (data) => {
    setOpen(true);
    setModalContent(data);
    setModalLikeStatus(data.user_liked.includes(currentUser));
  };

  useEffect(() => {
    console.log("mmooddalle", modalContent);
  }, [modalContent]);

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    setParagraphList([]);
    axios
      .get(`http://127.0.0.1:8000/community/paragraphReadMy?page=${page}`, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log("공감한 독후감 : " + response.data.results);
        setParagraphList(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  }, [page]);

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

  const toggleLike = (id) => {
    setLikes({
      ...likes,
      [id]: !likes[id],
    });
  };

  const sendLikeCommunity = (postNum) => {
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
      toggleLike(postNum);
      axios
        .post(
          "http://127.0.0.1:8000/community/paragraphLike",
          {
            postNum: postNum,
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
              [postNum]: !likes[postNum],
            }));
          }
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendDeleteParagraphMy = (postNum) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .delete(
          "http://127.0.0.1:8000/community/paragraphDelete",
          {
            params: {
              postNum: postNum,
            },
          },
          {
            headers: {
              "X-CSRFToken": csrftoken,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("취소합니다.");
    }
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const currentUser = myInfo?.userNum;

  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
        <div style={{ display: "flex", marginTop: "70px" }}>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "230px",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            나의 인상깊은 구절
          </div>
        </div>
        <TableContainer
          component={Paper}
          style={{ display: "flex", maxWidth: "70%", margin: "20px auto" }}
        >
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#F8E8EE" }}>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>도서명</TableCell>
                <TableCell>인상깊은 구절</TableCell>
                <TableCell style={{ textAlign: "center" }}>작성자</TableCell>
                <TableCell style={{ textAlign: "center" }}>등록일</TableCell>
                <TableCell style={{ textAlign: "center" }}>좋아요</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#F9F5F6" }}>
              {paragraphList?.map((row, index) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    handleOpen(row);
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      width: "10px",
                      borderRight: "1px solid #F8E8EE",
                      textAlign: "center",
                    }}
                  >
                    {(page - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "180px", borderRight: "1px solid #F8E8EE" }}
                  >
                    {truncate(row.title, 16)}
                  </TableCell>
                  <TableCell
                    style={{ width: "500px", borderRight: "1px solid #F8E8EE" }}
                  >
                    {truncate(row.contents, 28)}
                  </TableCell>
                  <TableCell style={{ width: "60px", textAlign: "center" }}>
                    {truncate(row.username, 3)}
                  </TableCell>
                  <TableCell style={{ width: "80px", textAlign: "center" }}>
                    {row.registDate_community.split("T")[0]}
                  </TableCell>
                  <TableCell style={{ width: "50px", textAlign: "center" }}>
                    <div>
                      <FavoriteIcon
                        className="like"
                        style={{
                          color: row.user_liked.includes(currentUser)
                            ? "#EF9A9A"
                            : "gray",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(row.postNum);
                          sendLikeCommunity(row.postNum);
                        }}
                      />
                      <div style={{ marginTop: "-5px" }}>{row.like_count}</div>
                    </div>
                  </TableCell>

                  <TableCell
                    style={{
                      width: "20px",
                      textAlign: "center",
                      fontSize: "10px",
                    }}
                  >
                    <DeleteIcon
                      style={{ color: "#FF9999" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        sendDeleteParagraphMy(row.postNum);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex" }}>
          <Pagination
            component="div"
            count={totalPages} // Calculate the number of pages based on rows
            page={page}
            onChange={handleChangePage}
            style={{ margin: "10px auto 20px" }}
            color="primary"
          />
        </div>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            // border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            <div>구절 정보</div>

            {modalContent && (
              <FavoriteIcon
                style={{
                  color: modalLikeStatus ? "#EF9A9A" : "gray",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(modalContent.postNum);
                  sendLikeCommunity(modalContent.postNum);
                  setModalLikeStatus(!modalLikeStatus);
                }}
              />
            )}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>도서명 | </span>
            {modalContent.title}
            <div>{modalContent.date}</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>작가 | </span>
            {modalContent.author}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>내용 | </span>
            {modalContent.contents}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose}>닫기</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default MyParagraph;