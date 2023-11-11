import React, { useState } from "react";
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

import ImportContactsIcon from "@mui/icons-material/ImportContacts";

import { TextField } from "@mui/material";
import axios from "axios";

function CommunityRegist() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [book, setBook] = useState(location.state?.book || "");
  const [author, setAuthor] = useState(location.state?.author || "");
  const [writer, setWriter] = useState();
  const [publisher, setPublisher] = useState(location.state?.publisher || "");
  const [content, setContent] = useState();

  const submit = async () => {
    const paragraph = {
      book: book,
      author: author,
      contents: content,
      userNum_community: writer,
      isbn13_community: location.state.isbn13,
    };

    try {
      const res = await axios.post(
        "http://121.183.121.119:8000/community/paragraphCreate",
        paragraph
      );

      if (res.status === 200) {
        alert("인상 깊은 구절이 성공적으로 등록 되었습니다.");
        navigate("/Community  ");
      }
    } catch (error) {
      console.error(error);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };


  const handleSubmit = () => {
    if (book && author && writer && content) {
      submit();
    } else {
      alert("모든 값을 입력하시고 등록 버튼을 눌러주세요.");
    }
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
            height: "320px",
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
              인상 깊은 구절
            </div>
          </div>
          <div style={{ margin: "20px 0" }}>
            <div style={{ display: " flex" }}>
              <TextField
                id="book"
                label="도서명"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={book}
                onChange={e => setBook(e.target.value)}
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
                id="author"
                label="작가명"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={author}
                onChange={e => setAuthor(e.target.value)}
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
              rows={1}
              value={writer}
              onChange={e => setWriter(e.target.value)}
              sx={{ fontSize: "10px", marginBottom: "10px" }}
              InputProps={{
                style: {
                  height: "40px",
                  fontSize: "14px",
                },
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
              onChange={e => setContent(e.target.value)}
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
              variant="contained"
              onClick={handleSubmit}
              style={{
                marginTop: "10px",
                width: "100px",
                height: "30px",
                backgroundColor: "#EF9A9A",
                color: "#ffffff",
              }}
            >
              등록
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
}

export default CommunityRegist;
