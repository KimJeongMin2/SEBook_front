import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

// Generate Order Data
function createData(id, title) {
  return { id, title };
}

function createBookLikeListDate(id, title, author) {
  return { id, title, author };
}

const rows = [
  createData(1, "어린왕자"),
  createData(2, "백설공주"),
  createData(3, "신데렐라"),
  createData(4, "인어공주"),
  createData(5, "앤서니 브라운 코끼리"),
  //   createData(
  //     1,
  //     '16 Mar, 2019',
  //     'Paul McCartney',
  //     'London, UK',
  //     'VISA ⠀•••• 2574',
  //     866.99,
  //   ),
  //   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  //   createData(
  //     3,
  //     '16 Mar, 2019',
  //     'Michael Jackson',
  //     'Gary, IN',
  //     'AMEX ⠀•••• 2000',
  //     654.39,
  //   ),
  //   createData(
  //     4,
  //     '15 Mar, 2019',
  //     'Bruce Springsteen',
  //     'Long Branch, NJ',
  //     'VISA ⠀•••• 5919',
  //     212.79,
  //   ),
];

const bookLikeList = [
  createBookLikeListDate(1, "어린왕자", "생텍쥐베리"),
  createBookLikeListDate(2, "백설공주", "야코프 그림"),
  createBookLikeListDate(3, "신데렐라", "샤를 페르"),
  createBookLikeListDate(4, "엔서니 브라운 코끼리", "엔서니 브라운"),
  createBookLikeListDate(5, "1%를 읽는 힘", "메르"),
];
const data = [
  createBookLikeListDate(1, "어린왕자", "김정민"),
  createBookLikeListDate(2, "백설공주", "김정민"),
  createBookLikeListDate(3, "신데렐라", "김정민"),
  createBookLikeListDate(4, "엔서니 브라운 코끼리", "김정민"),
  createBookLikeListDate(5, "1%를 읽는 힘", "김정민"),
];
function preventDefault(event) {
  event.preventDefault();
}

export default function MyPage() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
      </Box>
      <div
        style={{
          margin: "80px 0 -15px 350px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        마이페이지
      </div>
      <Box
        sx={{
          mt: "3rem",
          alignItems:"center",
          justifyContent:"center",
        }}
      >
        <Box sx={{ display: "flex",  justifyContent: "center"}}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr:"10rem"}} >
            <Typography>
            <BookIcon style={{ color: "#F2BED1" }}></BookIcon>
              나의 독후감
              <AddIcon
                style={{ marginLeft: "165px", color: "#F2BED1" }}
              ></AddIcon>
            </Typography>

            <Link color="primary" href="#" onClick={preventDefault}></Link>
            <Table
              size="small"
              sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>BookReport Title</TableCell>
                  <TableCell>author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookLikeList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ fontSize: "13px" }}>{row.id}</TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.title}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.author}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography>
              <VolunteerActivismIcon
                style={{ color: "#F2BED1" }}
              ></VolunteerActivismIcon>
              나의 인상 깊은 구절
              <AddIcon
                style={{ marginLeft: "165px", color: "#F2BED1" }}
              ></AddIcon>
            </Typography>
            <Link
              color="primary"
              href="#"
              onClick={preventDefault}
            ></Link>
            <Table
              size="small"
              sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>Paragraph</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>user</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ fontSize: "13px" }}>{row.id}</TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.title}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.author}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around", mt:"1rem"}}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography>
              <VolunteerActivismIcon
                style={{ color: "#F2BED1" }}
              ></VolunteerActivismIcon>
              좋아요 누른 독후감
              <AddIcon
                style={{ marginLeft: "165px", color: "#F2BED1" }}
              ></AddIcon>
            </Typography>
            <Link
              color="primary"
              href="#"
              onClick={preventDefault}
            ></Link>
            <Table
              size="small"
              sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>BookReport Title</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookLikeList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ fontSize: "13px" }}>{row.id}</TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.title}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.author}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography>
              <FavoriteIcon style={{ color: "#F2BED1" }}></FavoriteIcon>
              좋아요 누른 도서
              <AddIcon
                style={{ marginLeft: "178px", color: "#F2BED1", mt: "2rem" }}
                onClick={() => {
                  navigate("/MyLikedBookList");
                }}
              ></AddIcon>
              <Link color="primary" href="#" onClick={preventDefault}></Link>
            </Typography>
            <Table
              size="small"
              sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>Title</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookLikeList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ fontSize: "13px" }}>{row.id}</TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.title}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.author}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center" }}>
            <Typography>
              <FavoriteIcon style={{ color: "#F2BED1" }}></FavoriteIcon>
              좋아요 누른 구절
              <AddIcon
                style={{ marginLeft: "178px", color: "#F2BED1"}}
                onClick={() => {
                  navigate("/MyLikedBookList");
                }}
              ></AddIcon>
              <Link color="primary" href="#" onClick={preventDefault}></Link>
            </Typography>
            <Table
              size="small"
              sx={{ marginTop: "10px", backgroundColor: "#F9F5F6" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "13px" }}>No.</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>Title</TableCell>
                  <TableCell style={{ fontSize: "13px" }}>author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookLikeList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ fontSize: "13px" }}>{row.id}</TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.title}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }}>
                      {row.author}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
