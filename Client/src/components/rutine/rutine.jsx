import "./rutine.css"
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import EachRutine from "./eachRutine";
import RutinData from "./rutine.json"
import CreateRutine from "./createRutine";
import { useState } from "react";
export default function Rutine() {
    const [click, setClick] = useState(false)
    const handleAdd = () => {
        setClick(true);
    }
    return (
        <div className="dialogue_home_section each_components">
            {click?<CreateRutine setClick={setClick} />:""}
            <div className="max-width">
                <div className="created_main_section rutine_section">
                    <div className="created_left_sec">
                        <div className="created_logo_title">My class rutine</div>
                    </div>
                    <div className="create_new_plan_box_sec">
                        <div className="create_new_plan_box" onClick={handleAdd}>
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
                        <div className="rutine_each_section">
                            <div className="day_section">
                                <div className="each_day">
                                    <div className="set_day">Saturday</div>
                                    <div className="each_day_data">
                                        {RutinData.map((data) =>
                                            data.day === "Saturday" && (
                                                <EachRutine
                                                    key={data.id}
                                                    startamp={data.startamp}
                                                    endamp={data.endamp}
                                                    day={data.day}
                                                    subject={data.subject}
                                                    start={data.start}
                                                    end={data.end}
                                                    teachername={data.teachername}
                                                    roomno={data.roomno}
                                                />
                                            )
                                        )}
                                    </div>
                                    <div className="set_day">Sunday</div>
                                    <div className="each_day_data">
                                        {RutinData.map((data) =>
                                            data.day === "Sunday" && (
                                                <EachRutine
                                                    key={data.id}
                                                    startamp={data.startamp}
                                                    endamp={data.endamp}
                                                    day={data.day}
                                                    subject={data.subject}
                                                    start={data.start}
                                                    end={data.end}
                                                    teachername={data.teachername}
                                                    roomno={data.roomno}
                                                />
                                            )
                                        )}
                                    </div>
                                    <div className="set_day">Monday</div>
                                    <div className="each_day_data">
                                        {RutinData.map((data) =>
                                            data.day === "Monday" && (
                                                <EachRutine
                                                    key={data.id}
                                                    startamp={data.startamp}
                                                    endamp={data.endamp}
                                                    day={data.day}
                                                    subject={data.subject}
                                                    start={data.start}
                                                    end={data.end}
                                                    teachername={data.teachername}
                                                    roomno={data.roomno}
                                                />
                                            )
                                        )}
                                    </div>
                                    <div className="set_day">Tuesday</div>
                                    <div className="each_day_data">
                                        {RutinData.map((data) =>
                                            data.day === "Tuesday" && (
                                                <EachRutine
                                                    key={data.id}
                                                    startamp={data.startamp}
                                                    endamp={data.endamp}
                                                    day={data.day}
                                                    subject={data.subject}
                                                    start={data.start}
                                                    end={data.end}
                                                    teachername={data.teachername}
                                                    roomno={data.roomno}
                                                />
                                            )
                                        )}
                                    </div>
                                    <div className="set_day">Wednesday</div>
                                    <div className="each_day_data">
                                        {RutinData.map((data) =>
                                            data.day === "Wednesday" && (
                                                <EachRutine
                                                    key={data.id}
                                                    startamp={data.startamp}
                                                    endamp={data.endamp}
                                                    day={data.day}
                                                    subject={data.subject}
                                                    start={data.start}
                                                    end={data.end}
                                                    teachername={data.teachername}
                                                    roomno={data.roomno}
                                                />
                                            )
                                        )}
                                    </div>
                                    <div className="set_day">Thursday</div>
                                    <div className="each_day_data">
                                        {RutinData.map((data) =>
                                            data.day === "Thursday" && (
                                                <EachRutine
                                                    key={data.id}
                                                    startamp={data.startamp}
                                                    endamp={data.endamp}
                                                    day={data.day}
                                                    subject={data.subject}
                                                    start={data.start}
                                                    end={data.end}
                                                    teachername={data.teachername}
                                                    roomno={data.roomno}
                                                />
                                            )
                                        )}
                                    </div>
                                    <div className="set_day">Friday</div>
                                    <div className="each_day_data">
                                        {RutinData.map((data) =>
                                            data.day === "Friday" && (
                                                <EachRutine
                                                    key={data.id}
                                                    startamp={data.startamp}
                                                    endamp={data.endamp}
                                                    day={data.day}
                                                    subject={data.subject}
                                                    start={data.start}
                                                    end={data.end}
                                                    teachername={data.teachername}
                                                    roomno={data.roomno}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}