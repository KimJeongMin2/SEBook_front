import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Cookies from 'js-cookie';
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

const csrftoken = Cookies.get('csrftoken');
function BookReportDetail() {
    const location = useLocation();
    const [likes, setLikes] = useState({});
    const navigate = useNavigate();
    const rowData = location.state;
    const [isSelectedLike, setIsSelectedLike] = useState(rowData?.isUserLikeReportsLiked || false);
    const [likeCount, setLikeCount] = useState(rowData?.like_count || 0);

    const selectLike = () => {
        setIsSelectedLike(!isSelectedLike)
    }
    const [myInfo, setMyInfo] = useState();

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/user/memberSearch", {
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                withCredentials: true,
            })
            .then((response) => {
                console.log("myInfo : " + response.data);
                setMyInfo(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    // const sendDeleteBook = (reportNum) => {
    //     if (window.confirm("삭제하시겠습니까?")) {

    //         axios.delete("http://192.168.0.7:8000/bookReport/bookReportDelete", {
    //             params: {
    //                 reportNum: reportNum,
    //             }
    //         })
    //             .then((response) => {
    //                 console.log(response);
    //                 alert("삭제되었습니다.");
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     } else {
    //         alert("취소합니다.");
    //     }
    // }

    const sendDeleteLikeBookReport = (reportNum) => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios.delete("http://127.0.0.1:8000/bookReport/bookReportDelete", {
                params: {
                    reportNum: reportNum,
                },
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                withCredentials: true,
            })
                .then((response) => {
                    console.log(response);
                    setIsSelectedLike(false);
                    setLikeCount(prevCount => prevCount - 1);
                    navigate("/BookReportList");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const sendLikeBookReport = (bookReportNum) => {
        if (!myInfo) {
            toast.warning(
                () => (
                    <div>
                        로그인 후 이용 가능한 서비스입니다. 로그인하러 가시겠습니까?
                        <br />
                        <br />
                        <br />
                        <Button
                            color="inherit"
                            size="small"
                            onClick={() => navigate("/signin")}
                            style={{
                                position: "absolute",
                                right: "10px",
                                bottom: "15px",
                                backgroundColor: "#EF9A9A",
                                color: "white",
                                border: "1px solid #EF9A9A",
                            }}
                        >
                            네
                        </Button>
                    </div>
                ),
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        } else {
            axios
                .post(
                    "http://127.0.0.1:8000/bookReport/bookReportLike",
                    {
                        reportNum: bookReportNum,
                    },
                    {
                        headers: {
                            "X-CSRFToken": csrftoken,
                        },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        setLikes((likes) => ({
                            ...likes,
                            [bookReportNum]: !likes[bookReportNum],
                        }));
                        setIsSelectedLike(!isSelectedLike);
                        setLikeCount(likeCount => isSelectedLike ? likeCount - 1 : likeCount + 1);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

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
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{rowData?.reportTitle || ''}</div>
                            <div>{rowData?.username || ''} | {`${rowData?.registDate_report.split('T')[0]} ${rowData?.registDate_report.split('T')[1]}`}</div>
                        </div>
                        <div style={{ display: 'flex', margin: '2px', padding: '0px 10px 10px', justifyContent: 'space-between', borderBottom: '1px solid #FDCEDF' }}>
                            <div style={{ fontSize: '14px' }}>{rowData?.title || ''}</div>
                            <div style={{ fontSize: '14px' }}>{rowData?.author || ''} | {rowData?.publisher || ''}</div>
                        </div>
                        <div style={{ height: '340px', padding: '10px', fontSize: '15px' }}>
                            {rowData?.reportContents || ''}
                        </div>
                        <div style={{ display: 'flex', margin: '-20px 5px 0 640px' }}>
                            {rowData && rowData.isUserWriteReportsLiked &&
                                <>
                                    <Button
                                        variant="contained"
                                        style={{ width: '100px', height: '30px', backgroundColor: '#EF9A9A', color: '#ffffff', marginRight: '5px' }}
                                        onClick={() => navigate(`/BookReportUpdate`, { state: rowData })}
                                    >
                                        수정
                                    </Button>

                                    <Button
                                        variant="contained"
                                        style={{ width: '100px', height: '30px', backgroundColor: '#EF9A9A', color: '#ffffff', marginRight: '5px' }}
                                        onClick={() => sendDeleteLikeBookReport(rowData.reportNum)}
                                    >
                                        삭제
                                    </Button>
                                </>
                            }
                            <div>
                                {isSelectedLike ?
                                    <FavoriteIcon style={{ fontSize: '30px', color: '#EF9A9A' }}
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            sendLikeBookReport(rowData.reportNum);
                                        }}
                                    ></FavoriteIcon>
                                    : <FavoriteBorderIcon
                                        style={{ fontSize: '30px', color: '#EF9A9A' }}
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            sendLikeBookReport(rowData.reportNum);
                                        }}>
                                    </FavoriteBorderIcon>}
                                <div style={{ textAlign: 'center', marginTop: '-10px', fontSize: '13px' }}>{likeCount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box >
        </>
    )

}

export default BookReportDetail;