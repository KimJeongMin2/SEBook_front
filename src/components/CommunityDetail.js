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
    width: "42ch",
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


function CommunityDetail() {
    const location = useLocation();
    const navigate = useNavigate();

    const [isSelectedLike, setIsSelectedLike] = useState(false);

    const selectLike = () => {
        setIsSelectedLike(!isSelectedLike)
    }

    return (
        <>
            <MainAppBar />
            <Box sx={{ paddingTop: "48px" }}>
                <TabBar />
                <div style={{ display: 'flex', marginTop: '70px' }}>

                    <Search style={{ marginTop: '20px', marginRight: '325px' }}>
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
                <div style={{ display: 'flex', margin: '20px auto', padding: '15px 20px', border: '1px solid #F8E8EE', backgroundColor: '#F9F5F6', width: '55%', height: '80px', borderRadius: '20px' }}>
                    <div style={{ marginLeft: '10px', width: '98%' }}>
                        <div style={{ display: 'flex', margin: '2px', padding: '0px 10px 10px', justifyContent: 'space-between', borderBottom: '1px solid #FDCEDF' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{location.state.title}</div>
                            <div>{location.state.writer} | {location.state.date}</div>
                        </div>
                        <div style={{ display: 'flex', margin: '2px', padding: '10px', fontSize: '20px' }}>
                            {location.state.paragraph}
                        </div>
                    </div>
                </div>
                {/* <div style={{ display: 'flex', margin: '20px 330px' }}>
                    <input style={{ width: '800px', height: '35px', border: '1px solid #cccccc' }}></input>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="contained"
                            style={{ marginLeft: '5px', width: '80px', height: '37px', backgroundColor: '#EF9A9A', color: '#ffffff' }}
                        >등록</Button>
                    </Stack>
                </div>
                <div style={{ margin: '10px 330px' }}>
                    <div style={{
                        margin: '10px 0', padding: '0 10px', width: '857px', height: '45px', backgroundColor: '#F9F5F6', border: '1px solid #F8E8EE', borderRadius: '10px', lineHeight: '45px'
                    }}>
                        마음을 움직이는 힘은 글에 있음을 깨닫게 해주는 글귀입니다.
                    </div>
                    <div style={{ margin: '10px 0', padding: '0 10px', width: '857px', height: '45px', backgroundColor: '#F9F5F6', border: '1px solid #F8E8EE', borderRadius: '10px', lineHeight: '45px' }}>
                        저도 신데렐라 같이 멋진 왕자님을 만나고 싶네요.
                    </div>
                    <div style={{ margin: '10px 0', padding: '0 10px', width: '857px', height: '45px', backgroundColor: '#F9F5F6', border: '1px solid #F8E8EE', borderRadius: '10px', lineHeight: '45px' }}>
                        신데렐라가 왕자를 만나 행복하게 된 것은 아름다운 외모 뿐은 아닌 것 같아요.
                    </div>
                    <div style={{ margin: '10px 0', padding: '0 10px', width: '857px', height: '45px', backgroundColor: '#F9F5F6', border: '1px solid #F8E8EE', borderRadius: '10px', lineHeight: '45px' }}>
                        어릴 때 즐겨봤던 신데렐라, 성인이 되고 나서도 다시 찾아보게 되네요.
                    </div>
                    <div style={{ margin: '10px 0', padding: '0 10px', width: '857px', height: '45px', backgroundColor: '#F9F5F6', border: '1px solid #F8E8EE', borderRadius: '10px', lineHeight: '45px' }}>
                        어디에나 계모나 못된 언니들이 존재하는 것처럼 모두들 아름다운 신데렐라가 될 수 있길 바라요.
                    </div>
                </div> */}
            </Box >
        </>
    )

}

export default CommunityDetail;