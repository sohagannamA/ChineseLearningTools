import { useEffect, useState } from "react";
import axios from "axios";
import "./create_study_plan.css"
import { IoMdClose } from "react-icons/io";
import authService from "../../service/authService";
export default function AppCreateStudyPlan({fatchData,setclick}) {
    // const [eachweek, seteachweek] = useState(1);
    const [learningtitle, setlearningtitle] = useState("");
    const [learningdescription, setlearningdescription] = useState("");
    const [message, setMessage] = useState("");
    const token = authService.getToken();
    const [findweek, setweek] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://chineselearningtools-2.onrender.com/learningCreate",
                {
                    learningtitle,
                    learningdescription
                },  // Data goes here
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Headers go here
                    },
                }
            );
            if (response) {
                getCreatedStudyPlan();
                fatchData();
            }
            setlearningtitle("");
            setlearningdescription("")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong. Please try again later.");
            }
        }
    }
    const getCreatedStudyPlan = async () => {
        try {
            const response = await axios.get("https://chineselearningtools-2.onrender.com/getlearningCreate", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // setweek(response.data.length+1);
            if (response.data.length > 0) {
              const currentPlan=response.data[response.data.length-1].eachweek;
                const integerValue = parseInt(currentPlan);
                setweek(integerValue + 1);
            }
            else {
                setweek(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCreatedStudyPlan();
    }, []);

    const handleClose=()=>{
        setclick(false)
    }
    return (
        <div className="bluer">
            <div className="create_study_plan_box_sec">
                <div className="study_plan_box">
                    <div className="study_plan_box_nav">
                        <div className="study_plan_left">Create Week Plan</div>
                        <div className="study_plan_right">
                            <div className="study_created_close_box" onClick={handleClose}>
                                <IoMdClose className="close_icon"></IoMdClose>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="study_plan_user_section">
                            {message && (<div className="errorMessage">{message}</div>)}
                            <div className="each_user_study_user_inp eachweek_flex_box">
                                <div className="each_setup_mid">
                                    <input
                                        type="text"
                                        className="each_week_user"
                                        value={findweek}
                                        readOnly
                                    />
                                </div>
                                <div className="week_big_set">
                                    Week learning plan
                                </div>
                            </div>
                            <div className="each_user_study_user_inp">
                                <input
                                    type="text"
                                    placeholder="Learning title"
                                    className="study_name_user"
                                    onChange={(e) => setlearningtitle(e.target.value)}
                                    required
                                    value={learningtitle}
                                />
                            </div>
                            <div className="each_user_study_user_inp">
                                <textarea
                                    placeholder="Learning topic explian"
                                    className="study_created_explian_user"
                                    onChange={(e) => setlearningdescription(e.target.value)}
                                    required
                                    value={learningdescription}
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
