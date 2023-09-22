import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import BookList from "./components/BookList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MyPage from "./components/MyPage";
import BookReportList from "./components/BookReportList";
import BookReportRegist from "./components/BookReportRegist";
import Community from "./components/Community";
import CommunityRegist from "./components/CommunityRegist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/BookList" element={<BookList />} />
        <Route path="/BookReportList" element={<BookReportList />} />
        <Route path="/BookReportRegist" element={<BookReportRegist />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/CommunityRegist" element={<CommunityRegist />} />
        <Route path="/MyPage" element={<MyPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
