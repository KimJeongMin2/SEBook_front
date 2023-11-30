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
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../list.css";
import { toast } from "react-toastify";
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

function BookReportList() {
  const navigate = new useNavigate();
  const location = useLocation();
  const [bookReportList, setBookReportList] = useState(
    location.state?.bookReportList || []
  );
  const [myInfo, setMyInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchType, setSearchType] = useState("도서명");
  const [likeStatus, setLikeStatus] = useState({}); // Initialize like status for each row
  const [likedBookReportList, setLikedBookReportList] = useState([]);
  const [writtenBookReportList, setWrittenBookReportList] = useState([]);
  const [likes, setLikes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0); // Add this line

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

  useEffect(() => {
    setBookReportList([]);
    axios
      .get(`http://127.0.0.1:8000/bookReport/bookReportReadAll?page=${currentPage}`)
      .then((response) => {
        console.log("resulttttt", response.data.results);
        setBookReportList(response.data.results);
        console.log("dddd", response.data.total_pages);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);



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
      .get("http://127.0.0.1:8000/bookReport/bookReportReadLike", {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then((response) => {
        const likeBookReportList = response.data.likeBookReportList;

        const reportNums = likeBookReportList.map((report) => report.reportNum);
        setLikedBookReportList(reportNums);
        console.log(reportNums);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bookReport/bookReportReadMy", {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then((response) => {
        const writtenBookReportList = response.data.userBookReportList;

        const reportNums = writtenBookReportList.map(
          (report) => report.reportNum
        );
        setWrittenBookReportList(reportNums);
        console.log(reportNums);
      })
      .catch((error) => console.error(error));
  }, []);

  const sendLikeBookReport = (bookReportNum) => {
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
      toggleLike(bookReportNum);
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
          console.log(response);
          toggleLike(bookReportNum);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendDeleteLikeBookReport = (bookReportNum) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .delete("http://127.0.0.1:8000/bookReport/bookReportDelete", {
          params: {
            reportNum: bookReportNum,
          },
          headers: {
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }

  const searchBookByTitle = () => {
    axios
      .get(`http://127.0.0.1:8000/bookReport/bookReportSearch`, {
        params: {
          title: searchTerm,
        },
      })
      .then((response) => {
        setBookReportList(response.data.bookReportList);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };

  const searchBookByAuthor = () => {
    axios
      .get(`http://127.0.0.1:8000/bookReport/bookReportSearchByAuthor`, {
        params: {
          author: searchTerm,
        },
      })
      .then((response) => {
        setBookReportList(response.data.bookReportList);
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
        searchBookByAuthor();
      } else if (searchType === "도서명") {
        searchBookByTitle();
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
            style={{ marginLeft: '50px', marginTop: "35px", fontSize: "22px", fontWeight: "bold" }}
          >
            독후감
          </div>
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <StyledSelect
              sx={{
                marginTop: "30px",
                marginRight: "5px",
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
              style={{ marginTop: "30px", height: "35px", marginLeft: "auto", marginRight: '35px' }}
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
        <div style={{ height: '440px' }}>
          <TableContainer
            component={Paper}
            style={{ display: "flex", maxWidth: "72%", margin: "10px auto" }}
          >
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "#F8E8EE" }}>
                <TableRow>
                  <TableCell style={{ width: "10px" }}>No</TableCell>
                  <TableCell style={{ width: "200px" }}>제목</TableCell>
                  <TableCell style={{ width: "200px" }}>도서명</TableCell>
                  <TableCell style={{ width: "70px", textAlign: " center" }}>
                    작가
                  </TableCell>
                  <TableCell style={{ width: "70px", textAlign: " center" }}>
                    출판사
                  </TableCell>
                  <TableCell style={{ width: "50px", textAlign: " center" }}>
                    글쓴이
                  </TableCell>
                  <TableCell style={{ width: "80px", textAlign: " center" }}>
                    등록일
                  </TableCell>
                  <TableCell style={{ width: '30px', textAlign: 'left', marginLeft: '-10px' }}>
                    공감
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ backgroundColor: "#F9F5F6" }}>
                {bookReportList?.map((data, index) => {
                  const isUserLikeReportsLiked =
                    Array.isArray(likedBookReportList) &&
                    likedBookReportList.some(
                      (report) => data.reportNum === report
                    );
                  const isUserWriteReportsLiked =
                    Array.isArray(writtenBookReportList) &&
                    writtenBookReportList.some(
                      (report) => data.reportNum === report
                    );

                  const rowData = {
                    ...data,
                    isUserLikeReportsLiked,
                    isUserWriteReportsLiked,
                  };

                  return (
                    <TableRow
                      className="list"
                      key={data.title}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          width: "10px",
                          borderRight: "1px solid #F8E8EE",
                          textAlign: "center",

                        }}
                        onClick={() =>
                          navigate(`/BookReportDetail/${data.reportNum}`, {
                            state: rowData,
                          })
                        }
                      >
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          width: "30px",
                          borderRight: "1px solid #F8E8EE",

                        }}
                        onClick={() =>
                          navigate(`/BookReportDetail/${data.reportNum}`, {
                            state: rowData,
                          })
                        }
                      >
                        {truncate(data.reportTitle, 25)}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          width: "10px",
                          borderRight: "1px solid #F8E8EE",

                        }}
                        onClick={() =>
                          navigate(`/BookReportDetail/${data.reportNum}`, {
                            state: rowData,
                          })
                        }
                      >
                        {truncate(data.title, 20)}{" "}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "10px",
                          borderRight: "1px solid #F8E8EE",
                          textAlign: "center",
                        }}
                        onClick={() =>
                          navigate(`/BookReportDetail/${data.reportNum}`, {
                            state: rowData,
                          })
                        }
                      >
                        {truncate(data.author, 5)}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "10px",
                          borderRight: "1px solid #F8E8EE",
                          textAlign: "center",
                        }}
                        onClick={() =>
                          navigate(`/BookReportDetail/${data.reportNum}`, {
                            state: rowData,
                          })
                        }
                      >
                        {truncate(data.publisher, 5)}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "3px",
                          borderRight: "1px solid #F8E8EE",
                          textAlign: "center",
                        }}
                        onClick={() =>
                          navigate(`/BookReportDetail/${data.reportNum}`, {
                            state: rowData,
                          })
                        }

                      >
                        {truncate(data.username, 3)}
                      </TableCell>
                      <TableCell
                        style={{
                          width: "10px",
                          borderRight: "1px solid #F8E8EE",
                          textAlign: "center",
                        }}
                        onClick={() =>
                          navigate(`/BookReportDetail/${data.reportNum}`, {
                            state: rowData,
                          })
                        }

                      >
                        {data.registDate_report.split("T")[0]}
                      </TableCell>
                      <TableCell style={{ width: "10px", textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                sendLikeBookReport(data.reportNum);
                                if (likes[data.reportNum]) {
                                  sendDeleteLikeBookReport(data.reportNum);
                                }
                              }}
                            >
                              {isUserLikeReportsLiked || likes[data.reportNum] ? (
                                <FavoriteIcon style={{ color: "#EF9A9A" }} />
                              ) : (
                                <FavoriteBorderIcon
                                  style={{ color: "#EF9A9A" }}
                                />
                              )}
                            </IconButton>
                            <div style={{ textAlign: "center" }}>
                              {data.like_count}
                            </div>
                          </div>
                          {isUserWriteReportsLiked ? (
                            <IconButton
                              style={{ marginLeft: "10px" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                sendDeleteLikeBookReport(data.reportNum);
                              }}
                            >
                              <DeleteIcon style={{ color: "#FF9999" }} />
                            </IconButton>
                          ) : (
                            <></>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
              count={totalPages}
              color="primary"
              style={{
                margin: "45px 0",
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
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
                marginLeft: "40px",
              }}
              onClick={() => {
                navigate("/BookReportRegist");
              }}
            >
              등록하기
            </Button>
          </Stack>
        </div>
      </Box>
    </>
  );
}

export default BookReportList;
