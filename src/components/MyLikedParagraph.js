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
  createData(3, "도서명", "인상 깊었던 구절", "김정민", "2023-03-21", 10),
  createData(4, "도서명", "인상 깊었던 구절", "신영옥", "2023-03-21", 30),
  createData(5, "도서명", "인상 깊었던 구절", "정채연", "2023-03-21", 32),
  createData(6, "도서명", "인상 깊었던 구절", "이길동", "2023-03-21", 2),
  createData(7, "도서명", "인상 깊었던 구절", "최글쓴", "2023-03-21", 1),
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
function MyLikedParagraph() {
  const navigate = new useNavigate();

  // const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [likeParagraph, setLikeParagraph] = useState([]);

  const [likes, setLikes] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://192.168.123.158:8000/community/paragraphReadLike", {
        params: {
          userNum: 1
        },
      })
      .then((response) => {
        console.log(response.data.savedCommunityList);
        setLikeParagraph(response.data.savedCommunityList);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0); // Reset to the first page when changing rows per page
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const getPageData = () => {
    if (likeParagraph) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return likeParagraph.slice(start, end);
    } else {
      return [];
    }
  };

  const [likeStatus, setLikeStatus] = useState({}); // Initialize like status for each row

  // Function to toggle the like status for a specific row
  const toggleLike = (id) => {
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
  };

  const sendDeleteParagraph = (postNum) => {
    axios.delete("http://192.168.123.158:8000/community/paragraphLike", {
      params: {
        postNum: postNum,
        userNum: 1,
      }
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
        <div style={{ display: "flex", marginTop: "70px" }}>
          <div
            style={{
              marginTop: "20px",
              marginLeft: "270px",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            좋아요 누른 구절
          </div>
        </div>
        <TableContainer
          component={Paper}
          style={{ display: "flex", maxWidth: "65%", margin: "20px auto" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#F8E8EE" }}>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>도서명</TableCell>
                <TableCell>인상깊은 구절</TableCell>
                <TableCell>작가</TableCell>
                <TableCell>등록일</TableCell>
                <TableCell>좋아요</TableCell>
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
                    {row.title}
                  </TableCell>
                  <TableCell
                    style={{ width: "600px", borderRight: "1px solid #F8E8EE" }}
                  >
                    {row.contents}
                  </TableCell>
                  <TableCell
                    style={{ width: "60px", borderRight: "1px solid #F8E8EE" }}
                  >
                    {row.author}
                  </TableCell>
                  <TableCell
                    style={{ width: "100px", borderRight: "1px solid #F8E8EE" }}
                  >
                    {row.registDate_community}
                  </TableCell>
                  <TableCell
                    style={{ textAlign: 'center', width: "50px", borderRight: "1px solid #F8E8EE" }}
                  >
                    {row.like_count}
                  </TableCell>
                  <TableCell
                    style={{ textAlign: 'center', width: "50px", borderRight: "1px solid #F8E8EE" }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(row.isbn13);
                        sendDeleteParagraph(row.postNum);
                      }}
                    >
                      <FavoriteIcon style={{ color: likes[row.isbn13] ? "gray" : "#EF9A9A" }} />
                    </IconButton>
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

export default MyLikedParagraph;
