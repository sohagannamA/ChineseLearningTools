import { MdDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { useEffect, useState } from "react";

const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const currenttime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    return currenttime;
}

export default function EachRutine(props) {
    const [runningClass, setRunningClass] = useState(false);
    const [currenttime, setCurrentTime] = useState(getCurrentTime());
    const [completed, setIsCompleted] = useState(false);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentday = days[new Date().getDay()];

    const { subject, day, start, end, startamp, endamp, teachername, roomno } = props;
    const startTime = start + " " + startamp;
    const endingTime = end + " " + endamp;
    const formatTimeWithoutSeconds = (time) => {
        return time.slice(0, 5); // "HH:mm:ss" থেকে "HH:mm" বের করে আনা
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime()); // প্রতি সেকেন্ডে currenttime আপডেট হচ্ছে
        }, 1000); // ১ সেকেন্ড পর পর currenttime আপডেট

        return () => clearInterval(interval); // কম্পোনেন্ট আনমাউন্ট হলে ইন্টারভ্যাল ক্লিয়ার হচ্ছে
    }, []);

    useEffect(() => {
        const classTimeDela = () => {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();
            const ampm = currentHours >= 12 ? 'PM' : 'AM';
            const currentTimeFormatted = formatTimeWithoutSeconds(currenttime) + " " + ampm;

            // ক্লাস শুরু এবং শেষের সময় চেক করা হচ্ছে
            const isClassStarted = currentday === day && currentTimeFormatted >= startTime;
            const isClassEnded = currentday === day && currentTimeFormatted >= endingTime;

            // শুরুর সময় থেকে শেষের সময় পর্যন্ত ক্লাস চলবে
            if (isClassStarted && !isClassEnded) {
                setRunningClass(true);
                setIsCompleted(false);
            }
            // ক্লাস শেষ হলে
            else if (isClassEnded) {
                setRunningClass(false);
                setIsCompleted(true);
            }
            // ক্লাস শুরু হয়নি বা চলছে না
            else {
                setRunningClass(false);
                setIsCompleted(false);
            }
        };

        classTimeDela();
    }, [currenttime, startTime, endingTime, currentday, day]);

    useEffect(() => {
        const checkDayChange = () => {
            const now = new Date();
            const today = now.toLocaleDateString("en-US", { weekday: 'long' }); // বর্তমান দিন
            console.log(today);
            // যদি বর্তমান দিন পরিবর্তিত হয়
            if (today !== currentday) {
                setIsCompleted(false);
                setRunningClass(false);
            }
        };

        // প্রতি মিনিটে দিন পরিবর্তন চেক করা হচ্ছে
        const intervalId = setInterval(checkDayChange, 60000);

        // পরিষ্কার করার জন্য interval বন্ধ করা
        return () => clearInterval(intervalId);
    }, [currentday]);


    return (
        <div>
            {/* <div className={day === currentday ? "each_plan each_rutine_box" : "each_plan"}> */}
            <div className={day === currentday ? (completed ? "each_plan class_completed" : "each_plan each_rutine_box") : "each_plan"}>
                <div className="each_plan_data">
                    <div className="categories border_bottom">{subject}</div>
                    <div className="class_duration">
                        <div className="rutine_timer">{startTime}</div>
                        <div className="to">to</div>
                        <div className="rutine_timer">{endingTime}</div>
                    </div>
                    <div className="teacher_name">{teachername}</div>
                    <div className="class_room">{roomno}</div>

                    <div className="conversation_action_btn rutine_action_btn">
                        <div className="seaction_left_rutineAction">
                            <div className="conversationAction_each_box">
                                <MdEditNote className="icon_conAction" />
                            </div>
                            <div className="conversationAction_each_box">
                                <MdDelete className="icon_conAction" />
                            </div>
                        </div>
                        {runningClass ? <div className="section_right_rutineAction">
                            <div className="active_ball_section">
                                <div className="active_ball">{completed}</div>
                            </div>
                        </div> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}