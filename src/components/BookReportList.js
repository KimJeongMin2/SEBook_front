import React, { useState } from "react";
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
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";

function createData(id, title, bookName, author, publisher, writer, date) {
    return { id, title, bookName, author, publisher, writer, date };
}

const initialRows = [
    createData(1, "Frozen yoghurt를 읽고1", "Frozen yoghurt", "김작가", "김나라출판", "정채연", "2023-03-21"),
    createData(2, "Frozen yoghurt를 읽고2", "Frozen yoghurt", "김작가", "김나라출판", "정채연", "2023-03-21"),
    createData(3, "Frozen yoghurt를 읽고3", "Frozen yoghurt", "김작가", "김나라출판", "정채연", "2023-03-21"),
    createData(4, "Frozen yoghurt를 읽고4", "Frozen yoghurt", "김작가", "김나라출판", "정채연", "2023-03-21"),
    createData(5, "Frozen yoghurt를 읽고5", "Frozen yoghurt", "김작가", "김나라출판", "정채연", "2023-03-21"),
    createData(6, "Frozen yoghurt를 읽고나서", "Frozen yoghurt", "김작가", "김나라출판", "정채연", "2023-03-21"),
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

function BookReportList() {


    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(6);
const navigate = new useNavigate();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0); // Reset to the first page when changing rows per page
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const displayRows = initialRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);


    return (
        <>
            <MainAppBar />
            <Box sx={{ paddingTop: "48px" }}>
                <TabBar />
                <div style={{ display: 'flex', margin: '70px auto 0', maxWidth: '77%', marginTop: '70px', justifyContent: 'space-between' }}>
                    <div style={{ marginTop: '20px', fontSize: '22px', fontWeight: 'bold' }}>
                        독후감
                    </div>
                    <Search style={{ marginTop: "20px" }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            style={{ fontSize: '13px' }}
                            placeholder="도서명을 입력하세요."
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </div>

                <TableContainer
                    component={Paper}
                    style={{ display: "flex", maxWidth: "77%", margin: "20px 176px" }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{ backgroundColor: "#F8E8EE" }}>
                            <TableRow>
                                <TableCell style={{ width: '10px' }}>No</TableCell>
                                <TableCell>title</TableCell>
                                <TableCell>book title</TableCell>
                                <TableCell style={{ width: '50px' }}>author</TableCell>
                                <TableCell style={{ width: '100px' }}>publisher</TableCell>
                                <TableCell style={{ width: '50px' }}>writer</TableCell>
                                <TableCell style={{ width: '90px' }}>date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: "#F9F5F6" }}>
                            {displayRows.map((row) => (
                                <TableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => navigate(`/BookReportDetail/${row.id}`, { state: row })}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell>{row.bookName}</TableCell>
                                    <TableCell>{row.author}</TableCell>
                                    <TableCell>{row.publisher}</TableCell>
                                    <TableCell>{row.writer}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', margin: '0 auto', maxWidth: "77%", justifyContent: 'space-between' }}>
                    <Pagination
                        component="div"
                        count={Math.ceil(initialRows.length / rowsPerPage)} // Calculate the number of pages based on rows
                        page={page}
                        onChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{ margin: '0 auto' }}
                        color="primary"
                    />
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="contained"
                            style={{ width: '100px', height: '30px', backgroundColor: '#EF9A9A', color: '#ffffff' }}
                            onClick={() => { navigate('/BookReportRegist') }}

                        >등록하기</Button>
                    </Stack>
                </div>
            </Box >
        </>
    );
}

export default BookReportList;
