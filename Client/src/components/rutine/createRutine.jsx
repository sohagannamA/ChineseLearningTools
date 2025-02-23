import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
export default function CreateRutine({setClick}) {
  
    const [selectSemester, setSelectSemester] = useState(null);
    const [selectDay, setSelectDay] = useState(null);
    const semesterOption = [
        { value: "First Semester", label: "First Semester" },
        { value: "Second Semester", label: "Second Semester" },
        { value: "Third Semester", label: "Third Semester" },
        { value: "Fourth Semester", label: "Fourth Semester" },
        { value: "Fifth Semester", label: "Fifth Semester" },
        { value: "Sixth Semester", label: "Sixth Semester" },
        { value: "Seventh Semester", label: "Seventh Semester" },
        { value: "Eighth Semester", label: "Eighth Semester" }

    ]
    const DayOption = [
        { value: "Saturday", label: "Saturday" },
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
    ];

    const handlesemesterChange = (option) => {
        setSelectSemester(option)
    }
    const handlesDayChange = (option) => {
        setSelectDay(option)
    }

    const closeAddRutine=()=>{
        setClick(false);
    }
    return (
        <div className="bluer semester_bluer">
            <div className="create_study_plan_box_sec">
                <div className="study_plan_box add_rutine_box">
                    <div className="study_plan_box_nav">
                        <div className="study_plan_left">Class Schedule</div>
                        <div className="study_plan_right">
                            <div className="study_created_close_box" onClick={closeAddRutine}>
                                <IoClose className="close_icon"></IoClose>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={""}>
                        <div className="study_plan_user_section">
                            <div className="each_user_study_user_inp each_inp_add_rutin">
                                <Select
                                    value={selectSemester}
                                    onChange={handlesemesterChange}
                                    options={semesterOption}
                                    placeholder="Select Semester"
                                    className="custom-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                            <div className="each_user_study_user_inp each_inp_add_rutin">
                                <Select
                                    placeholder="Select Subject"
                                    className="custom-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                            <div className="each_user_study_user_inp each_inp_add_rutin">
                                <Select
                                    value={selectDay}
                                    onChange={handlesDayChange}
                                    options={DayOption}
                                    placeholder="Select Day"
                                    className="custom-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                            <div className="each_user_study_user_inp each_inp_add_rutin">
                                <input
                                    type="time"
                                    placeholder="Class start time"
                                    className="study_name_user"
                                    required
                                />
                            </div>
                            <div className="each_user_study_user_inp each_inp_add_rutin">
                                <input
                                    type="time"
                                    placeholder="Class end time"
                                    className="study_name_user"
                                    required
                                />
                            </div>
                            <div className="each_user_study_user_inp each_inp_add_rutin">
                                <input
                                    type="text"
                                    placeholder="Teacher's name"
                                    className="study_name_user"
                                    required
                                />
                            </div>
                            <div className="each_user_study_user_inp each_inp_add_rutin">
                                <input
                                    type="text"
                                    placeholder="Class Building No"
                                    className="study_name_user"
                                    required
                                />
                            </div>
                            <div className="each_user_study_user_inp each_inp_add_rutin">
                                <input
                                    type="text"
                                    placeholder="Class room No"
                                    className="study_name_user"
                                    required
                                />
                            </div>
                            <div className="create_button">
                                <button type="submit" className="create_btn">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}