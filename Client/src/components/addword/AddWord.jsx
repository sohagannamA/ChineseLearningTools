import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from "react-quill";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import "./addword.css";
import reactQuill from "../../service/reactQuill";
import SelecttextSpeak from "../../service/textspeak";
import authService from "../../service/authService";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function AddWord({ setClick, clicked }) {
    const [createdData, setCreatedData] = useState([]);
    const quillRef = useRef(null);
    const { id } = useParams(); // Extract id from URL params
    const token = authService.getToken();
    const userId = authService.getUserId();
    const synth = window.speechSynthesis;
    const voices = useRef([]);

    useEffect(() => {
        voices.current = synth.getVoices();
        synth.onvoiceschanged = () => {
            voices.current = synth.getVoices();
        };

        // Fetch created study plans when the component mounts
        getCreatedStudyPlan();
    }, []);

    const handleTextSelection = () => {
        const editor = quillRef.current.getEditor(); // Get the Quill editor instance
        const selection = editor.getSelection();
        if (synth.speaking) {
            synth.cancel(); // Stop speaking if currently speaking
        }

        if (selection && selection.length > 0) {
            const selectedText = editor.getText(selection.index, selection.length);
            SelecttextSpeak.generateSpeech(selectedText, voices, synth);
        }
    };

    const getCreatedStudyPlan = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/getlearningCreateId/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCreatedData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const [learningTitle, setlearningTitle] = useState("");
    const [learningDes, setlearningDes] = useState("");
    const [HSKname, setHSKname] = useState("");
    const [detailsexample, setdetailsexample] = useState("");

    const handleChange = (value) => {
        setdetailsexample(value.trim());
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavi

        const editor = quillRef.current.getEditor();
        const editorContent = editor.root.innerHTML.trim();
        const addwordObject = {
            weekId: id,
            userId: userId,
            learningTitle: learningTitle,
            learningDes: learningDes,
            HSKname: HSKname,
            detailsexample: editorContent // Include HTML content here
        };
        try {
            const response = await axios.post("http://127.0.0.1:8000/addword", addwordObject, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setlearningTitle("");
            setlearningDes("");
            setHSKname("");
            setdetailsexample(""); // Reset detailsexample
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error Response:', error.response); // Log the full error response

            // Check for a detailed error message from the server
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            toast.warning(errorMessage);
        }
    };

  





    return (
        <div className="each_components">
            <div className="max-width">
                {createdData.map((data) => (
                    <div className="addWordData" key={data._id}> {/* Assuming data has an id property */}
                        <div className="week">Week learning plan {data.eachweek}</div> {/* Render eachweek data */}
                        <div className="date">{new Date(data.createdAt).toLocaleDateString()}</div> {/* Render the formatted date */}
                        <div className="title">{data.learningtitle}</div> {/* Render learning title */}
                    </div>
                ))}
                <form onSubmit={handleSubmit}>
                    <div className="add-word_user_input_sec">
                        <div className="each_add_word_user_input">
                            <input
                                type="text"
                                placeholder="Learning Title"
                                className="word_taken_user"
                                value={learningTitle}
                                onChange={(e) => setlearningTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="each_add_word_user_input">
                            <textarea
                                placeholder="Learning Descriptions"
                                className="word_taken_user for_learning_des"
                                onChange={(e) => setlearningDes(e.target.value)}
                                required
                                value={learningDes}
                            />
                        </div>
                        <div className="each_add_word_user_input">
                            <input
                                type="text"
                                placeholder="Which HSK for about it"
                                className="word_taken_user"
                                value={HSKname}
                                onChange={(e) => setHSKname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="each_add_word_user_input">
                            <ReactQuill
                                className={clicked ? "add_class style_expline_data" : "style_expline_data"}
                                modules={reactQuill.modules}
                                formats={reactQuill.formats}
                                spellCheck={false}
                                placeholder="Explain Study plans"
                                ref={quillRef}
                                onChangeSelection={handleTextSelection}
                                onChange={handleChange}
                                value={detailsexample}
                               
                            />
                        </div>
                    </div>
                    <button type="submit" className="addWordBtn">Add Plans Topic</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
