import React, { useState } from "react";
import { AppBar, Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, InputBase, Pagination, Toolbar, Typography } from "@mui/material";
import TabBar from "./TabBar";
import MainAppBar from "./MainAppBar";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Search = styled("div", {
  shouldForwardProp: (prop) => prop !== "theme",
})(({ theme }) => ({
  position: "relative",
  borderRadius: "50px 50px 50px 50px", // 둥글게 만들기 위한 변경
  backgroundColor: "rgba(255, 182, 193, 0.4)", // 연핑크 배경색 적용
  marginRight: 0,
  marginLeft: "auto", // 오른쪽 정렬 적용
  marginTop: "1ch",
  marginRight: "5ch",
  width: "40ch",
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
  {
    title: "1%를 읽는 힘",
    author: "메르",
    image:
      "https://image.aladin.co.kr/product/32289/45/cover500/k852834850_1.jpg",
  },
  {
    title: "아메리칸 프로메테우스",
    author: "카이 버드",
    image:
      "https://image.aladin.co.kr/product/31892/3/cover500/k342833636_1.jpg",
  },
  {
    title: "슈퍼노멀",
    author: "주언규",
    image:
      "https://image.aladin.co.kr/product/32308/43/cover500/890127437x_1.jpg",
  },
];

function BookList() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="도서명 또는 작가명을 입력하세요."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Grid container spacing={2} justifyContent="center">
          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: "#F9F5F6",
              marginTop: "50px",
            }}
          >
            {cardData.map((data) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ maxWidth: 280, margin: 1 }}>
                  <CardHeader
                    title={data.title}
                    subheader={data.author}
                    titleTypographyProps={{ variant: "body1" }}
                    subheaderTypographyProps={{ variant: "body2" }}
                  />
                  <CardMedia
                    component="img"
                    height="200"
                    image={data.image}
                    alt="Paella dish"
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      aria-expanded={expanded}
                      aria-label="show more"
                      onClick={handleExpandClick}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Pagination count={10} color="secondary" />
          </Box>
        </Grid>
        
      </Box>
    </>
  );
}

export default BookList;
