import EachTODO from "./eachTODO";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import "./todo.css"
import CreateTODO from "./createTODO";
import { useState } from "react";
export default function TODO() {
    const[click,setClick]=useState(false);
    const handleShowTodo=()=>{
        setClick(true);
    }
    return (
        <div className="dialogue_title_sec each_components">
            {click?<CreateTODO setClick={setClick} />:""}
            <div className="max-width">
                <div className="created_main_section">
                    <div className="created_left_sec">
                        <div className="created_logo_title">Total Items:40</div>
                    </div>
                    <div className="created_right_sec">
                        <div className="each_plan_search_box_sec">
                            <div className="search_box_left">
                                <input
                                    type="text"
                                    placeholder="Search Your TODO"
                                    className="created_search_plan"
                                />
                            </div>
                            <div className="search_box_right">
                                <IoSearch className="search_box_icon" />
                            </div>
                        </div>
                        <div className="create_new_plan_box_sec">
                            <div className="create_new_plan_box" onClick={handleShowTodo}>
                                <IoMdAdd className="plan_add_icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="each_dialogue_section each_todo_section">
                    <div className="each_dialogue_title">
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                        <EachTODO />
                    </div>
                </div>
            </div>
        </div>
    )
}