import { NavLink } from "react-router-dom"
import { IoMdAdd } from "react-icons/io";
import EachSemester from "./eachSemester";
import CreateSemester from "./createSemester";
import { useState } from "react";
import AddBook from "./addSubject";
export default function Semester() {
    const [clicked, isClick] = useState(false);
    const [showaddBook, isClickShowbook] =useState(false);
    const handleSemesterShow = () => {
        isClick(true);
    }
    const handleShowAddBook = () => {
        isClickShowbook(true);
    }
    return (
        <div className="dialogue_home_section each_components">
            {clicked ? <CreateSemester isClick={isClick} /> : ""}
            {showaddBook ? <AddBook isClickShowbook={isClickShowbook} /> : ""}
            <div className="max-width">
                <div className="created_main_section rutine_section">
                    <div className="created_left_sec">
                        <div className="created_logo_title">My class rutine</div>
                    </div>
                    <div className="create_new_plan_box_sec">
                        <div className="create_new_plan_box" onClick={handleSemesterShow}>
                            <IoMdAdd className="plan_add_icon" />
                        </div>
                    </div>
                </div>
                <div className="dialogue_section">
                    <div className="dialogue_nav_link_sec">
                        <div className="dialogue_nav_link">
                            <NavLink to="/rutine/" className="each_dialogue_nav_link">Class Schedule</NavLink>
                            <NavLink to="/addsemester/" className="each_dialogue_nav_link">Add Semester</NavLink>
                        </div>
                    </div>

                    <div className="each_conversiton_section">
                        <div className="semester_each_section">
                            <EachSemester handleShowAddBook={handleShowAddBook} />
                            <EachSemester />
                            <EachSemester />
                            <EachSemester />
                            <EachSemester />
                            <EachSemester />
                            <EachSemester />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}