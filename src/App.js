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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/BookList" element={<BookList />} />
        <Route path="/BookDetail/:id" element={<BookDetail />} />
        <Route path="/BookReportList" element={<BookReportList />} />
        <Route path="/BookReportDetail/:id" element={<BookReportDetail />} />
        <Route path="/BookReportRegist" element={<BookReportRegist />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/CommunityDetail/:id" element={<CommunityDetail />} />
        <Route path="/CommunityRegist" element={<CommunityRegist />} />
        <Route path="/MyPage" element={<MyPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
