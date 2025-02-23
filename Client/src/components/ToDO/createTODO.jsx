import { IoMdClose } from "react-icons/io";
import "./todo.css";
import { useEffect, useState } from "react";
export default function CreateTODO({setClick}) {
    const [date, setdate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }));


    const handleSubmit = () => {

    }
    const handleClose = () => {
        setClick(false)
    }

    const handleDateChange = (e) => {
        setdate(e.target.value)
    }
    const handleTime = (e) => {
        settime(e.target.value);
    }
    return (
        <div className="bluer todobluer">
            <div className="create_study_plan_box_sec">
                <div className="study_plan_box">
                    <div className="study_plan_box_nav">
                        <div className="study_plan_left">Create TODO</div>
                        <div className="study_plan_right">
                            <div className="study_created_close_box" onClick={handleClose}>
                                <IoMdClose className="close_icon"></IoMdClose>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="study_plan_user_section">
                            <div className="each_user_study_user_inp todo_input_field">
                                <input
                                    type="text"
                                    placeholder="Todo title"
                                    className="study_name_user"
                                    required
                                />
                            </div>
                            <div className="each_user_study_user_inp todo_input_field">
                                <input
                                    type="date"
                                    placeholder="Todo title"
                                    className="study_name_user"
                                    value={date}
                                    onChange={handleDateChange}
                                    required
                                />
                            </div>
                            <div className="each_user_study_user_inp">
                                <input
                                    type="time"
                                    placeholder="Todo title"
                                    className="study_name_user"
                                    value={time}
                                    onChange={handleTime}
                                    required
                                />
                            </div>
                            <div className="create_button">
                                <button type="submit" className="create_btn">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}