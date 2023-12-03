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
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
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
import Cookies from 'js-cookie';

function preventDefault(event) {
  event.preventDefault();
}
const csrftoken = Cookies.get('csrftoken');

export default function MyPage() {
  const navigate = useNavigate();

  const [myInfo, setMyInfo] = useState();
  const [readLikeBook, setReadLikeBook] = useState([]);
  const [myBookReport, setMyBookReport] = useState([]);
  const [myLikedBookReport, setMyLikedBookReport] = useState([]);
  const [readMyParagraph, setReadMyParagraph] = useState([]);
  const [likeParagraph, setLikeParagraph] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/user/memberSearch", {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        setMyInfo(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // useEffect(() => {
  //   if (myInfo?.name === undefined) {
  //     navigate("/signin"); // signin 페이지의 경로에 맞게 수정
  //   }
  // }, [myInfo, navigate]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/book/likeBookListRead", {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data.likeBookList);
        setReadLikeBook(response.data.likeBookList);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/bookReport/bookReportReadMy?page=${page}`, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data.results);
        setMyBookReport(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  }, [page]);


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/bookReport/bookReportReadLike?page=${page}`, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log("공감한 도서 : " + response.data.results[0]);
        setMyLikedBookReport(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  }, [page]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/bookReport/bookReportReadMy?page=${page}`, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data.results);
        setMyBookReport(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  }, [page]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/community/paragraphReadLike?page=${page}`, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data.results);
        setLikeParagraph(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  }, [page]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/community/paragraphReadMy?page=${page}`, {
        headers: {
          'X-CSRFToken': csrftoken
        },
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data.results);
        setReadMyParagraph(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error(error));
  }, [page]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

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
                  style={{ width: "360px", height: "200px" }}
                  sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell style={{ width: "110px" }}>
                        BookReport Title
                      </TableCell>
                      <TableCell>author</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myBookReport.slice(-5).map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ fontSize: "13px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.reportTitle, 8)}
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {truncate(row.author, 9)}
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
                  style={{ width: "360px", height: "200px", marginTop: '0px' }}
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
                    {readMyParagraph
                      .slice(-5)
                      .reverse()
                      .map((row, index) => (
                        <TableRow key={row.isbn13}>
                          <TableCell style={{ fontSize: "13px" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {truncate(row.title, 8)}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {truncate(row.author, 10)}
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
                  <IconButton style={{ margin: '0 0 0 10px' }}>
                    <Avatar style={{ width: '100px', height: '100px' }} alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/1361/1361876.png" />
                  </IconButton>
                  <div style={{ margin: "50px 0" }}>
                    <div style={{ margin: "10px" }}>이름 : {myInfo?.name}</div>
                    <div style={{ margin: "10px" }}>아이디 : {myInfo?.userId}</div>
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
                      marginLeft: "5px",
                    }}
                  ></ThumbUpAltIcon>
                  공감한 독후감
                  <AddIcon
                    style={{
                      marginLeft: "205px",
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
                  style={{ width: "350px", height: "200px" }}
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#F9F5F6",
                    marginLeft: "3px",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                      <TableCell style={{ fontSize: "13px", width: "110px" }}>
                        BookReport Title
                      </TableCell>
                      <TableCell style={{ fontSize: "13px" }}>author</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myLikedBookReport.slice(-5)
                      .reverse().map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell style={{ fontSize: "13px" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {truncate(row.reportTitle, 8)}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {truncate(row.author, 9)}
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
                      marginLeft: '3px'
                    }}
                  ></MoodIcon>
                  공감한 도서
                  <AddIcon
                    style={{
                      marginLeft: "220px",
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
                  style={{ width: "360px", height: "200px" }}
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
                    {readLikeBook
                      .slice(-5)
                      .reverse()
                      .map((row, index) => (
                        <TableRow key={row.isbn13}>
                          <TableCell style={{ fontSize: "13px" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {truncate(row.title, 8)}
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
                  공감한 구절
                  <AddIcon
                    style={{
                      marginLeft: "210px",
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
                  style={{ width: "360px", height: "200px" }}
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
                    {likeParagraph.slice(-5)
                      .reverse().map((row, index) => (
                        <TableRow key={row.isbn13}>
                          <TableCell style={{ fontSize: "13px" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell style={{ fontSize: "13px" }}>
                            {truncate(row.title, 8)}
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