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


function BookReportDetail() {
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
                <div style={{ display: 'flex', margin: '10px auto', padding: '20px', backgroundColor: '#F9F5F6', width: '55%', height: '400px', borderRadius: '20px' }}>
                    <div style={{ marginLeft: '10px', width: '98%' }}>
                        <div style={{ display: 'flex', margin: '2px', padding: '0px 10px 10px', justifyContent: 'space-between', borderBottom: '1px solid #FDCEDF' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{location.state.title}</div>
                            <div>{location.state.writer} | {location.state.date}</div>
                        </div>
                        <div style={{ height: '365px', padding: '10px', fontSize: '15px' }}>
                            신데렐라는 강렬한 동화로, 가난하고 불운한 소녀가 결국 행복한 결말을 맞이하는 이야기입니다. 이 독후감에서는 주요 테마와 교훈에 대해 다루겠습니다.
                            이 동화는 희망, 인내, 선의로운 행동, 가족의 중요성 등 다양한 가치를 다룹니다. 신데렐라는 자신의 어려운 상황에서도 희망을 잃지 않고, 강인한 인내와 선의를 지니며 어려움을 극복합니다. 그녀는 결코 나쁜 마음을 품지 않고, 나쁜 사람들에게도 도움의 손길을 내밀어 보여줍니다.
                            또한 가족의 중요성도 강조됩니다. 신데렐라는 자기 엄마와 아빠를 잃고 나서도 계속해서 자신을 사랑해주는 동생들과 함께 살아가며 가족의 가치를 강조합니다.
                            신데렐라는 결국 왕자와의 사랑을 통해 행복한 결말을 맞이합니다. 이것은 선의와 믿음이 결국 보상받는다는 교훈을 전합니다. 또한 신데렐라의 변화된 운명은 언제나 희망을 가져야 한다는 메시지를 전달합니다.
                            이 동화는 어린이들에게 희망과 선의, 가족의 중요성을 가르쳐주며, 어른들에게도 인내와 믿음의 힘을 상기시키는 좋은 이야기입니다. 신데렐라의 이야기는 시간이 흘러도 그 가치를 잃지 않고 계속해서 우리에게 교훈을 전달합니다.
                        </div>
                        <div style={{ display: 'flex', margin: '5px 5px 0 790px' }}>
                            <div >
                                {isSelectedLike ?
                                    <FavoriteIcon style={{ fontSize: '30px' }} onClick={selectLike}></FavoriteIcon>
                                    : <FavoriteBorderIcon style={{ fontSize: '30px' }} onClick={selectLike}></FavoriteBorderIcon>}
                                <div style={{ textAlign: 'center', marginTop: '-10px', fontSize: '13px' }}>10</div>
                            </div>
                            <ShareIcon style={{ fontSize: '35px' }}></ShareIcon>
                        </div>
                    </div>
                </div>
            </Box >
        </>
    )

}

export default BookReportDetail;