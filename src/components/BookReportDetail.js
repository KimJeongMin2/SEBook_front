import React, { useState } from "react";
import { AppBar, Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, InputBase, Pagination, Toolbar, Typography } from "@mui/material";
import TabBar from "./TabBar";
import MainAppBar from "./MainAppBar";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation } from "react-router";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import axios from "axios";
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

function BookReportDetail({ PROXY }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [isSelectedLike, setIsSelectedLike] = useState(false);

    const selectLike = () => {
        setIsSelectedLike(!isSelectedLike)
    }

    const sendDeleteBook = (reportNum) => {
        if (window.confirm("삭제하시겠습니까?")) {

            axios.delete("http://192.168.0.7:8000/bookReport/bookReportDelete", {
                params: {
                    reportNum: reportNum,
                }
            })
                .then((response) => {
                    console.log(response);
                    alert("삭제되었습니다.");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert("취소합니다.");
        }
    }

    const sendDeleteLikeBookReport = (reportNum) => {
        axios.delete("http://172.30.84.171:8000/bookReport/bookReportLike", {
            params: {
                reportNum: reportNum,
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

    const sendLikeBookReport = (reportNum) => {
        axios.post("http://172.30.84.171:8000/bookReport/bookReportLike", {
            reportNum: reportNum,
            userNum: 1
        })
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <MainAppBar />
            <Box sx={{ paddingTop: "48px" }}>
                <TabBar />
                <div style={{ display: 'flex', marginTop: '70px' }}>

                    <Search style={{ marginTop: '20px', marginRight: '320px' }}>
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
                <div style={{ display: 'flex', margin: '10px auto', padding: '20px', backgroundColor: '#F9F5F6', width: '55%', height: '380px', borderRadius: '20px' }}>
                    <div style={{ marginLeft: '10px', width: '98%' }}>
                        <div style={{ display: 'flex', margin: '2px', padding: '0px 10px 10px', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{location.state.reportTitle}</div>
                            <div>{location.state.username} | {`${location.state.registDate_report.split('T')[0]} ${location.state.registDate_report.split('T')[1]}`}</div>
                        </div>
                        <div style={{ display: 'flex', margin: '2px', padding: '0px 10px 10px', justifyContent: 'space-between', borderBottom: '1px solid #FDCEDF' }}>
                            <div style={{ fontSize: '14px' }}>{location.state.title}</div>
                            <div style={{ fontSize: '14px' }}>{location.state.author} | {location.state.publisher}</div>
                        </div>
                        <div style={{ height: '340px', padding: '10px', fontSize: '15px' }}>
                            {location.state.reportContents}
                        </div>
                        <div style={{ display: 'flex', margin: '10px 5px 0 640px' }}>
                            {location.state && location.state.isUserWriteReportsLiked &&
                                <>
                                    <Button
                                        variant="contained"
                                        style={{ width: '100px', height: '30px', backgroundColor: '#EF9A9A', color: '#ffffff', marginRight: '5px' }}
                                        onClick={() => navigate(`/BookReportUpdate`, { state: location.state })}
                                    >
                                        수정
                                    </Button>

                                    <Button
                                        variant="contained"
                                        style={{ width: '100px', height: '30px', backgroundColor: '#EF9A9A', color: '#ffffff', marginRight: '5px' }}
                                        onClick={() => sendDeleteBook(location.state.reportNum)}
                                    >
                                        삭제
                                    </Button>
                                </>
                            }
                            <div>
                                {isSelectedLike || location.state.isUserLikeReportsLiked ?
                                    <FavoriteIcon style={{ fontSize: '30px', color: '#EF9A9A' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            selectLike();
                                            sendDeleteLikeBookReport(location.state.reportNum);
                                        }}
                                    ></FavoriteIcon>
                                    : <FavoriteBorderIcon
                                        style={{ fontSize: '30px', color: '#EF9A9A' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            selectLike();
                                            sendLikeBookReport(location.state.reportNum);
                                        }}>
                                    </FavoriteBorderIcon>}
                                <div style={{ textAlign: 'center', marginTop: '-10px', fontSize: '13px' }}>{location.state.like_count}</div>
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