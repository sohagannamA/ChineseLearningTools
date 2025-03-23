import "./wordlist.css"
import { NavLink } from "react-router-dom";
import { BsBookmarkPlusFill } from "react-icons/bs";// false-bookmark
import { BsBookmarkCheckFill } from "react-icons/bs";// true-bookmark
import { BiBookContent } from "react-icons/bi";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import authService from "../../service/authService";

export default function Eachword(props) {
    const { weekId, wordId, getallword, learningTitle, learningDes, HSKname } = props;
    const quillRef = useRef(null);
    const synth = window.speechSynthesis;
    const voices = useRef([]);
    const token = authService.getToken();
    const [saveBookmark, setSaveBookmark] = useState(false);
    const [currentweek, setCurrentweek] = useState([]);

    const [findweekData, setfindweekData] = useState([]);
    useEffect(() => {
        voices.current = synth.getVoices();
        synth.onvoiceschanged = () => {
            voices.current = synth.getVoices();
        };
    }, []);


    const logStringConcate = (text,limit) => {
        if (text.length > limit) {
            return text.substring(0, limit);
        }
        return text;
    }

    const handleBookmark = async (wordId) => {

        try {
            const response = await axios.put(`https://chineselearningtools-2.onrender.com/addbookmark/${wordId}/${weekId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSaveBookmark(true);
        }
        catch (error) {
            console.log(error);
        }
    }
    const removeBookmark = async (wordId) => {
        try {
            const response = await axios.put(`https://chineselearningtools-2.onrender.com/removeBookmark/${wordId}/${weekId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSaveBookmark(false);
            getallword();
        }
        catch (error) {
            console.log(error);
        }
    }
    const CheckBookmark = async () => {
        try {
            const response = await axios.get(`https://chineselearningtools-2.onrender.com/findBookmark/${wordId}/${weekId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.message === true) {
                setSaveBookmark(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        CheckBookmark();
    }, [])

    const getWeek = async () => {

        try {
            const response = await axios.get(`https://chineselearningtools-2.onrender.com/${wordId}/${weekId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const filteredData = response.data.findWeek.filter(item => item.havedata === true);
            setfindweekData(filteredData);
            setCurrentweek(response.data.message)
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getWeek();
    }, [])
    return (
        <div>
            <div className="each_word_box">
                {findweekData.map((data) =>
                    <>
                        <div className="title_for_learning">{logStringConcate(learningTitle,30)}</div>
                        <div className="des_for_learning">{logStringConcate(learningDes,60)}... <NavLink to={`/wordexplain/${wordId}`}><span className="more_btn">More</span></NavLink></div>
                    </>
                )}
                <div className="action_button_sec">
                    {saveBookmark ? <div className="action_button" onClick={(e) => removeBookmark(wordId)}>
                        <BsBookmarkCheckFill className="action_button_icon" />
                    </div> : <div className="action_button" onClick={(e) => handleBookmark(wordId)}>
                        <BsBookmarkPlusFill className="action_button_icon" />
                    </div>}
                    <NavLink to={`/wordexplain/${wordId}`}>
                        <div className="action_button">
                            <BiBookContent className="action_button_icon" />
                        </div>
                    </NavLink>
                    <div className="action_button week_show">
                        <p>Week {currentweek.map((data) => data)}</p>
                    </div>
                    <div className="action_button week_show">
                        <p>{HSKname}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
