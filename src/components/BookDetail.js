import React, { useState } from "react";
import { AppBar, Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, InputBase, Pagination, Toolbar, Typography } from "@mui/material";
import TabBar from "./TabBar";
import MainAppBar from "./MainAppBar";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation } from "react-router";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const Search = styled("div", {
    shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
    position: "relative",
    borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
    backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
    marginRight: 0,
    marginLeft: "auto", // 오른쪽 정렬 적용
    marginTop: "1ch",
    marginRight: "18ch",
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

function BookDetail() {

    const location = useLocation();
    const navigate = useNavigate();

    const [isSelectedLike, setIsSelectedLike] = useState(false);

    const selectLike = () => {
        setIsSelectedLike(!isSelectedLike)
        console.log(location);
    }

    return (
        <>
            <MainAppBar />
            <Box sx={{ paddingTop: "48px" }}>
                <TabBar />
                <div style={{ display: 'flex', marginTop: '70px' }}>

                    <Search style={{ marginTop: '20px', marginRight: '255px' }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            style={{ fontSize: '13px' }}
                            placeholder="도서명 또는 작가명을 입력하세요."
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </div>
                <div style={{ display: 'flex', margin: '10px auto', padding: '20px', backgroundColor: '#F9F5F6', width: '62%', height: '350px', }}>
                    <div style={{ width: '250px', padding: '10px', height: '330px', backgroundColor: '#F8E8EE' }}>
                        <motion.img src={location.state.cover} style={{ width: '250px', height: '330px' }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }} />
                    </div>
                    <div style={{ margin: '0 0px 0 20px', width: '620px' }}>
                        <div style={{ display: 'flex', margin: '5px', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '22px' }}>{location.state.title}</div>
                            <div>카테고리</div>
                        </div>
                        <div style={{ display: 'flex', margin: '5px', justifyContent: 'space-between' }}>

                            <div>국내도서</div>
                        </div>
                        <div style={{ display: 'flex', margin: '5px', justifyContent: 'space-between' }}>
                            <div>{location.state.author} | 출판사 | 2023-01-01</div>
                            <div>정가 : 12,000원</div>
                        </div>
                        <div style={{ marginTop: '20px', padding: '10px', width: '96%', height: '180px', backgroundColor: '#F8E8EE' }}>
                            도서 설명
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ margin: '20px 10px 0 0', fontSize: '12px', color: '#cccccc' }}>도서 DB 제공 : 알라딘 인터넷 서점(www.aladin.co.kr)</div>
                            <Stack spacing={0} direction="row">
                                <Button
                                    variant="contained"
                                    style={{ marginTop: '10px', marginRight: '5px', width: '100px', height: '30px', backgroundColor: '#EF9A9A', color: '#ffffff' }}
                                    onClick={() => { navigate('/') }}

                                >구매하기</Button>
                                <Button
                                    variant="contained"
                                    style={{ marginTop: '10px', marginRight: '5px', width: '120px', height: '30px', backgroundColor: '#EF9A9A', color: '#ffffff' }}
                                    onClick={() => { navigate('/BookReportRegist') }}

                                >독후감 작성</Button>
                            </Stack>
                            <div style={{ display: 'flex', margin: '5px 5px 0 0px' }}>
                                <div >
                                    {isSelectedLike ?
                                        <FavoriteIcon style={{ fontSize: '30px', color: '#EF9A9A' }} onClick={selectLike}></FavoriteIcon>
                                        : <FavoriteBorderIcon style={{ fontSize: '30px', color: '#EF9A9A' }} onClick={selectLike}></FavoriteBorderIcon>}
                                    <div style={{ textAlign: 'center', marginTop: '-10px', fontSize: '13px' }}>10</div>
                                </div>
                                <ShareIcon style={{ fontSize: '35px' }}></ShareIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default BookDetail;