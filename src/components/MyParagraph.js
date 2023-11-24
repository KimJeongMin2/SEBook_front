import React, { useState, useEffect } from "react";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";

import { Box, InputBase } from "@mui/material";
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

import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
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

const csrftoken = Cookies.get('csrftoken');

function MyParagraph({ PROXY }) {
  const navigate = new useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [paragraphReadMy, setParagraphReadMy] = useState([]);
  // const [rows, setRows] = useState(paragraphReadMy);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0); // Reset to the first page when changing rows per page
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const displayRows = initialRows.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const [likeStatus, setLikeStatus] = useState({}); // Initialize like status for each row

  // Function to toggle the like status for a specific row
  const toggleLike = (id) => {
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
  };

  const getPageData = () => {
    if (paragraphReadMy) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return paragraphReadMy.slice(start, end);
    } else {
      return [];
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/community/paragraphReadMy", {
        headers: {
          'X-CSRFToken': csrftoken 
        },
        withCredentials: true})
      .then((response) => {
        console.log(response.data.userCommunityList);
        setParagraphReadMy(response.data.userCommunityList);
      })
      .catch((error) => console.error(error));
  }, []);

  const sendDeleteParagraphMy = (postNum) => {
    if (window.confirm("삭제하시겠습니까?")) {
    axios
      .delete("http://127.0.0.1:8000/community/paragraphDelete", {
        params: {
          postNum: postNum,
        }
      },{
        headers: {
          'X-CSRFToken': csrftoken 
        },
        withCredentials: true})
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
                <TableCell style={{ textAlign: 'center' }}>작성자</TableCell>
                <TableCell style={{ textAlign: 'center' }}>등록일</TableCell>
                <TableCell style={{ textAlign: 'center' }}>좋아요</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#F9F5F6" }}>
              {getPageData()?.map((row, index) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                // onClick={() => navigate(`/CommunityDetail/${row.id}`, { state: row })}
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
                    {row.registDate_community.split('T')[0]}
                  </TableCell>
                  <TableCell style={{ width: "50px", textAlign: "center" }}>
                    {row.like_count}
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
            count={Math.ceil(initialRows.length / rowsPerPage)} // Calculate the number of pages based on rows
            page={page}
            onChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ margin: "10px auto 20px" }}
            color="primary"
          />
        </div>
      </Box>
    </>
  );
}

export default MyParagraph;