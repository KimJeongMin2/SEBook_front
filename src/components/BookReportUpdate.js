import React, { useState, useEffect } from "react";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import { useLocation, useNavigate } from "react-router-dom";
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
import MenuItem from "@mui/material/MenuItem";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  position: "relative",
  borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
  backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
  marginLeft: "auto", // 오른쪽 정렬 적용
  marginTop: "1ch",
  marginRight: "27ch",
  width: "35ch",
  minWidth: "45ch", // 최소 가로 길이 조절
  height: "35px",
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
function BookReportUpdate({ PROXY }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState(location.state?.reportTitle || "");
  const [book, setBook] = useState(location.state?.title || "");
  const [author, setAuthor] = useState(location.state?.author || "");
  const [writer, setWriter] = useState(location.state?.username || "");
  const [publisher, setPublisher] = useState(location.state?.publisher || "");
  const [content, setContent] = useState(location.state?.reportContents || '');
  const [searchType, setSearchType] = useState("도서명");
  const [open, setOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isbn13, setIsbn13] = useState(location.state?.isbn13 || "");

  useEffect(() => {
    console.log(location);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const update = async () => {
    const bookReport = {
      userNum_report: writer,
      reportTitle: title,
      isbn13_report: isbn13,
      author: author,
      publisher: publisher,
      reportContents: content,
    };

    try {
      const res = await axios.put(
        "http://172.30.127.93:8000/bookReport/bookReportUpdate", {
        reportNum: location.state.reportNum,
        reportContents: content,
        reportTitle: title
      })
      console.log(res.data);
      if (res.status === 200) {
        alert("독후감이 성공적으로 수정 되었습니다.");
        navigate("/BookReportList");
      }
    } catch (error) {
      console.error(error);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleUpdate = () => {
    if (title && book && author && writer && publisher && content) {
      update();
    } else {
      alert("모든 값을 입력하시고 등록 버튼을 눌러주세요.");
    }
  };

  const searchBookByAuthor = () => {
    axios.get(`http://192.168.0.8:8000/book/searchBookByAuthor`, {
      params: {
        author: searchTerm
      }
    })
      .then(response => {
        setSearchResult(response.data);
      })
      .catch(error => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };

  const searchBookByTitle = () => {
    axios
      .get(`http://192.168.0.8:8000/book/searchBookByTitle`, {
        params: {
          title: searchTerm,
        },
      })
      .then((response) => {
        setSearchResult(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert("해당 검색어에 맞는 결과가 없습니다.");
        } else {
          console.log(error);
        }
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (searchType === '작가명') {
        searchBookByAuthor();
      } else if (searchType === '도서명') {
        searchBookByTitle();
      }
    }
  };

  const handleBookClick = (book) => {
    setBook(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
    setIsbn13(book.isbn13);
    handleClose();
    console.log("isbn13 : " + book.isbn13)
  };

  return (
    <div>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
        <div
          style={{
            margin: "90px auto 5px",
            padding: "20px 100px",
            border: "1px solid #cccccc",
            width: "800px",
            height: "400px",
          }}
        >
          <div style={{ display: "flex" }}>
            <ImportContactsIcon
              style={{
                fontSize: "27px",
                color: "#4169E1",
                marginRight: "10px",
              }}
            ></ImportContactsIcon>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              독후감 수정
            </div>
          </div>
          <div style={{ margin: "20px 0" }}>
            <TextField
              id="name"
              label="제목"
              variant="outlined"
              fullWidth
              multiline
              rows={1}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ fontSize: "10px", marginBottom: "10px" }}
              InputProps={{
                style: {
                  height: "40px",
                  fontSize: "14px",
                  lineHeight: "40px",
                },
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                id="bookname"
                label="도서명"
                variant="outlined"
                multiline
                rows={1}
                value={book}
                disabled={!!location.state}
                sx={{ fontSize: "10px", marginBottom: "10px" }}
                style={{ width: "90%" }}
                InputProps={{
                  style: { height: "40px", fontSize: "14px" },
                }}
              />
              <Button
                onClick={handleClickOpen}
                style={{ backgroundColor: "#EF9A9A", color: "#ffffff", marginTop: '-10px', marginLeft: '2px' }}
              >
                도서 검색
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                  style={{ backgroundColor: "#EF9A9A", color: "#ffffff" }}
                >
                  도서 검색
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    원하는 도서를 입력하고 검색 버튼 또는 Enter 키를 눌러주세요.
                  </DialogContentText>
                  <div style={{ display: "flex", alignItems: "center" }}>
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
                      style={{
                        marginTop: "30px",
                        height: "35px",
                        marginLeft: "auto",
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
                  </div>
                  {searchResult.map((book, index) => (
                    <div key={index} style={{ borderBottom: "0.1px solid #EF9A9A", cursor: "pointer" }}
                      onClick={() => handleBookClick(book)}>
                      <p>{book.title} | {book.author}</p>
                    </div>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>취소</Button>
                  <Button onClick={searchBookByTitle}>검색</Button>
                </DialogActions>
              </Dialog>
            </div>
            <div style={{ display: " flex" }}>
              <TextField
                id="author"
                label="작가명"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={author}
                disabled={!!location.state}
                sx={{
                  fontSize: "10px",
                  marginBottom: "10px",
                  marginRight: "5px",
                }}
                InputProps={{
                  style: { height: "40px", fontSize: "14px" },
                }}
              />
              <TextField
                id="publisher"
                label="출판사명"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={publisher}
                disabled={!!location.state}
                sx={{
                  fontSize: "10px",
                  marginBottom: "10px",
                  marginLeft: "5px",
                }}
                InputProps={{
                  style: { height: "40px", fontSize: "14px" },
                }}
              />
            </div>
            <TextField
              id="writer"
              label="작성자"
              variant="outlined"
              fullWidth
              multiline
              value={writer}
              rows={1}
              sx={{ fontSize: "10px", marginBottom: "10px" }}
              InputProps={{
                style: { height: "40px", fontSize: "14px" },
              }}
            />
            <TextField
              id="content"
              label="내용"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ fontSize: "12px", marginBottom: "10px" }}
              InputProps={{
                style: { fontSize: "14px" },
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              style={{
                marginTop: "10px",
                width: "100px",
                height: "30px",
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
              style={{
                marginTop: "10px",
                width: "100px",
                height: "30px",
                backgroundColor: "#EF9A9A",
                color: "#ffffff",
              }}
            >
              수정
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default BookReportUpdate;