import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatedStudyPage from "../page/createdStudy_page/allCreatedStudyPage";
import TopNav from "../components/NavComponents/topnav/TopNav";
import LeftNav from "../components/NavComponents/leftnav/leftnav";
import WordList from "../components/WordListComponents/wordlist";
import { useEffect, useState } from "react";
import AddWord from "../components/addword/AddWord";
import WordExplain from "../page/wordExplain_Page/WordExplain_Page";
import Registration from "../components/UserAuth/registration";
import Login from "../components/UserAuth/login";
import authService from "../service/authService";
import ProtectedRoute from "./proctedRoute";

import Bookmark from "../components/WordListComponents/bookmark";
import TODO from "../components/ToDO/todo";
import Rutine from "../components/rutine/rutine";
import Semester from "../components/rutine/semester";
import ExcalidrawComponent from "../components/Draw/ExcalidrawComponent";
import FlashCardHome from "../components/flashcard/FlashCardHome";
import QuizTopic from "../components/quiz/QuizTopic";
import QuestionsBox from "../components/quiz/QuestionsBox";

export default function AppRoutes() {
    const [clicked, setClick] = useState(false);
    const [token, setToken] = useState(authService.getToken());
    const [clickSuccess, setClickSuccess] = useState(false);

    useEffect(() => {
        const storedToken = authService.getToken();
        setToken(storedToken);
    }, []);

    return (
        <BrowserRouter>
            {token && <TopNav />}
            {token && <LeftNav />}
            <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <WordList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/all_created/"
                    element={
                        <ProtectedRoute>
                            <CreatedStudyPage clickSuccess={clickSuccess} setClickSuccess={setClickSuccess} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wordexplain/:id"
                    element={
                        <ProtectedRoute>
                            <WordExplain />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/all_created/:id"
                    element={
                        <ProtectedRoute>
                            <AddWord setClick={setClick} clicked={clicked} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizQuestions"
                    element={
                        <ProtectedRoute>
                            <QuestionsBox />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bookmark"
                    element={
                        <ProtectedRoute>
                            <Bookmark />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/flashcard"
                    element={
                        <ProtectedRoute>
                            <FlashCardHome />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/mytodo"
                    element={
                        <ProtectedRoute>
                            <TODO />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/rutine"
                    element={
                        <ProtectedRoute>
                            <Rutine />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/draw"
                    element={
                        <ProtectedRoute>
                            <ExcalidrawComponent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addsemester"
                    element={
                        <ProtectedRoute>
                            <Semester />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

