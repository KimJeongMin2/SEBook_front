import React, { useState, useEffect } from "react";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import axios from "axios";

import { Box, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
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

import { useNavigate, useLocation } from "react-router-dom";

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

const csrftoken = Cookies.get("csrftoken");

function MyLikedBookReport() {
  const location = useLocation();
  const navigate = new useNavigate();

  const [bookReportList, setBookReportList] = useState(
    location.state?.bookReportList || []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getPageData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return Array.isArray(bookReportList)
      ? bookReportList.slice(start, end)
      : [];
  };

  const [likedBookReportList, setLikedBookReportList] = useState([]);
  const [writtenBookReportList, setWrittenBookReportList] = useState([]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/bookReport/bookReportReadLike?page=${page}`, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log("공감한 독후감 : " + response.data.results);
        setBookReportList(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  }, [page]);


  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes({
      ...likes,
      [id]: !likes[id],
    });
  };

  const sendLikeBookReport = (bookReportNum) => {
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
          setLikes({
            ...likes,
            [bookReportNum]: !likes[bookReportNum],
          });
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

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
      .get("http://127.0.0.1:8000/bookReport/bookReportReadLike", {
        headers: {
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then((response) => {
        const likeBookReportList = response.data?.results || [];
        const reportNums = likeBookReportList.map((report) => report.reportNum);
        setLikedBookReportList(reportNums);
        updateLikesState(likeBookReportList);
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

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

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
            공감한 독후감
          </div>
        </div>

        <TableContainer
          component={Paper}
          style={{ display: "flex", maxWidth: "70%", margin: "20px auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#F8E8EE" }}>
              <TableRow>
                <TableCell style={{ width: "10px" }}>No</TableCell>
                <TableCell style={{ width: "300px" }}>제목</TableCell>
                <TableCell style={{ width: "250px" }}>도서명</TableCell>
                <TableCell style={{ width: "95px", textAlign: "center" }}>작가</TableCell>
                <TableCell style={{ width: "100px", textAlign: "center" }}>출판사</TableCell>
                <TableCell style={{ width: "50px", textAlign: "center" }}>글쓴이</TableCell>
                <TableCell style={{ width: "80px", textAlign: "center" }}>등록일</TableCell>
                <TableCell style={{ width: "50px", textAlign: "center" }}>좋아요</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#F9F5F6" }}>
              {getPageData()?.map((data, index) => {
                const isUserLikeReportsLiked =
                  Array.isArray(likedBookReportList) &&
                  likedBookReportList.some((report) => data.reportNum === report);
                const isUserWriteReportsLiked =
                  Array.isArray(writtenBookReportList) &&
                  writtenBookReportList.some((report) => data.reportNum === report);

                const rowData = {
                  ...data,
                  isUserLikeReportsLiked,
                  isUserWriteReportsLiked,
                };

                return (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() =>
                      navigate(`/BookReportDetail/${data.id}`, { state: rowData })
                    }
                  >
                    <TableCell component="th" scope="row">
                      {(page - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {truncate(data.reportTitle, 20)}
                    </TableCell>
                    <TableCell>{truncate(data.title, 20)}</TableCell>
                    <TableCell>{truncate(data.author, 6)}</TableCell>
                    <TableCell>{truncate(data.publisher, 6)}</TableCell>
                    <TableCell>{truncate(data.username, 6)}</TableCell>
                    <TableCell>{data.registDate_report.split("T")[0]}</TableCell>
                    <TableCell style={{ width: "50px", textAlign: "center" }}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(data.reportNum);
                          sendLikeBookReport(data.reportNum);
                        }}
                      >
                        <FavoriteIcon
                          style={{
                            color: "#EF9A9A",
                          }}
                        />
                      </IconButton>
                      <div style={{ marginTop: "-5px" }}>{data.like_count}</div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex" }}>
          {bookReportList && (
            <Pagination
              count={totalPages}
              color="primary"
              style={{
                margin: "40px 0",
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              onChange={handleChangePage}
            />
          )}
        </div>
      </Box>
    </>
  );
}

export default MyLikedBookReport;