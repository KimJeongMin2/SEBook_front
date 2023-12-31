import React, { useState, useEffect } from "react";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import axios from "axios";
import { Box, InputBase, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
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
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import "../list.css";
import { ToastContainer, toast } from "react-toastify";

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

const csrftoken = Cookies.get("csrftoken");

function Community() {
    const navigate = new useNavigate();

    const [communityList, setCommunityList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [totalPages, setTotalPages] = useState(0);
    const [likes, setLikes] = useState({});
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [likeStatus, setLikeStatus] = useState({});
    const [likeCnt, setLikeCnt] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("도서명");
    const [myInfo, setMyInfo] = useState();
    const [likedParagraphList, setLikedParagraphList] = useState([]);
    const [writtenParagraphList, setWrittenParagraphList] = useState([]);
    const [isUserLikeModalContent, setIsUserLikeModalContent] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [modalLikeStatus, setModalLikeStatus] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(0);
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

    const handleOpen = (data) => {
        setOpen(true);
        setModalContent(data);
        setModalLikeStatus(data.user_liked.includes(currentUser));
    };

    useEffect(() => {
        console.log("mmooddalle", modalContent);
    }, [modalContent]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        setCommunityList([]);
        if (searchTerm) {
            if (searchType === "작가명") {
                searchParagraphByAuthor();
            } else if (searchType === "도서명") {
                searchParagraphByTitle();
            }
        } else {
            axios
                .get(
                    `http://127.0.0.1:8000/community/paragraphReadAll?page=${currentPage}`
                )
                .then((response) => {
                    console.log(response.data);
                    console.log("rrr", response.data.results);
                    setCommunityList(response.data.results);
                    setTotalPages(response.data.total_pages);

                    const likedPostIds = response.data.userLikeReports || [];
                    setLikeStatus(
                        likedPostIds.reduce((acc, id) => ({ ...acc, [id]: true }), {})
                    );

                    const likeCounts = response.data.results.reduce((acc, result) => {
                        acc[result.postNum] = result.like_count;
                        return acc;
                    }, {});
                    setLikeCnt(likeCounts);
                })
                .catch((error) => console.error(error));
        }
    }, [currentPage, forceUpdate]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/community/paragraphReadLike", {
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                withCredentials: true,
            })
            .then((response) => {
                const likeParagraphList = response.data.savedCommunityList;

                const postNums = likeParagraphList.map((post) => post.postNum);
                setLikedParagraphList(postNums);
                updateLikesState(likeParagraphList);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/community/paragraphReadMy", {
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                withCredentials: true,
            })
            .then((response) => {
                const writtenParagraphList = response.data.userCommunityList;

                const postNums = writtenParagraphList.map((post) => post.postNum);
                setWrittenParagraphList(postNums);
            })
            .catch((error) => console.error(error));
    }, []);

    const updateLikesState = (likeParagraphList) => {
        const updatedLikes = {};
        likeParagraphList.forEach((report) => {
            updatedLikes[report.postNum] = true;
        });
        setLikeStatus(updatedLikes);
    };

    const sendLikeCommunity = (postNum) => {
        if (!myInfo) {
            toast.warning(
                () => (
                    <div style={{ margin: "25px 0 0 10px" }}>
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
            toggleLike(postNum);
            axios
                .post(
                    "http://127.0.0.1:8000/community/paragraphLike",
                    {
                        postNum: postNum,
                    },
                    {
                        headers: {
                            "X-CSRFToken": csrftoken,
                        },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    setForceUpdate(forceUpdate + 1);

                    if (likes[postNum]) {
                        toast(
                            () => (
                                <div style={{ width: '300px', margin: "25px 0 0 10px" }}>
                                    해당 구절 공감을 취소하였습니다.
                                    <br />
                                    <br />
                                </div>
                            ),
                            {
                                position: "top-right",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            }
                        );
                    } else {
                        toast(
                            () => (
                                <div style={{ width: '300px', margin: "25px 0 0 10px" }}>
                                    <div>해당 구절을 공감하였습니다.</div>
                                    <div>공감한 구절을 보러 가시겠습니까?</div>
                                    <br />
                                    <br />
                                    <br />
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={() => navigate("/MyLikedParagraph")}
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
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            }
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const sendDeleteParagraphMy = (postNum) => {
        if (window.confirm("삭제하시겠습니까?")) {
            axios
                .delete("http://127.0.0.1:8000/community/paragraphDelete", {
                    headers: {
                        "X-CSRFToken": csrftoken,
                    },
                    params: {
                        postNum: postNum,
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert("취소합니다.");
        }
    };

    const toggleLike = (id) => {
        setLikes({
            ...likes,
            [id]: !likes[id],
        });
    };


    const resetData = () => {
        setCommunityList([]);
        setSearchResults(null);
    };

    const searchParagraphByAuthor = () => {
        resetData();
        axios
            .get(
                `http://127.0.0.1:8000/community/searchParagraphByAuthor?page=${currentPage}`,
                {
                    params: {
                        author: searchTerm,
                    },
                }
            )
            .then((response) => {
                console.log("searchAuthorrrrr", response.data.results);
                setSearchResults(response.data.results);
                console.log("searchAuthorrrrr", response.data.total_pages);
                setTotalPages(response.data.total_pages);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert("해당 검색어에 맞는 결과가 없습니다.");
                } else {
                    console.log(error);
                }
            });
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    const searchParagraphByTitle = () => {
        resetData();
        axios
            .get(
                `http://127.0.0.1:8000/community/searchParagraphByTitle?page=${currentPage}`,
                {
                    params: {
                        title: searchTerm,
                    },
                }
            )
            .then((response) => {
                console.log("searchTitleeeee", response.data.results);
                setSearchResults(response.data.results); // 검색 결과를 별도 상태에 저장
                console.log("searchTotallll", response.data.total_pages);
                setTotalPages(response.data.total_pages);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert("해당 검색어에 맞는 결과가 없습니다.");
                } else {
                    console.log(error);
                }
            });
    };

    const handleSearchKeyPress = (event) => {
        if (event.key === "Enter") {
            resetData();
            if (searchType === "작가명") {
                searchParagraphByAuthor();
            } else if (searchType === "도서명") {
                searchParagraphByTitle();
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // useEffect(() => {
    //   setCurrentPage(1);
    // }, [searchTerm]);
    const currentUser = myInfo?.userNum;
    return (
        <>
            <MainAppBar />
            <Box sx={{ paddingTop: "48px" }}>
                <TabBar />
                <div
                    style={{
                        display: "flex",
                        maxWidth: "70%",
                        marginTop: "70px",
                        margin: "70px auto 0",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{ marginTop: "35px", fontSize: "22px", fontWeight: "bold" }}
                    >
                        커뮤니티
                    </div>
                    <div style={{ marginLeft: "auto", display: "flex" }}>
                        <StyledSelect
                            sx={{
                                marginTop: "30px",
                                marginRight: "5px",
                                height: "35px",
                                fontSize: "13px",
                            }}
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            defaultValue={"도서명"}
                        >
                            <MenuItem value={"도서명"} style={{ fontSize: "13px" }}>
                                도서명
                            </MenuItem>
                            <MenuItem value={"작가명"} style={{ fontSize: "13px" }}>
                                작가명
                            </MenuItem>
                        </StyledSelect>
                        <Search
                            style={{ marginTop: "30px", height: "35px", marginLeft: "auto" }}
                        >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                style={{ fontSize: "13px" }}
                                placeholder="도서명 또는 작가명을 입력하세요."
                                inputProps={{ "aria-label": "search" }}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyPress}
                            />
                        </Search>
                    </div>
                </div>
                <TableContainer
                    style={{ display: "flex", maxWidth: "70%", margin: "10px auto" }}
                >
                    <div style={{ height: "420px" }}>
                        <Table sx={{ minWidth: 600 }} aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#F8E8EE" }}>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>도서명</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        인상깊은 구절
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>글쓴이</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>작가명</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>등록일</TableCell>
                                    <TableCell style={{ textAlign: "left", marginLeft: "-10px" }}>
                                        공감
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ backgroundColor: "#F9F5F6" }}>
                                {(searchResults || communityList) &&
                                    (searchResults || communityList).length > 0 ? (
                                    (searchResults || communityList).map((data, index) => {
                                        const isUserLikeParagraph =
                                            Array.isArray(likedParagraphList) &&
                                            likedParagraphList.some((post) => data.postNum === post);
                                        const isUserWriteParagraph =
                                            Array.isArray(writtenParagraphList) &&
                                            writtenParagraphList.some(
                                                (post) => data.postNum === post
                                            );

                                        const isCurrentUserWriteParagraph = data.userNum_community === currentUser;

                                        return (
                                            <TableRow
                                                className="list"
                                                key={data.title}
                                                sx={{
                                                    "&:last-child td, &:last-child th": { border: 0 },
                                                }}
                                                onClick={() => {
                                                    handleOpen(data);
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        width: "10px",
                                                        borderRight: "1px solid #F8E8EE",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        width: "200px",
                                                        borderRight: "1px solid #F8E8EE",
                                                    }}
                                                >
                                                    {truncate(data.title, 16)}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        width: "450px",
                                                        borderRight: "1px solid #F8E8EE",
                                                    }}
                                                >
                                                    {truncate(data.contents, 22)}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        width: "50px",
                                                        borderRight: "1px solid #F8E8EE",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {truncate(data.username, 9)}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        width: "100px",
                                                        borderRight: "1px solid #F8E8EE",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {truncate(data.author, 6)}
                                                </TableCell>
                                                <TableCell
                                                    style={{ width: "90px", textAlign: "center" }}
                                                >
                                                    {data.registDate_community.split("T")[0]}
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        display: "flex",
                                                        width: "65px",
                                                        textAlign: "center",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        sendLikeCommunity(data.postNum);
                                                    }}
                                                >
                                                    <div>
                                                        {data.user_liked.includes(currentUser) ? (
                                                            <FavoriteIcon style={{ color: "#EF9A9A" }} />
                                                        ) : (
                                                            <FavoriteBorderIcon
                                                                style={{ color: "#EF9A9A" }}
                                                            />
                                                        )}
                                                        <div style={{ marginTop: "-5px" }}>
                                                            {data.like_count}
                                                        </div>
                                                    </div>
                                                    {isCurrentUserWriteParagraph ? (
                                                        <DeleteIcon
                                                            className="like"
                                                            style={{
                                                                margin: "10px 0 0 0px",
                                                                color: "#FF9999",
                                                            }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                sendDeleteParagraphMy(data.postNum);
                                                            }}
                                                        />

                                                    ) : (
                                                        <></>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>No data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TableContainer>
                <div style={{ display: "flex", maxWidth: "70%", margin: "0 auto" }}>
                    <Pagination
                        count={totalPages}
                        color="primary"
                        style={{
                            margin: "50px 0",
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                        onChange={handleChangePage}
                    />
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="contained"
                            style={{
                                width: "100px",
                                height: "30px",
                                backgroundColor: "#EF9A9A",
                                color: "#ffffff",
                                marginTop: "5px",
                            }}
                            onClick={() => {
                                navigate("/CommunityRegist");
                            }}
                        >
                            등록하기
                        </Button>
                    </Stack>
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        // border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="div"
                        sxTypography={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "22px",
                            fontWeight: "bold",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontWeight: "bold"
                            }}
                        >
                            {"구절 정보"}
                            {modalContent && (
                                <FavoriteIcon
                                    style={{
                                        color: modalLikeStatus ? "#EF9A9A" : "gray",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(modalContent.postNum);
                                        sendLikeCommunity(modalContent.postNum);
                                        setModalLikeStatus(!modalLikeStatus);
                                    }}
                                />
                            )}
                        </div>
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <span style={{ fontWeight: "bold" }}>도서명 | </span>
                        {modalContent.title}
                        <div>{modalContent.date}</div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <span style={{ fontWeight: "bold" }}>작가 | </span>
                        {modalContent.author}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <span style={{ fontWeight: "bold" }}>내용 | </span>
                        {modalContent.contents}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button onClick={handleClose}>닫기</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default Community;