import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
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
function preventDefault(event) {
  event.preventDefault();
}

export default function MyPage() {
  return (
    <React.Fragment>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
      </Box>
      <div style={{ margin: '80px 0 -15px 350px', fontSize: '22px', fontWeight: 'bold' }}>
        마이페이지
      </div>
      <Box sx={{ display: "flex", mt: "2rem", ml: "22rem", marginBottom: '20px' }}>
        <Box sx={{ width: "30%" }}>
          <Box sx={{ display: "flex" }}>
            <BookIcon style={{ color: "#F2BED1" }}></BookIcon>
            <Typography> 내가 작성한 독후감</Typography>
            <AddIcon style={{ marginLeft: '165px', color: "#F2BED1" }}></AddIcon>
            <Link color="primary" href="#" onClick={preventDefault}>
            </Link>
          </Box>
          <Table size="small" sx={{ marginTop: '10px', backgroundColor: "#F9F5F6" }}>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Title</TableCell>
                {/* <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ fontSize: '13px' }}>{row.id}</TableCell>
                  <TableCell style={{ fontSize: '13px' }}>{row.title}</TableCell>
                  {/* <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ mt: "2rem" }}> <VolunteerActivismIcon style={{ color: "#F2BED1" }}>
            </VolunteerActivismIcon>좋아요 누른 독후감
              <AddIcon style={{ marginLeft: '165px', color: "#F2BED1" }}></AddIcon>
            </Typography>
            <Link
              color="primary"
              href="#"
              onClick={preventDefault}
              sx={{ mt: "2rem" }}
            >
            </Link>
          </Box>
          <Table size="small" sx={{ marginTop: '10px', backgroundColor: "#F9F5F6" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '13px' }}>No.</TableCell>
                <TableCell style={{ fontSize: '13px' }}>Title</TableCell>
                {/* <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ fontSize: '13px' }}>{row.id}</TableCell>
                  <TableCell style={{ fontSize: '13px' }}>{row.title}</TableCell>
                  {/* <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ width: "30%", ml: "5rem" }}>
          <Box sx={{ display: "flex" }}>
            <FavoriteIcon style={{ color: "#F2BED1" }}></FavoriteIcon>
            <Typography> 좋아요 누른 도서</Typography>
            <AddIcon style={{ marginLeft: '178px', color: "#F2BED1" }}></AddIcon>
            <Link color="primary" href="#" onClick={preventDefault}>
            </Link>
          </Box>
          <Table size="small" sx={{ width: '350px', marginTop: '10px', backgroundColor: "#F9F5F6" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '13px' }}>No.</TableCell>
                <TableCell style={{ fontSize: '13px' }}>Title</TableCell>
                <TableCell style={{ fontSize: '13px' }}>author</TableCell>
                {/* <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookLikeList.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ fontSize: '13px' }}>{row.id}</TableCell>
                  <TableCell style={{ fontSize: '13px' }}>{row.title}</TableCell>
                  <TableCell style={{ fontSize: '13px' }}>{row.author}</TableCell>
                  {/* <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography sx={{ mt: "2rem", marginBottom: '10px' }}> <AccountBoxIcon style={{ color: "#F2BED1" }}></AccountBoxIcon>내 정보</Typography>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="110"
                image="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
                alt="profile image"
              />
              <CardContent >
                <Typography gutterBottom variant="h6" component="div">
                  홍길동
                </Typography>
                <Typography variant="body3" color="text.secondary">
                  abc@naver.com
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box >
    </React.Fragment >
  );
}
