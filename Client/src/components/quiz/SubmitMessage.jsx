import React, { useState } from 'react'
import "./submitmessage.css"
import { useNavigate } from 'react-router-dom';
import { IoWarning } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
export default function SubmitMessage(props) {
    const navigate = useNavigate();
    const { countData, setSubmit, questionsGroup, selectedOptions } = props;
    const [successsubmit, setsuccessSubmit] = useState(false);
    const [isshowresult, setShowResult] = useState(false);
    const [totalscor, settotalCount] = useState(0);


    const handleSubmit = () => {
        setsuccessSubmit(true)
    }
    const handleCancel = () => {
        setSubmit(false)
    }


    const [myquestions, setmyquestions] = useState();
    const selectedIds = Object.keys(selectedOptions).map(id => Number(id));
    console.log(selectedIds);
    const handleShowRes = () => {
        let countScore = 0;
        const findMyQuestions = questionsGroup.filter(question => selectedIds.includes(question.id));
        questionsGroup.forEach((questions) => {
            if (selectedOptions[questions.id] === questions.correct_answer) {
                countScore++;
            }
        });
        settotalCount(countScore);
        setShowResult(true)
        setmyquestions(findMyQuestions);
    }
    function chineseExamFeedback(average) {
        let message = "";

        // Feedback based on average score
        if (average >= 90) {
            message = "Excellent! Keep it up!";
        } else if (average >= 80) {
            message = "Great job! Well done!";
        } else if (average >= 70) {
            message = "Good work! Keep practicing.";
        } else if (average >= 50) {
            message = "You're improving, but more practice is needed.";
        } else {
            message = "Keep practicing the basics.";
        }

        return message;
    }

    return (
        <div className='submit_message_container'>
            {isshowresult ? <div className='result_sections_box'>
                <div className='result_sec_nav'>
                    <div className='you_got_message'>YOU GOT <span className='you_got'>{totalscor} </span>OUT OF <span className='total_marks'>{countData}</span></div>
                    <div className='you_got_sub_data'>
                        <div className='each_result_field'>
                            <div className='result_left_field'>Right: </div>
                            <div className='right_field_result'>{totalscor}</div>
                        </div>
                        <div className='each_result_field'>
                            <div className='result_left_field'>Wrong: </div>
                            <div className='right_field_result'>{countData - totalscor}</div>
                        </div>
                        <div className='each_result_field'>
                            <div className='result_left_field'>Average: </div>
                            <div className='right_field_result'>{((totalscor / countData) * 100).toFixed(0)}%</div>
                        </div>
                        <div className='each_result_field'>
                            <div className='result_left_field'>Teachers Message: </div>
                            <div className='right_field_result'>{chineseExamFeedback(((totalscor / countData) * 100).toFixed(0))}</div>
                        </div>
                    </div>
                </div>
                <div className='your_questions_list_sec'>
                    {myquestions && myquestions.map((question, index) => {
                        const userChoice = selectedOptions[question.id]; // ব্যবহারকারীর পছন্দ
                        const isCurrect = userChoice === question.correct_answer; // সঠিক উত্তর
                        return (
                            <div className='each_questions_sec' key={question.id}>
                                <div className='question_name'>{index + 1}. {question.question}</div>

                                {/* যদি ব্যবহারকারীর পছন্দ সঠিক না হয়, তাহলে লাল রঙে দেখানো হবে */}
                                {!isCurrect && (
                                    <div className="red">
                                        {question.choices.map(choice => {
                                            // যদি প্রশ্নের অপশনটি ব্যবহারকারীর পছন্দের সাথে মেলে, তাহলে তা দেখানো হবে
                                            if (choice.option === userChoice) {
                                                return <div key={choice.option}>{choice.option}. {choice.answer}</div>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                )}

                                {/* সঠিক উত্তর সবসময় নীল রঙে দেখানো হবে */}
                                <div className='you_choice system_choice'>
                                    {question.choices.map(choice => {
                                        if (choice.option === question.correct_answer) {
                                            return <div key={choice.option}>{choice.option}. {choice.answer}</div>;
                                        }
                                        return null;
                                    })}
                                </div>

                                {/* ব্যাখ্যা দেখানো হবে */}
                                <div className='you_choice'>{question.explanation}</div>
                            </div>
                        );
                    })}
                </div>
                <div className='back_to_home_sec'>
                    <button className='back_btn' onClick={() => navigate("/flashcard")}>Back</button>
                </div>
            </div> : <div className='submit_message_box'>
                <div className="deleted_study_message_box">
                    <div className="deleted_study_message_box_data">
                        {successsubmit ? <div className="deleted_study_message_box">
                            <div className="deleted_study_message_box_data">
                                <div className="warning_icon"><IoMdCheckmarkCircle className="success" /></div>
                                <div className="deleted_success">Submitted</div>
                                <div className="warning_message">Your question has been successfully submitted</div>
                                <div className="classfor_dileted_action">
                                    <button type="button" className="show_btn_result" onClick={handleShowRes}>Show Result</button>
                                </div>
                            </div>
                        </div> : <div>
                            <div className="warning_icon"><IoWarning className="warning" /></div>
                            <div className="warning_message">Are you sure you want to submit your questions</div>
                            <div className="classfor_dileted_action">
                                <button type="button" className="action_btn" onClick={handleCancel}>Cancel</button>
                                <button type="button" className="delete_btn_plans" onClick={handleSubmit}>Submit</button>
                            </div></div>}
                    </div>
                </div>
            </div>}

        </div>
    )
}
