import { React, useEffect, useState } from "react";
import MainAppBar from "./MainAppBar";
import { motion } from "framer-motion";
import TabBar from "./TabBar";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";

const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  position: "relative",
  borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
  backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
  marginRight: 0,
  marginLeft: "auto", // 오른쪽 정렬 적용
  marginTop: "10ch",
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

const cardData = [
  {
    title: "어린왕자",
    author: "생텍쥐베리",
    image: "https://www.munhak.com/data/book/img_201807275280055_b.jpg",
  },
  {
    title: "백설공주",
    author: "야코프 그림",
    image:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788965671527.jpg",
  },
  {
    title: "인어공주",
    author: "한스 크리스티안 안데르센",
    image:
      "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788939570504.jpg",
  },
  {
    title: "신데렐라",
    author: "샤를 페르",
    image:
      "https://image.aladin.co.kr/product/1634/30/cover500/8965671566_1.jpg",
  },
  {
    title: "앤서니 브라운 코끼리",
    author: "앤서니 브라운",
    image: "https://img.vogue.co.kr/vogue/2019/08/style_5d5cadfdadb7c.jpeg",
  },
];

const bestCardData = [
  {
    id: 1,
    title: "1%를 읽는 힘",
    author: "메르",
    image:
      "https://image.aladin.co.kr/product/32289/45/cover500/k852834850_1.jpg",
  },
  {
    id: 2,
    title: "아메리칸 프로메테우스",
    author: "카이 버드",
    image:
      "https://image.aladin.co.kr/product/31892/3/cover500/k342833636_1.jpg",
  },
  {
    id: 3,
    title: "슈퍼노멀",
    author: "주언규",
    image:
      "https://image.aladin.co.kr/product/32308/43/cover500/890127437x_1.jpg",
  },
  {
    id: 4,
    title: "세이노의 가르침",
    author: "세이노",
    image:
      "https://image.aladin.co.kr/product/30929/51/cover500/s302832892_1.jpg",
  },
  {
    id: 5,
    title: "우리 대화는 밤새도록 끝",
    author: "허휘수",
    image:
      "https://image.aladin.co.kr/product/32294/82/cover500/k672834951_2.jpg",
  },
];

const bookReportData = [
  {
    title: "1%를 읽는 힘",
    writer: "김정민",
    image:
      "https://image.aladin.co.kr/product/32289/45/cover500/k852834850_1.jpg",
  },
  {
    title: "아메리칸 프로메테우스",
    writer: "신영옥",
    image:
      "https://image.aladin.co.kr/product/31892/3/cover500/k342833636_1.jpg",
  },
  {
    title: "슈퍼노멀",
    writer: "정채연",
    image:
      "https://image.aladin.co.kr/product/32308/43/cover500/890127437x_1.jpg",
  },
  {
    title: "세이노의 가르침",
    writer: "홍길동",
    image:
      "https://image.aladin.co.kr/product/30929/51/cover500/s302832892_1.jpg",
  },
  {
    title: "우리 대화는 밤새도록 끝",
    writer: "김길동",
    image:
      "https://image.aladin.co.kr/product/32294/82/cover500/k672834951_2.jpg",
  },
];

function MainPage() {
  const theme = useTheme();
  const [expandedId, setExpandedId] = useState(-1);
  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? -1 : id);
  };

  const [recommendBook, setRecommendBook] = useState([]);

  const [likes, setLikes] = useState({});
  const [searchType, setSearchType] = useState("도서명");

  useEffect(() => {
    console.time();
    axios
      .get("http://172.30.66.199:8000/test/recommendBook", {
        params: {
          user_book: "시인의 계곡",
        },
      })
      .then((response) => {
        console.timeEnd();
        console.log(response.data);

        setRecommendBook(response.data.recommendations);
      })
      .catch((error) => console.error(error));
  }, []);

  const sendLikeBook = (isbn13) => {
    axios.post("http://172.30.66.099.8000/book/bookLike", {
      params:{
        isbn13:isbn13
      }
    })
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=> {
      console.log(error);
    });
  }

  

  const toggleLike = (id) => {
    setLikes({
      ...likes,
      [id]: !likes[id],
    });
  };

  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            marginRight: "5ch",
          }}
        >
          <StyledSelect
             sx={{ marginTop: "80px", marginLeft: "770px", height: "35px", fontSize: "13px" }}
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            defaultValue={"도서명"}
          >
            <MenuItem value={"도서명"} style={{ fontSize: "13px" }}>도서명</MenuItem>
            <MenuItem value={"작가명"} style={{ fontSize: "13px" }}>작가명</MenuItem>
          </StyledSelect>
          <Search
            style={{
              marginTop: "80px",
              marginLeft: "10px",
              width: "100px",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              style={{ fontSize: "13px" }}
              placeholder="도서명 또는 작가명을 입력하세요."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>

        <Typography
          sx={{
            fontWeight: "bold",
            marginLeft: "160px",
            fontSize: "20px",
            marginTop: "-28px",
          }}
        >
          홍길동님, 맞춤 도서 추천
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "#F9F5F6",
              marginTop: "30px",
            }}
          >
            {recommendBook.map((data, index) => (
              <Grid>
                <Card
                  sx={{ maxWidth: 280, margin: 1 }}
                  style={{ width: "220px" }}
                >
                  <CardHeader
                    title={data.title}
                    subheader={data.author}
                    titleTypographyProps={{ variant: "body1" }}
                    subheaderTypographyProps={{ variant: "body2" }}
                  />
                  <motion.img
                    component="img"
                    width="220px"
                    height="200"
                    src={data.cover}
                    alt="Paella dish"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                  />
                  <CardActions disableSpacing>
                    <FavoriteIcon
                      style={{ color: "#EF9A9A" }}
                      // onClick={() => toggleLike(data.id)}
                    />
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      aria-expanded={expandedId === index}
                      aria-label="show more"
                      onClick={() => handleExpandClick(index)}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  {expandedId === index && (
                    <>
                      {data.description && (
                        <>
                          {
                            <Collapse in timeout="auto" unmountOnExit>
                              {data.description}
                            </Collapse>
                          }
                        </>
                      )}
                    </>
                  )}
                </Card>
              </Grid>
            ))}
          </Box>
        </Grid>
        {/* <CardContent>
            <Typography variant="body2" color="text.secondary">
              도서명
            </Typography>
          </CardContent> */}

        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and
                chorizo, and cook, stirring occasionally until lightly browned,
                6 to 8 minutes. Transfer shrimp to a large plate and set aside,
                leaving chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring often
                until thickened and fragrant, about 10 minutes. Add saffron broth
                and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse> */}
        <Typography
          sx={{
            fontWeight: "bold",
            marginLeft: "160px",
            fontSize: "20px",
            marginTop: "10px",
          }}
        >
          베스트셀러 Top5!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "80%",
              height: "350px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "#F9F5F6",
              marginTop: "30px",
            }}
          >
            {bestCardData.map((data, index) => (
              <Grid>
                <Card
                  sx={{ maxWidth: 280, margin: "10px" }}
                  style={{ width: "220px" }}
                >
                  <CardHeader
                    title={data.title}
                    subheader={data.author}
                    titleTypographyProps={{ variant: "body1" }}
                    subheaderTypographyProps={{ variant: "body2" }}
                  />
                  <motion.img
                    component="img"
                    width="220px"
                    height="200"
                    src={data.image}
                    alt="Paella dish"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                  />

                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon
                        style={{ color: likes[data.id] ? "#EF9A9A" : "gray" }}
                        onClick={() => {
                          toggleLike(data.id);
                          sendLikeBook(data.id);
                        }}
                      />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      aria-expanded={expandedId}
                      aria-label="show more"
                      onClick={() => handleExpandClick(index)}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Box>
        </Grid>
        <Typography
          sx={{
            fontWeight: "bold",
            marginLeft: "160px",
            fontSize: "20px",
            marginTop: "50px",
          }}
        >
          독후감 Top5!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "#F9F5F6",
              margin: "30px 0 100px",
            }}
          >
            {bookReportData.map((data) => (
              <Grid>
                <Card
                  sx={{ maxWidth: 280, margin: 1 }}
                  style={{ width: "220px" }}
                >
                  <CardHeader
                    title={data.title}
                    subheader={data.writer}
                    titleTypographyProps={{ variant: "body1" }}
                    subheaderTypographyProps={{ variant: "body2" }}
                  />

                  <motion.img
                    component="img"
                    width="220px"
                    height="200"
                    src={data.image}
                    alt="Paella dish"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      aria-expanded={expandedId}
                      aria-label="show more"
                      onClick={handleExpandClick}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default MainPage;
