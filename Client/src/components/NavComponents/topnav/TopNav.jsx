import "./TopNav.css"
import { IoMdAdd } from "react-icons/io";
import { NavLink } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { CgMenuGridO } from "react-icons/cg";
import { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdSpeakerNotes } from "react-icons/md";
import { SiExcalidraw } from "react-icons/si";
export default function TopNav({ handleclick }) {
    const [clickmenu, setClickMenu] = useState(false);
    const handleMenu = () => {
        setClickMenu(true);
    }
    const handleClosemenu = () => {
        setClickMenu(false);
    }
    return (
        <div className="nav_container">
            {clickmenu ?
                <div className="nav_menu_section">
                    <div className="max-width">
                        <NavLink to="/mytodo/">
                            <div className="each_menue_box">
                                <LuListTodo className="nav_link_icon menu_icon" />
                                <div className="menu_name_title">
                                    <p className="menuName">TODO</p>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to="/rutine/">
                            <div className="each_menue_box">
                                <SlCalender className="nav_link_icon menu_icon" />
                                <div className="menu_name_title">
                                    <p className="menuName">UNI RUTINE</p>
                                </div>
                            </div>
                        </NavLink>
                        <div className="each_menue_box">
                            <MdSpeakerNotes className="nav_link_icon menu_icon" />
                            <div className="menu_name_title">
                                <p className="menuName">UNI DAIRY</p>
                            </div>
                        </div>
                        <NavLink to="/draw">
                            <div className="each_menue_box">
                                <SiExcalidraw className="nav_link_icon menu_icon" />
                                <div className="menu_name_title">
                                    <p className="menuName">DRAW</p>
                                </div>
                            </div>
                        </NavLink>
                        <div className="each_menue_box close_box" onClick={handleClosemenu}>
                            <IoMdClose className="nav_link_icon" />
                        </div>
                    </div>
                </div> : ""}
            <div className="max-width">
                <div className="logo_section">MyNotes</div>
                <div className="left_nav_nav">
                    <div className="link_image_box">
                        <NavLink to="#">
                            <div className="each_link_image_box" onClick={handleMenu}>
                                <CgMenuGridO className="nav_link_icon" />
                            </div>
                        </NavLink>
                        <NavLink to="#">
                            <div className="each_link_image_box">
                                <GoBell className="nav_link_icon" />
                            </div>
                        </NavLink>
                        <NavLink to="#">
                            <div className="each_link_image_box">
                                <FaUser className="nav_link_icon profile_icon" />
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}