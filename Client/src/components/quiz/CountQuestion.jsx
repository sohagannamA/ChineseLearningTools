import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function CountQuestion(props) {
    const { passCountData, maxcount } = props
    const navigate = useNavigate();
    const [iserror, seterror] = useState(false);
    const [countvalue, setCountValue] = useState();
    const handleChange = (countdata) => {
        if (countdata <= 0 || countdata > maxcount || 3 > countdata) {
            seterror(true);
            setCountValue();
        }
        else {
            setCountValue(countdata);
            seterror(false);
        }
    }
    return (
        <div className='countquestions_sec'>
            <div className='count_questions_boxmain'>
                <p className='title_for_count'>How many questions you need</p>
                <div className='user_input_sec'>
                    <input
                        type='number'
                        placeholder={`Max limit ${maxcount}. Min limit 3`}
                        className={iserror ? "user_count_question for_error_class" : "user_count_question"}
                        value={countvalue && (
                            countvalue
                        )}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <div className='controll_count_questions'>
                        <button className='view_btn' onClick={() => {navigate("/flashcard") }}>Back</button>
                        {countvalue && (
                            <button className='view_btn next_btn' onClick={() => passCountData(countvalue)}>Next</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
