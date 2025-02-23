import { MdDelete } from "react-icons/md";
import { BiMessageAltEdit } from "react-icons/bi";
import { useState } from "react";
export default function EachTODO() {
    const [isChecked, setIsChecked] =useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    return (
        <div>
            <div className="each_plan todo_list_each_data">
                <div className="each_plan_data each_plan_section_todo">
                    <div className="check_box_sec">
                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <div className="title_and_date_sec">
                            <div className="categories todo_title close_this_todo">Introduction and Greetings</div>
                            <div className="date_todo after_comtodo">5:12 PM. 25/10/2024</div>
                        </div>
                    </div>

                    <div className="edit_and_updateSection">
                        <div className="todo_action_each_box">
                            <MdDelete className="todo_icon" />
                        </div>
                        <div className="todo_action_each_box">
                            <BiMessageAltEdit className="todo_icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}