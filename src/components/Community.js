import React, { useState, useEffect } from "react";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import axios from "axios";
import { Box, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
function createData(id, title, paragraph, writer, date, like) {
  return { id, title, paragraph, writer, date, like };
}

const initialRows = [
  createData(
    1,
    "신데렐라",
    "잊지 말아야 할 것은, 인내와 선의가 항상 보상을 받는다는 것이다.",
    "김글쓴",
    "2023-03-21",
    10
  ),
  createData(2, "도서명", "인상 깊었던 구절", "홍길동", "2023-03-21", 122),
  createData(3, "도서명", "인상 깊었던 구절", "홍길동", "2023-03-21", 10),
  createData(4, "도서명", "인상 깊었던 구절", "홍길동", "2023-03-21", 30),
  createData(5, "도서명", "인상 깊었던 구절", "홍길동", "2023-03-21", 32),
  createData(6, "도서명", "인상 깊었던 구절", "홍길동", "2023-03-21", 2),
  createData(7, "도서명", "인상 깊었던 구절", "홍길동", "2023-03-21", 1),
];

const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  position: "relative",
  borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
  backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
  marginRight: 0,
  marginLeft: "auto", // 오른쪽 정렬 적용
  marginTop: "1ch",
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

function Community() {
  const navigate = new useNavigate();

  const [communityList, setCommunityList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [paragraphList, setParagraphList] = useState([]);
  const [searchType, setSearchType] = useState("도서명");

  const handleOpen = (content) => {
    setOpen(true);
    setModalContent(content);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const getPageData = () => {
    if (!communityList) {
      return [];
    }
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return communityList.slice(start, end);
  };

  useEffect(() => {
    axios
      .get("http://192.168.0.8:8000/community/paragraphReadAll")
      .then((response) => {
        console.log(response.data); // Log the entire response
        setCommunityList(response.data.allPosts || []);
      })
      .catch((error) => console.error(error));
  }, []);

  const sendLikeCommunity = (postNum) => {
    axios
      .post("http://192.168.0.8:8000/community/paragraphLike", {
        postNum: postNum,
        userNum: 1,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [likeStatus, setLikeStatus] = useState({}); // Initialize like status for each row

  // Function to toggle the like status for a specific row
  const toggleLike = (id) => {
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
    if (!likeStatus[id]) {
      sendLikeCommunity(id);
    }
  };


  const searchParagraphByAuthor = () => {
    axios
      .get(`http://192.168.0.8:8000/community/searchParagraphByAuthor`, {
        params: {
          author: searchTerm,
        },
      })
      .then((response) => {
        setCommunityList(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const searchParagraphByTitle = () => {
    axios
      .get(`http://192.168.0.8:8000/community/searchParagraphByTitle`, {
        params: {
          title: searchTerm,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCommunityList(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };
  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchType === "작가명") {
        searchParagraphByAuthor();
      } else if (searchType === "도서명") {
        searchParagraphByTitle();
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
        <div
          style={{
            display: "flex",
            maxWidth: "70%",
            marginTop: "70px",
            margin: "70px auto 0",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ marginTop: "35px", fontSize: "22px", fontWeight: "bold" }}
          >
            커뮤니티
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
            <Search
              style={{ marginTop: "30px", height: "35px", marginLeft: "auto" }}
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
          </div>
        </div>
        <TableContainer
          component={Paper}
          style={{ display: "flex", maxWidth: "70%", margin: "10px auto" }}
        >
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#F8E8EE" }}>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>도서명</TableCell>
                <TableCell>인상깊은 구절</TableCell>
                <TableCell>작가</TableCell>
                <TableCell>등록일</TableCell>
                <TableCell>좋아요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#F9F5F6" }}>
              {communityList && communityList.length > 0 ? (
                getPageData()?.map((data, index) => (
                  <TableRow
                    key={data.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleOpen(data)}
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
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        width: "250px",
                        borderRight: "1px solid #F8E8EE",
                      }}
                    >
                      {truncate(data.title, 18)}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "500px",
                        borderRight: "1px solid #F8E8EE",
                      }}
                    >
                      {truncate(data.contents, 30)}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "180px",
                        borderRight: "1px solid #F8E8EE",
                        textAlign: "center",
                      }}
                    >
                      {truncate(data.author, 9)}
                    </TableCell>
                    <TableCell style={{ width: "90px", textAlign: "center" }}>
                      {data.registDate_community.split('T')[0]}
                    </TableCell>
                    <TableCell style={{ width: "50px", textAlign: "center" }}>
                      {likeStatus[data.postNum] ? (
                        <FavoriteIcon
                          style={{ color: "#EF9A9A" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(data.postNum);
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{ color: "#EF9A9A" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(data.postNum);
                          }}
                        />
                      )}
                      <div style={{ marginTop: "-5px" }}>{data.like_count}</div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", maxWidth: "70%", margin: "0 auto" }}>
          <Pagination
            count={Math.ceil(communityList.length / itemsPerPage)}
            color="primary"
            style={{
              margin: "-7px 0",
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
            onChange={handleChangePage}
          />
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              style={{
                width: "100px",
                height: "30px",
                backgroundColor: "#EF9A9A",
                color: "#ffffff",
              }}
              onClick={() => {
                navigate("/CommunityRegist");
              }}
            >
              등록하기
            </Button>
          </Stack>
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
            {likeStatus[modalContent.postNum] ? (
              <FavoriteIcon
                style={{ color: "#EF9A9A" }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(modalContent.postNum);
                }}
              />
            ) : (
              <FavoriteBorderIcon
                style={{ color: "#EF9A9A" }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(modalContent.postNum);
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

export default Community;
