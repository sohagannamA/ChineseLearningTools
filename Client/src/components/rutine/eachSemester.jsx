import { MdDelete } from "react-icons/md";
import { BiMessageAltEdit } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoBookSharp } from "react-icons/io5";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function EachSemester({handleShowAddBook}) {
    const [clicked, setClick] = useState(false)
    const handleShowBook = () => {
        setClick(true);
    }
    const handleCloseBook = () => {
        setClick(false);
    }
    return (
        <div>
        
            <div className="each_plan each_subject_relative">
                {clicked?<div className="each_subject_show_sec">
                    <div className="close_subject_list">
                        <div className="close_subject_list_icon_box" onClick={handleCloseBook}>
                            <IoClose className="icon_conAction" />
                        </div>
                    </div>
                    <div className="subject_list_sec">
                        <p className="subject_catTitle">Major Subject</p>
                        <div className="major_subject">
                            <p className="each_subject">Programming in C</p>
                            <p className="each_subject">Computer Application</p>
                            <p className="each_subject">Math</p>
                        </div>
                        <p className="subject_catTitle">Non Major Subject</p>
                        <div className="nonmajor_subject">
                            <p className="each_subject">English</p>
                            <p className="each_subject">Chemistry</p>
                            <p className="each_subject">Chinese</p>
                        </div>
                    </div>
                </div>:""}
                
                <div className="each_plan_data get_each_conversation">
                    <div className="categories border_bottom">First Semester</div>
                    <div className="title total_subject">Total Subjects: 8</div>
                    <div className="title total_subject">Major Subjects: 5</div>
                    <div className="title total_subject">Non Major Subjects: 3</div>

                    <div className="conversation_action_btn">
                        <div className="conversationAction_each_box">
                            <MdDelete className="icon_conAction" />
                        </div>
                        <div className="conversationAction_each_box">
                            <BiMessageAltEdit className="icon_conAction" />
                        </div>
                        <div className="conversationAction_each_box"onClick={handleShowAddBook}>
                            <IoMdAdd className="icon_conAction" />
                        </div>
                        <div className="conversationAction_each_box" onClick={handleShowBook}>
                            <IoBookSharp className="icon_conAction" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}