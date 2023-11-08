import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import axios from "axios";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MoodIcon from "@mui/icons-material/Mood";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// Generate Order Data
function createData(id, title) {
  return { id, title };
}

function createBookLikeListDate(id, title, author) {
  return { id, title, author };
}

const rows = [
  createData(1, "어린왕자"),
  createData(2, "백설공주"),
  createData(3, "신데렐라"),
  createData(4, "인어공주"),
  createData(5, "앤서니 브라운 코끼리"),
  //   createData(
  //     1,
  //     '16 Mar, 2019',
  //     'Paul McCartney',
  //     'London, UK',
  //     'VISA ⠀•••• 2574',
  //     866.99,
  //   ),
  //   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  //   createData(
  //     3,
  //     '16 Mar, 2019',
  //     'Michael Jackson',
  //     'Gary, IN',
  //     'AMEX ⠀•••• 2000',
  //     654.39,
  //   ),
  //   createData(
  //     4,
  //     '15 Mar, 2019',
  //     'Bruce Springsteen',
  //     'Long Branch, NJ',
  //     'VISA ⠀•••• 5919',
  //     212.79,
  //   ),
];

const bookLikeList = [
  createBookLikeListDate(1, "어린왕자", "생텍쥐베리"),
  createBookLikeListDate(2, "백설공주", "야코프 그림"),
  createBookLikeListDate(3, "신데렐라", "샤를 페르"),
  createBookLikeListDate(4, "엔서니 브라운 코끼리", "엔서니 브라운"),
  createBookLikeListDate(5, "1%를 읽는 힘", "메르"),
];
const data = [
  createBookLikeListDate(1, "어린왕자", "김정민"),
  createBookLikeListDate(2, "백설공주", "김정민"),
  createBookLikeListDate(3, "신데렐라", "김정민"),
  createBookLikeListDate(4, "엔서니 브라운 코끼리", "김정민"),
  createBookLikeListDate(5, "1%를 읽는 힘", "김정민"),
];
function preventDefault(event) {
  event.preventDefault();
}

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};


export default function MyPage() {
  const navigate = useNavigate();

  const [readLikeBook, setReadLikeBook] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.8:8000/book/likeBookListRead", {
        params: {
          userNum: 1,
        },
      })
      .then((response) => {
        console.log(response.data.likeBookList);
        setReadLikeBook(response.data.likeBookList);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <React.Fragment>
      <MainAppBar />
      <div>
        <Box sx={{ paddingTop: "48px" }}>
          <TabBar />
        </Box>
        <div
          style={{
            margin: "80px 0 -35px 200px",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          마이페이지
        </div>
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <Box
            sx={{
              mt: "3rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography>
                  <BookIcon
                    style={{
                      color: "#F2BED1",
                      marginBottom: "-7px",
                      marginRight: "2px",
                    }}
                  ></BookIcon>
                  나의 독후감
                  <AddIcon
                    style={{
                      marginLeft: "220px",
                      color: "#F2BED1",
                      marginBottom: "-5px",
                    }}
                    onClick={() => {
                      navigate("/MyBookReport");
                    }}
                  ></AddIcon>
                </Typography>

                <Link color="primary" href="#" onClick={preventDefault}></Link>
                <Table
                  size="small"
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#F9F5F6",
                    width: "350px",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>BookReport Title</TableCell>
                      <TableCell>author</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookLikeList.slice(0, 5).map((row) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.id}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.title, 10)}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.author, 10)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>
                  <VolunteerActivismIcon
                    style={{
                      color: "#F2BED1",
                      marginBottom: "-5px",
                      marginRight: "2px",
                    }}
                  ></VolunteerActivismIcon>
                  나의 인상 깊은 구절
                  <AddIcon
                    style={{
                      marginLeft: "165px",
                      color: "#F2BED1",
                      marginBottom: "-5px",
                    }}
                    onClick={() => {
                      navigate("/MyParagraph");
                    }}
                  ></AddIcon>
                </Typography>
                <Link color="primary" href="#" onClick={preventDefault}></Link>
                <Table
                  size="small"
                  sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        Paragraph
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.id}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.title, 15)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box>
                <Typography>
                  <PermIdentityIcon
                    style={{
                      color: "#F2BED1",
                      marginBottom: "-5px",
                      marginRight: "2px",
                    }}
                  ></PermIdentityIcon>
                  내정보
                </Typography>
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    marginTop: "10px",
                    width: "330px",
                    height: "175px",
                    backgroundColor: "#F9F5F6",
                  }}
                >
                  <AssignmentIndIcon
                    style={{ margin: "auto 0", fontSize: "150px" }}
                  ></AssignmentIndIcon>
                  <div style={{ margin: "30px 0" }}>
                    <div style={{ margin: "10px" }}>이름 : 홍길동</div>
                    <div style={{ margin: "10px" }}>닉네임 : 동길홍</div>
                    <div style={{ margin: "10px" }}>아이디 : abc1234</div>
                  </div>
                </div>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                mt: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>
                  <ThumbUpAltIcon
                    style={{
                      color: "#F2BED1",
                      marginBottom: "-6px",
                      marginRight: "2px",
                    }}
                  ></ThumbUpAltIcon>
                  좋아요 누른 독후감
                  <AddIcon
                    style={{
                      marginLeft: "165px",
                      color: "#F2BED1",
                      marginBottom: "-5px",
                    }}
                    onClick={() => {
                      navigate("/MyLikedBookReport");
                    }}
                  ></AddIcon>
                </Typography>
                <Link color="primary" href="#" onClick={preventDefault}></Link>
                <Table
                  size="small"
                  style={{ width: '350px', height: '200px' }}
                  sx={{ marginTop: "10px", backgroundColor: "#F9F5F6", marginLeft: '8px' }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                      <TableCell style={{ fontSize: "13px" }}>
                        BookReport Title
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>author</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookLikeList.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.id}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.title, 10)}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.author, 10)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>
                  <MoodIcon
                    style={{
                      color: "#F2BED1",
                      marginBottom: "-7px",
                      marginRight: "2px",

                    }}
                  ></MoodIcon>
                  좋아요 누른 도서
                  <AddIcon
                    style={{
                      marginLeft: "178px",
                      color: "#F2BED1",
                      mt: "2rem",
                      marginBottom: "-5px",
                    }}
                    onClick={() => {
                      navigate("/MyLikedBookList");
                    }}
                  ></AddIcon>
                  <Link
                    color="primary"
                    href="#"
                    onClick={preventDefault}
                  ></Link>
                </Typography>
                <Table
                  size="small"
                  style={{ width: '360px', height: '200px' }}
                  sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                      <TableCell style={{ fontSize: "13px" }}>Title</TableCell>
                      <TableCell style={{ fontSize: "13px" }}>author</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {readLikeBook.slice(-5).reverse().map((row, index) => (
                      <TableRow key={row.isbn13}>
                        <TableCell style={{ fontSize: "13px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.title, 10)}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.author, 10)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>
                  <FavoriteIcon
                    style={{
                      color: "#F2BED1",
                      marginBottom: "-6px",
                      marginRight: "2px",
                    }}
                  ></FavoriteIcon>
                  좋아요 누른 구절
                  <AddIcon
                    style={{
                      marginLeft: "178px",
                      color: "#F2BED1",
                      marginBottom: "-5px",
                    }}
                    onClick={() => {
                      navigate("/MyLikedParagraph");
                    }}
                  ></AddIcon>
                  <Link
                    color="primary"
                    href="#"
                    onClick={preventDefault}
                  ></Link>
                </Typography>
                <Table
                  size="small"
                  sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                      <TableCell style={{ fontSize: "13px" }}>Title</TableCell>
                      <TableCell style={{ fontSize: "13px" }}>author</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookLikeList.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ fontSize: "13px" }}>
                          {row.id}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.title, 10)}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.author, 10)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </React.Fragment>
  );
}
