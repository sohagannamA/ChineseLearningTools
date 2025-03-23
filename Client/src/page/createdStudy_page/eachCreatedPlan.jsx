import axios from "axios";
import "./createdStudyPage.css"
import { NavLink, useNavigate } from "react-router-dom"
import authService from "../../service/authService";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function EachPlan(props) {
    const { createdId, eachweek, createdAt, learningtitle, learningdescription, getCreatedStudyPlan } = props;
    const formattedDate = new Date(createdAt).toLocaleDateString()
    const token = authService.getToken();
    const [deletedId, setDeletedId] = useState("")
    const navigate = useNavigate();
    const [showmainpopup, setshowmainpopup] = useState(false);
    const [deleteOrNot, setDeleteorNot] = useState(false);
    const logStringConcate = (text,limit) => {
        if (text.length > limit) {
            return text.substring(0, limit);
        }
        return text;
    }
    const getDeletedId = (id) => {
        setDeletedId(id);
        setshowmainpopup(true);
    }
    const deleteSuccess = async () => {
        try {
            const response = await axios.delete(`https://chineselearningtools-2.onrender.com/deleteWeekPlan/${deletedId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDeleteorNot(true);

        }
        catch (error) {
            if (error.response) {
                console.error('Error Status:', error.response.status);
                console.error('Error Data:', error.response.data);
            } else if (error.request) {
                console.error('Error Request:', error.request);
            } else {
                console.error('Error Message:', error.message);
            }
        }
    }


    const handleCancel = () => {
        setshowmainpopup(false);
        getCreatedStudyPlan();
        setDeletedId("")
    }
    const handleLearningDec=(createdId)=>{
        navigate(`/all_created/${createdId}`);
    }
    return (
        <div>
            {showmainpopup ? <div className="deleted_message_sec">
                <div className="deleted_and_success">
                    {deleteOrNot ? <div className="deleted_study_message_box">
                        <div className="deleted_study_message_box_data">
                            <div className="warning_icon"><IoMdCheckmarkCircle className="success" /></div>
                            <div className="deleted_success">Deleted!</div>
                            <div className="warning_message">Your week's plan has been deleted successfully</div>
                            <div className="classfor_dileted_action">
                                <button type="button" className="action_btn" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div> : <div className="deleted_study_message_box">
                        <div className="deleted_study_message_box_data">
                            <div className="warning_icon"><IoWarning className="warning" /></div>
                            <div className="warning_message">Are you sure you want to delete this week's plan?</div>
                            <div className="classfor_dileted_action">
                                <button type="button" className="action_btn" onClick={handleCancel}>Cancel</button>
                                <button type="button" className="delete_btn_plans" onClick={deleteSuccess}>Delete</button>
                            </div>
                        </div>
                    </div>}

                </div>
            </div> : ""}

            <div>
                <div className="each_plan">
                    <div className="each_plan_data">
                        <div className="each_paln_nav">
                            <div className="day">Week {eachweek}</div>
                            <div className="total_wors_sec">
                                <div className="total_word_count">12</div>
                            </div>
                        </div>
                        <div className="created_date">{formattedDate}</div>
                        <div className="title">{logStringConcate(learningtitle,30)} ...</div>
                        <div className="dis">{logStringConcate(learningdescription,60)}... <NavLink to={`/all_created/${createdId}`}><span className="more_btn">More</span></NavLink></div>
                        <div className="delete_topic_btn">
                            <button type="submit" className="deleted_topic" onClick={(e) => handleLearningDec(createdId)}>Add Items</button>
                            <button type="submit" className="deleted_topic" onClick={(e) => getDeletedId(createdId)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
