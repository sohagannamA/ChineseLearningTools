import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import MCQ from './MCQ';
import CountQuestion from './CountQuestion';
import AudioMCQ from './AudioMCQ';
export default function QuestionsBox() {
    const location = useLocation();
    const navigate = useNavigate();
    const [countData, setCountData] = useState();
    const { questionsGroup,setIsVisible } = location.state || {};
    const group = questionsGroup[0].group

    useEffect(() => {
        if (!questionsGroup) { // Checks both null and undefined
            navigate("/");
        }
    }, [questionsGroup, navigate]);
    const passCountData = (countdata) => {
        if (countdata) {
            setCountData(countdata)
        }
    }
    return (
        <div className='flash_card_display_section'>
            <div className='quiz_question_box_sec'>
                <div className='quiz_question_box'>
                    {group === "mcq" && (
                        countData ? (
                            <MCQ questionsGroup={questionsGroup} countData={countData} />
                        ) : (
                            <CountQuestion maxcount={questionsGroup.length} passCountData={passCountData} setIsVisible={setIsVisible} />
                        )
                    )}
                     {group === "audio" && (
                        countData ? (
                            <AudioMCQ questionsGroup={questionsGroup} countData={countData} />
                        ) : (
                            <CountQuestion maxcount={questionsGroup.length} passCountData={passCountData} setIsVisible={setIsVisible} />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
