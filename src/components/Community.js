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
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
function createData(id, title, paragraph, writer, date, like) {
    return { id, title, paragraph, writer, date, like };
}

const initialRows = [
    createData(1, "신데렐라", "잊지 말아야 할 것은, 인내와 선의가 항상 보상을 받는다는 것이다.", "김글쓴", "2023-03-21", 10),
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


function Community() {

    const navigate = new useNavigate();

    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0); // Reset to the first page when changing rows per page
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const displayRows = initialRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const [likeStatus, setLikeStatus] = useState({}); // Initialize like status for each row

    // Function to toggle the like status for a specific row
    const toggleLike = (id) => {
        setLikeStatus((prevStatus) => ({
            ...prevStatus,
            [id]: !prevStatus[id],
        }));
    };
    const [searchType, setSearchType] = useState("도서명");
    return (
        <>
            <MainAppBar />
            <Box sx={{ paddingTop: "48px" }}>
                <TabBar />
                <div style={{ display: 'flex', maxWidth: '70%', marginTop: '70px', margin: '70px auto 0', justifyContent: 'space-between' }}>
                    <div style={{ marginTop: '20px', fontSize: '22px', fontWeight: 'bold' }}>
                        커뮤니티
                    </div>
                    <StyledSelect
                        sx={{ marginTop: "20px", marginLeft: "535px", height: "35px", fontSize: "13px" }}
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        defaultValue={"도서명"}
                    >
                        <MenuItem value={"도서명"} style={{ fontSize: "13px" }}>도서명</MenuItem>
                        <MenuItem value={"작가명"} style={{ fontSize: "13px" }}>작가명</MenuItem>
                    </StyledSelect>
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
                    style={{ display: "flex", maxWidth: "70%", margin: "10px auto" }}
                >
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead style={{ backgroundColor: "#F8E8EE" }}>
                            <TableRow>
                                <TableCell >No</TableCell>
                                <TableCell>도서명</TableCell>
                                <TableCell>인상깊은 구절</TableCell>
                                <TableCell>작가</TableCell>
                                <TableCell>등록일</TableCell>
                                <TableCell>좋아요</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ backgroundColor: "#F9F5F6" }}>
                            {displayRows.map((row) => (
                                <TableRow
                                    key={row.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                // onClick={() => navigate(`/CommunityDetail/${row.id}`, { state: row })}
                                >
                                    <TableCell component="th" scope="row" style={{ width: '10px', borderRight: '1px solid #F8E8EE', textAlign: 'center' }}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ width: '180px', borderRight: '1px solid #F8E8EE' }}>
                                        {row.title}
                                    </TableCell>
                                    <TableCell style={{ width: '600px', borderRight: '1px solid #F8E8EE' }}>{row.paragraph}</TableCell>
                                    <TableCell style={{ width: '50px', borderRight: '1px solid #F8E8EE', textAlign: 'center' }}>{row.writer}</TableCell>
                                    <TableCell style={{ width: '80px', textAlign: 'center' }}>{row.date}</TableCell>
                                    <TableCell style={{ width: '45px', textAlign: 'center' }} >
                                        {likeStatus[row.id] ? (
                                            <FavoriteIcon style={{ color: '#EF9A9A' }} onClick={() => toggleLike(row.id)} />
                                        ) : (
                                            <FavoriteBorderIcon style={{ color: '#EF9A9A' }} onClick={() => toggleLike(row.id)} />
                                        )}
                                        <div style={{ marginTop: '-5px' }}>{row.like}</div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', maxWidth: '70%', margin: '0 auto' }}>
                    <Pagination
                        component="div"
                        count={Math.ceil(initialRows.length / rowsPerPage)} // Calculate the number of pages based on rows
                        page={page}
                        onChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{ margin: "0 auto" }}
                        color="primary"
                    />
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="contained"
                            style={{ width: '100px', height: '30px', backgroundColor: '#EF9A9A', color: '#ffffff' }}
                            onClick={() => { navigate('/CommunityRegist') }}

                        >등록하기</Button>
                    </Stack>
                </div>
            </Box>
        </>
    );
}

export default Community;