import React from 'react'
import { useNavigate } from "react-router-dom";
import "./quizStyle.css";
import Quiz from "./questiondataset/MCQHSK-1.json"
import AudioHSK1 from "./questiondataset/audiodataset/HSK-1/HSK1Audio.json"
export default function QuizTopic(props) {
    const { category, activeTab, setIsVisible } = props;
    const mcqGroup = activeTab === "HSK-1" && Quiz.filter((item => item.category === category));
    const audioGroup = activeTab === "HSK-1" && AudioHSK1.filter((item) => item.category === category)

    const navigate = useNavigate();
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the elements
        }
        return arr;
    }

    const handleChoice = (questionsGroup) => {
        if (mcqGroup.length > 0) {
            const suffleQuestion = shuffleArray(questionsGroup);
            navigate("/quizQuestions", { state: { questionsGroup: suffleQuestion } });
        }
        else {
            alert(category + " category no data found");
        }
    }
    return (
        <div className='quiztopic_container'>
            <div className='each_cetagory_box for_quiz_category' onClick={() => handleChoice(mcqGroup)}>
                <div className='ceagory_name_and_si smaill_font'>MULTIPLE CHOICE</div>
                <div className='total_word_box_sec smaill_font'>{mcqGroup.length > 0 ? mcqGroup.length : 0}</div>
            </div>
            <div className='each_cetagory_box' onClick={() => handleChoice()}>
                <div className='ceagory_name_and_si smaill_font'>FILL IN THE BLANKS</div>
                <div className='total_word_box_sec smaill_font'>14</div>
            </div>
            <div className='each_cetagory_box for_quiz_category' onClick={() => handleChoice()}>
                <div className='ceagory_name_and_si smaill_font'>TRUE OR FALSE</div>
                <div className='total_word_box_sec smaill_font'>20</div>
            </div>
            <div className='each_cetagory_box' onClick={() => handleChoice()}>
                <div className='ceagory_name_and_si smaill_font'>MATCHING PAIRS</div>
                <div className='total_word_box_sec smaill_font'>20</div>
            </div>

            <div className='each_cetagory_box for_quiz_category' onClick={() => handleChoice(audioGroup)}>
                <div className='ceagory_name_and_si smaill_font'>AUDIO BASED</div>
                <div className='total_word_box_sec smaill_font'>{audioGroup.length > 0 ? audioGroup.length : 0}</div>
            </div>
            <div className='each_cetagory_box' onClick={() => handleChoice("picture")}>
                <div className='ceagory_name_and_si smaill_font'>PICTURE BASED</div>
                <div className='total_word_box_sec smaill_font'>20</div>
            </div>
        </div>
    )
}
