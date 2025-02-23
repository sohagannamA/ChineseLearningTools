import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
export default function CreateSemester({isClick}) {
    const [selectSemester, setSelectSemester] = useState(null);
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
    const handlesemesterChange=(option)=>{
        setSelectSemester(option)
    }
    const closeAddSemester=()=>{
        isClick(false);
    }
    return (
        <div className="bluer semester_bluer">
            <div className="create_study_plan_box_sec">
                <div className="study_plan_box">
                    <div className="study_plan_box_nav">
                        <div className="study_plan_left">Add new semester</div>
                        <div className="study_plan_right">
                            <div className="study_created_close_box" onClick={closeAddSemester}>
                                <IoClose className="close_icon"></IoClose>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={""}>
                        <div className="study_plan_user_section">
                            <div className="each_user_study_user_inp">
                                <Select
                                    value={selectSemester}
                                    onChange={handlesemesterChange}
                                    options={semesterOption}
                                    placeholder="Select Semester"
                                    className="custom-select-container"
                                    classNamePrefix="react-select"
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