import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MyPage from "./components/MyPage";
import BookReportList from "./components/BookReportList";
import BookReportRegist from "./components/BookReportRegist";
import Community from "./components/Community";
import CommunityRegist from "./components/CommunityRegist";
import BookReportDetail from "./components/BookReportDetail";
import CommunityDetail from "./components/CommunityDetail";
import MyLikedBookList from "./components/MyLikedBookList";
import MyBookReport from "./components/MyBookReport";
import MyLikedBookReport from "./components/MyLikedBookReport.js";
import MyParagraph from "./components/MyParagraph";
import MyLikedParagraph from "./components/MyLikedParagraph";
import BookReportUpdate from "./components/BookReportUpdate.js";
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
function App() {

  const PROXY = process.env.REACT_APP_PROXY;

  <link href="https://font.elice.io/css?family=Elice+DX+Neolli" rel="stylesheet"></link>
  return (
    <>
      <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} PROXY={PROXY} />
        <Route path="/SignUp" element={<SignUp />} PROXY={PROXY} />
        <Route path="/SignIn" element={<SignIn />} PROXY={PROXY} />
        <Route path="/BookList" element={<BookList />} PROXY={PROXY} />
        <Route path="/BookDetail/:id" element={<BookDetail />} PROXY={PROXY} />
        <Route path="/BookReportList" element={<BookReportList />} PROXY={PROXY} />
        <Route path="/BookReportDetail/:id" element={<BookReportDetail />} PROXY={PROXY} />
        <Route path="/BookReportRegist" element={<BookReportRegist />} PROXY={PROXY} />
        <Route path="/BookReportUpdate" element={<BookReportUpdate />} PROXY={PROXY} />
        <Route path="/Community" element={<Community />} PROXY={PROXY} />
        <Route path="/CommunityDetail/:id" element={<CommunityDetail />} PROXY={PROXY} />
        <Route path="/CommunityRegist" element={<CommunityRegist />} PROXY={PROXY} />
        <Route path="/MyPage" element={<MyPage />} PROXY={PROXY} />
        <Route path="/MyLikedBookList" element={<MyLikedBookList />} PROXY={PROXY} />
        <Route path="/MyBookReport" element={<MyBookReport />} PROXY={PROXY} />
        <Route path="/MyLikedBookReport" element={<MyLikedBookReport />} PROXY={PROXY} />
        <Route path="/MyParagraph" element={<MyParagraph />} PROXY={PROXY} />
        <Route path="/MyLikedParagraph" element={<MyLikedParagraph />} PROXY={PROXY} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
