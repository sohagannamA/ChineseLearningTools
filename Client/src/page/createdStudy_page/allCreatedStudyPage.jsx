import "./createdStudyPage.css";
import { IoSearch } from "react-icons/io5";
import EachPlan from "./eachCreatedPlan";
import { useEffect, useState } from "react";
import authService from "../../service/authService";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";

import AppCreateStudyPlan from "../../components/CreateStudyPlan/create_study_plan";
export default function CreatedStudyPage() {
    const token = authService.getToken();
    const [studyplanData, setStudyplanData] = useState([]);
    const [Isclick, setclick] = useState(false);
    const getCreatedStudyPlan = async () => {
        try {
            const response = await axios.get("https://chineselearningtools-2.onrender.com/getlearningCreate", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.length > 0) {
                setStudyplanData(response.data);
            }
            else {
                setStudyplanData([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCreatedStudyPlan();
    }, []);

    const handleshow = () => {
        setclick(true);
    }



    return (
        <div className="each_components created_components_sec">

            {Isclick ? <AppCreateStudyPlan fatchData={getCreatedStudyPlan} setclick={setclick} /> : ""}
            <div className="max-width">
                <div className="created_main_section">
                    <div className="created_left_sec">
                        <div className="created_logo_title">Week Plans</div>
                    </div>
                    <div className="created_right_sec">
                        <div className="each_plan_search_box_sec">
                            <div className="search_box_left">
                                <input
                                    type="text"
                                    placeholder="Search Your Plans"
                                    className="created_search_plan"
                                />
                            </div>
                            <div className="search_box_right">
                                <IoSearch className="search_box_icon" />
                            </div>
                        </div>
                        <div className="create_new_plan_box_sec">
                            <div className="create_new_plan_box" onClick={handleshow}>
                                <IoMdAdd className="plan_add_icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="each_plan_section">
                    <div className="each_plan_list">
                        {studyplanData.map((data) => (
                            <EachPlan
                                key={data._id} // Ensure each item has a unique key
                                createdId={data._id}
                                eachweek={data.eachweek}
                                createdAt={data.createdAt}
                                learningtitle={data.learningtitle}
                                learningdescription={data.learningdescription}
                                getCreatedStudyPlan={getCreatedStudyPlan}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
