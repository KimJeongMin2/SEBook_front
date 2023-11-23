import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainAppBar from "./MainAppBar";
import TabBar from "./TabBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Copyright(props) {
  const navigate = useNavigate();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ PROXY }) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [name, setName] = useState();
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [pwCheck, setPwCheck] = useState()

  const submit = async () => {
    const userInfo = {
      name: name,
      userId: id,
      password: pw,
    };

    if (pw === pwCheck) {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/user/memberReg",
          userInfo
        );

        console.log(res.data);
        alert("회원가입이 성공적으로 되었습니다. 환영합니다.");
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("등록에 실패했습니다. 다시 시도해주세요.");
      }
    } else if (name === "") {
      alert("이름을 입력하세요.")
    } else if (id === "") {
      alert("아이디를 입력하세요.")
    } else if (pw === "") {
      alert("비밀번호를 입력하세요.")
    } else if (pwCheck === "") {
      alert("비밀번호 확인을 하세요.")
    } else if (pw !== pwCheck) {
      alert("비밀번호가 일치하지 않습니다.")
    } else {
      alert("등록에 실패했습니다. 다시 시도해주세요.")
    }
  };

  return (
    <>
      <MainAppBar />
      <Box sx={{ paddingTop: "48px" }}>
        <TabBar />
      </Box>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="이름"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="identification"
                    label="아이디"
                    name="identification"
                    autoComplete="family-name"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: 'flex' }}>
                    <TextField
                      required
                      fullWidth
                      id="reconfirm password"
                      label="비밀번호 재확인"
                      type="password"
                      name="reconfirm passwordl"
                      autoComplete="reconfirm password"
                      value={pwCheck}
                      onChange={(e) => setPwCheck(e.target.value)}
                      style={{ width: '220px' }}
                    />
                    {pw && pwCheck && pw != pwCheck && (
                      <div style={{ color: 'red', fontSize: '12px', margin: '35px 0 0 5px' }}> 비밀번호가 일치하지 않습니다.</div>
                    )}
                  </div>
                </Grid>

                <Grid item xs={12} style={{ margin: '-10px 0 -20px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="개인정보 이용에 동의 합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#F8E8EE" }}
                onClick={() => { submit() }}
              >
                <Typography sx={{ color: "black" }}

                >등록</Typography>
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/SignIn" variant="body2">
                    이미 계정이 있으신가요? 로그인 하러 가기
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}