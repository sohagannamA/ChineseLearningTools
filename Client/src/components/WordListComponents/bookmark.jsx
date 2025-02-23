import "./wordlist.css";
import { useState, useEffect } from "react";
import Eachword from "./eachWord";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import authService from "../../service/authService";
import { FaRegBookmark } from "react-icons/fa6";
export default function bookmark() {
    const [allword, setAllword] = useState([]);
    const token = authService.getToken();
    const getallword = async () => {

        try {
            const response = await axios.get(`http://127.0.0.1:8000/getallword/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const filteredData = response.data.filter(item => item.Issave === true);
            setAllword(filteredData)
            console.log(allword.length)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getallword();
    }, []);
    return (
        <div className="word_list_components each_components">
            <div className="max-width">
                <div className="when_data_notFound">
                    <div className="created_main_section">
                        <div className="created_left_sec">
                            <div className="created_logo_title">Total Word : 201</div>
                        </div>
                        <div className="created_right_sec">
                            <div className="each_plan_search_box_sec">
                                <div className="search_box_left">
                                    <input
                                        type="text"
                                        placeholder="Search Your Plans"
                                        className="created_search_plan"
                                    />
                                </div>
                                <div className="search_box_right">
                                    <IoSearch className="search_box_icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="each_word_list_section">
                    <div className="word_list_data">
                        {allword.map((data) => (
                            <Eachword
                                key={data._id}
                                weekId={data.weekId}
                                englishWord={data.englishWord}
                                chinesepinyin={data.chinesepinyin}
                                chinesecharacter={data.chinesecharacter}
                                sentenceenglish={data.sentenceenglish}
                                sentencecharacter={data.sentencecharacter}
                                sentencepinyin={data.sentencepinyin}
                                wordId={data._id}
                                getallword={getallword}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}