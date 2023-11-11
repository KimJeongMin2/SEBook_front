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
import Button from '@mui/material/Button';

import { useNavigate, useLocation } from "react-router-dom";

function createData(id, title, bookName, author, publisher, writer, date, like) {
    return { id, title, bookName, author, publisher, writer, date, like };
}

const initialRows = [
    createData(1, "Frozen yoghurt를 읽고1", "Frozen yoghurt", "김작가", "김나라출판", "김정민", "2023-03-21", 12),
    createData(2, "Frozen yoghurt를 읽고2", "Frozen yoghurt", "이작가", "김나라출판", "신영옥", "2023-05-12", 12),
    createData(3, "Frozen yoghurt를 읽고3", "Frozen yoghurt", "정작가", "김나라출판", "정채연", "2023-08-23", 12),
    createData(4, "Frozen yoghurt를 읽고4", "Frozen yoghurt", "신작가", "김나라출판", "박글쓴", "2023-11-07", 12),
    createData(5, "Frozen yoghurt를 읽고5", "Frozen yoghurt", "박작가", "김나라출판", "최글쓴", "2023-11-21", 12),
    createData(6, "Frozen yoghurt를 읽고나서", "Frozen yoghurt", "최작가", "김나라출판", "이글쓴", "2023-12-24", 12),
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

function MyLikedBookReport() {
    const location = useLocation();
    const navigate = new useNavigate();

    const [bookReportList, setBookReportList] = useState(location.state?.bookReportList || []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const getPageData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return Array.isArray(bookReportList) ? bookReportList.slice(start, end) : [];
    };

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        axios.get("http://192.168.123.158:8000/bookReport/bookReportReadLike", {
            params: {
                userNum: 1
            }
        })
            .then((response) => {
                console.log("공감한 도서 : " + response.data.likeBookReportList[0]);
                setBookReportList(response.data.likeBookReportList);
            })
            .catch((error) => console.error(error));
    }, []);

    const [likes, setLikes] = useState({});

    const toggleLike = (id) => {
        setLikes({
            ...likes,
            [id]: !likes[id],
        });
    };

    const sendDeleteBook = (bookReportNum) => {
        axios.delete("http://192.168.123.158:8000/bookReport/bookReportLike", {
            params: {
                reportNum: bookReportNum,
                userNum: 1
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
                <div style={{ display: 'flex', marginTop: '70px' }}>
                    <div style={{ marginTop: '20px', marginLeft: '230px', fontSize: '22px', fontWeight: 'bold' }}>
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
                                <TableCell style={{ width: '10px' }}>No</TableCell>
                                <TableCell style={{ width: '300px' }}>제목</TableCell>
                                <TableCell style={{ width: '200px' }}>도서명</TableCell>
                                <TableCell style={{ width: '95px' }}>작가</TableCell>
                                <TableCell style={{ width: '100px' }}>출판사</TableCell>
                                <TableCell style={{ width: '100px' }}>글쓴이</TableCell>
                                <TableCell style={{ width: '90px' }}>등록일</TableCell>
                                <TableCell style={{ width: '45px' }}>좋아요</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: "#F9F5F6" }}>
                            {getPageData()?.map((data) => (
                                <TableRow
                                    key={data.book}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => navigate(`/BookReportDetail/${data.id}`, { state: data })}
                                >
                                    <TableCell component="th" scope="row">
                                        {data.reportNum}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {truncate(data.reportTitle, 20)}
                                    </TableCell>
                                    <TableCell>{truncate(data.title, 20)}</TableCell>
                                    <TableCell>{truncate(data.author, 6)}</TableCell>
                                    <TableCell>{truncate(data.publisher, 6)}</TableCell>
                                    <TableCell>{truncate(data.writer, 6)}</TableCell>
                                    <TableCell>{data.registDate_report.split('T')[0]}</TableCell>
                                    <TableCell style={{ width: "50px", textAlign: "center" }}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleLike(data.reportNum);
                                                sendDeleteBook(data.reportNum);
                                            }}
                                        >
                                            <FavoriteIcon style={{ color: likes[data.reportNum] ? "gray" : "#EF9A9A" }} />
                                        </IconButton>
                                        <div style={{ marginTop: "-5px" }}>{data.like_count}</div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex' }}>
                    {bookReportList && <Pagination
                        count={Math.ceil(bookReportList.length / itemsPerPage)}
                        color="primary"
                        style={{
                            margin: '40px 0',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}
                        onChange={handleChangePage}
                    />}
                </div>
            </Box>
        </>
    );
}

export default MyLikedBookReport;