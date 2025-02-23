import React, { useEffect, useState } from 'react'
import "./mcqStyle.css";
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import SubmitMessage from './SubmitMessage';
export default function MCQ(props) {
    const navigate = useNavigate();
    const { questionsGroup, countData } = props
    const [page, satePage] = useState(0);

    const perPageQuestion = 1;
    const totalPages = Math.ceil(countData / perPageQuestion);
    const currentquestion = questionsGroup[page];

    const [issubmit, setSubmit] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState({});
    const handlePreviousPage = () => {
        if (page === 0) {
            satePage(totalPages - 1)
        }
        else {
            satePage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (page === countData - 1) {
            satePage(0);
        }
        else {
            satePage(page + 1)
        }
    }
    const [showsubmit, setShowSubmit] = useState(false)
    const questionsOptions = (userChoiceData) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [userChoiceData.questionsId]: userChoiceData.selectOptions,
        }));
    };
    useEffect(() => {
        let length = Object.keys(selectedOptions).length;
        if (length === parseInt(countData)) {
            setShowSubmit(true);
            console.log("check");
        }
    }, [selectedOptions]);

    const submitClick = () => {
        setSubmit(true);
    }
    return (
        <div className='submit_and_MCQ_container'>
            {issubmit && (
                <SubmitMessage countData={countData} setSubmit={setSubmit} questionsGroup={questionsGroup} selectedOptions={selectedOptions} />
            )}
            <div className='mcqQuestionContainer'>
                <div className='question_data'>
                    <div className='question_name_sec'>{currentquestion.question}</div>

                    <div className='option_value_sec'>
                        {currentquestion.choices.map((optiondata) => (
                            <div
                                key={optiondata.option}
                                className={`each_option_data ${selectedOptions[currentquestion.id] === optiondata.option ? "selected" : ""}`}
                                onClick={() => questionsOptions({ questionsId: currentquestion.id, selectOptions: optiondata.option })}
                            >
                                <span className='option_serial'>{optiondata.option}. </span>
                                {optiondata.answer}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='questions_controll'>
                    <div className='flash_card_left_and_right'>
                        <FiArrowLeft className='side_icon' onClick={handlePreviousPage} />
                        <p className='flash_card_word_count'>{page + 1} / {totalPages}</p>
                        <FiArrowRight className='side_icon' onClick={handleNextPage} />
                    </div>

                    <div className='back_btn_sec'>
                        <button className='view_btn' onClick={() => navigate("/flashcard")}>Back</button>
                        {showsubmit ? <button className='view_btn next_btn' onClick={submitClick}>Submit</button> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}
