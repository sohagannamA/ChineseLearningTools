import "./leftnav.css";
import { AiFillHome } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { RiTodoFill } from "react-icons/ri";
import { FaBookOpenReader } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { FaBookmark } from "react-icons/fa";
import { IoMdCard } from "react-icons/io";
import { RiListView } from "react-icons/ri";

export default function LeftNav() {
    return (
        <div className="left_nav_container">
            <div className="left_nav_logo_sec">
                <div className="left_nav_logo">
                    <div className="left_nav_logo_title">STUTODO</div>
                </div>
            </div>
            <div className="all_left_nav_link_sec">
                <NavLink to="/">
                    <div className="each__left_link_sec">
                        <div className="each_link_left">
                            <div className="left_link_icon_sec">
                                <AiFillHome className="left_icon_link" />
                            </div>
                        </div>
                        <div className="each_link_right">
                            <div className="left_link_icon_name">Home</div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/all_created">
                    <div className="each__left_link_sec">
                        <div className="each_link_left">
                            <div className="left_link_icon_sec">
                                <RiTodoFill className="left_icon_link" />
                            </div>
                        </div>
                        <div className="each_link_right">
                            <div className="left_link_icon_name">Created Study</div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/flashcard">
                    <div className="each__left_link_sec">
                        <div className="each_link_left">
                            <div className="left_link_icon_sec">
                                <IoMdCard className="left_icon_link" />
                            </div>
                        </div>
                        <div className="each_link_right">
                            <div className="left_link_icon_name">Flashcard</div>
                        </div>
                    </div>
                </NavLink>

               

                <NavLink to="/bookmark">
                    <div className="each__left_link_sec">
                        <div className="each_link_left">
                            <div className="left_link_icon_sec">
                                <FaBookmark className="left_icon_link" />
                            </div>
                        </div>
                        <div className="each_link_right">
                            <div className="left_link_icon_name">Bookmark</div>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="#">
                    <div className="each__left_link_sec">
                        <div className="each_link_left">
                            <div className="left_link_icon_sec">
                                <FaBookOpenReader className="left_icon_link" />
                            </div>
                        </div>
                        <div className="each_link_right">
                            <div className="left_link_icon_name">Homonyns Word</div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="#">
                    <div className="each__left_link_sec">
                        <div className="each_link_left">
                            <div className="left_link_icon_sec">
                                <ImProfile className="left_icon_link" />
                            </div>
                        </div>
                        <div className="each_link_right">
                            <div className="left_link_icon_name">Profile</div>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}