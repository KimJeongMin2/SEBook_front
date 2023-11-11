import React, { useState, useEffect } from "react";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import axios from "axios";
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
import Select from "@mui/material/Select";
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../bookReportList.css";

function createData(
  id,
  title,
  bookName,
  author,
  publisher,
  writer,
  date,
  like
) {
  return { id, title, bookName, author, publisher, writer, date, like };
}

const initialRows = [
  createData(
    1,
    "Frozen yoghurt를 읽고1",
    "Frozen yoghurt",
    "김작가",
    "김나라출판",
    "정채연",
    "2023-03-21",
    10
  ),
  createData(
    2,
    "Frozen yoghurt를 읽고2",
    "Frozen yoghurt",
    "김작가",
    "김나라출판",
    "정채연",
    "2023-03-21",
    10
  ),
  createData(
    3,
    "Frozen yoghurt를 읽고3",
    "Frozen yoghurt",
    "김작가",
    "김나라출판",
    "정채연",
    "2023-03-21",
    10
  ),
  createData(
    4,
    "Frozen yoghurt를 읽고4",
    "Frozen yoghurt",
    "김작가",
    "김나라출판",
    "정채연",
    "2023-03-21",
    10
  ),
  createData(
    5,
    "Frozen yoghurt를 읽고5",
    "Frozen yoghurt",
    "김작가",
    "김나라출판",
    "정채연",
    "2023-03-21",
    10
  ),
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

function BookReportList() {
  const navigate = new useNavigate();
  const location = useLocation();
  const [bookReportList, setBookReportList] = useState(location.state?.bookReportList || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getPageData = () => {
    if (bookReportList) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return bookReportList.slice(start, end);
    } else {
      return [];
    }
  };

  const [searchType, setSearchType] = useState("도서명");

  const [likeStatus, setLikeStatus] = useState({}); // Initialize like status for each row
  const [likedBookReportList, setLikedBookReportList] = useState([]);
  const [likes, setLikes] = useState({});
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const toggleLike = (id) => {
    setLikes({
      ...likes,
      [id]: !likes[id],
    });
  };

  useEffect(() => {
    axios
      .get("http://121.183.121.119:8000/bookReport/bookReportReadAll")
      .then((response) => {
        console.log("bookReportList: " + response.data.allReports);
        setBookReportList(response.data.allReports);

        if (location.state.bookReportList) {
          // console.log("look ..: " + location.state.bookList[0]); 
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://121.183.121.119:8000/bookReport/bookReportReadLike", {
        params: {
          userNum: 1
        }
      })
      .then((response) => {

        setLikedBookReportList(response.data.likeBookReportList);
      })
      .catch((error) => console.error(error));
  }, []);

  const sendLikeBookReport = (bookReportNum) => {
    axios.post("http://121.183.121.119:8000/bookReport/bookReportLike", {
      reportNum: bookReportNum,
      userNum: 1
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
        <div
          style={{
            display: "flex",
            margin: "70px auto 0",
            maxWidth: "77%",
            marginTop: "70px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ marginTop: "35px", fontSize: "22px", fontWeight: "bold" }}
          >
            독후감
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
              />
            </Search>
          </div>
        </div>
        <TableContainer
          component={Paper}
          style={{ display: "flex", maxWidth: "77%", margin: "20px 176px" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#F8E8EE" }}>
              <TableRow>
                <TableCell style={{ width: "10px" }}>No</TableCell>
                <TableCell style={{ width: "200px" }}>제목</TableCell>
                <TableCell style={{ width: "100px" }}>도서명</TableCell>
                <TableCell style={{ width: "50px" }}>작가</TableCell>
                <TableCell style={{ width: "50px" }}>출판사</TableCell>
                <TableCell style={{ width: "50px" }}>글쓴이</TableCell>
                <TableCell style={{ width: "50px" }}>등록일</TableCell>
                <TableCell style={{ width: "20px", textAlign: 'center' }}>좋아요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#F9F5F6" }}>
              {getPageData()?.map((data) => (
                <TableRow
                  className="bookReportTable"
                  key={data.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>
                    {data.reportNum}
                  </TableCell>
                  <TableCell component="th" scope="row" onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>
                    {truncate(data.reportTitle, 18)}
                  </TableCell>
                  <TableCell onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>{truncate(data.title, 13)} </TableCell>
                  <TableCell onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>{truncate(data.author, 5)}</TableCell>
                  <TableCell onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>{truncate(data.publisher, 5)}</TableCell>
                  <TableCell onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>{data.username}</TableCell>
                  <TableCell onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>{data.registDate_report.split('T')[0]}</TableCell>
                  <TableCell style={{ width: "50px", textAlign: "center" }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(data.reportNum);
                        sendLikeBookReport(data.reportNum);
                      }}
                    >
                      <FavoriteIcon style={{ color: likes[data.reportNum] ? "#EF9A9A" : "gray" }} />
                    </IconButton>
                    <div style={{ marginTop: "-5px" }}>{data.like_count}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            maxWidth: "77%",
            justifyContent: "space-between",
          }}
        >
          {bookReportList && (
            <Pagination
              count={Math.ceil(bookReportList.length / itemsPerPage)}
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
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              style={{
                width: "100px",
                height: "30px",
                backgroundColor: "#EF9A9A",
                color: "#ffffff",
                marginTop: '-10px',

              }}
              onClick={() => {
                navigate("/BookReportRegist");
              }}
            >
              등록하기
            </Button>
          </Stack>
        </div>
      </Box >
    </>
  );
}

export default BookReportList;
