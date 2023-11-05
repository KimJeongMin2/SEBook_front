import React, { useState } from "react";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import { useLocation } from "react-router-dom";
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

function BookReportRegist() {
  const location = useLocation();
  const [book, setBook] = useState(location.state?.book || "");
  const [author, setAuthor] = useState(location.state?.author || "");
  const [publisher, setPublisher] = useState(location.state?.publisher || "");

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
              독후감 작성
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
              sx={{ fontSize: "10px", marginBottom: "10px" }}
              InputProps={{
                style: {
                  height: "40px",
                  fontSize: "14px",
                  lineHeight: "40px",
                },
              }}
            />
            <TextField
              id="bookname"
              label="도서명"
              variant="outlined"
              fullWidth
              multiline
              rows={1}
              value={book}
              disabled={!!location.state}
              sx={{ fontSize: "10px", marginBottom: "10px" }}
              InputProps={{
                style: { height: "40px", fontSize: "14px" },
              }}
            />
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

export default BookReportRegist;
