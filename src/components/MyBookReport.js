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
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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

const csrftoken = Cookies.get('csrftoken');

function MyBookReport() {

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

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/bookReport/bookReportReadMy?page=${page}`, {
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

    const sendDeleteBook = (reportNum) => {
        if (window.confirm("삭제하시겠습니까?")) {

            axios.delete("http://127.0.0.1:8000/bookReport/bookReportDelete", {

                params: {
                    reportNum: reportNum,
                }
            })
                .then((response) => {
                    console.log(response);
                    alert("삭제되었습니다.");
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert("취소합니다.");
        }
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
                        나의 독후감
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
                                <TableCell style={{ width: '75px' }}>등록일</TableCell>
                                <TableCell style={{ width: '10px' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: "#F9F5F6" }}>
                            {getPageData()?.map((data, index) => (
                                <TableRow
                                    key={data.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>
                                        {(page - 1) * itemsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row" onClick={() => navigate(`/BookReportDetail/${data.isbn13}`, { state: data })}>
                                        {truncate(data.reportTitle, 20)}
                                    </TableCell>
                                    <TableCell onClick={() => navigate(`/BookReportDetail/${data.reportNum}`, { state: data })}>{truncate(data.title, 18)}</TableCell>
                                    <TableCell onClick={() => navigate(`/BookReportDetail/${data.reportNum}`, { state: data })}>{truncate(data.author, 6)}</TableCell>
                                    <TableCell onClick={() => navigate(`/BookReportDetail/${data.reportNum}`, { state: data })}>{truncate(data.publisher, 6)}</TableCell>
                                    <TableCell onClick={() => navigate(`/BookReportDetail/${data.reportNum}`, { state: data })}>{data.registDate_report.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <DeleteIcon
                                            style={{ color: "#FF9999" }}
                                            onClick={() => sendDeleteBook(data.reportNum)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: "flex" }}>
                    {bookReportList && (
                        <Pagination
                            count={totalPages}
                            color="primary"
                            style={{
                                margin: '40px 0',
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}
                            onChange={handleChangePage}
                        />
                    )}
                </div>
            </Box>
        </>
    );
}

export default MyBookReport;