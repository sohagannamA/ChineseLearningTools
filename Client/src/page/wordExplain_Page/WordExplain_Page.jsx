import axios from "axios";
import "./wordExplain_Page.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import authService from "../../service/authService";
import 'react-quill/dist/quill.snow.css';
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import reactQuill from "../../service/reactQuill";
import SelecttextSpeak from "../../service/textspeak";
import { FaRegSave } from "react-icons/fa";
import { TbPencilSearch } from "react-icons/tb";

import { MdEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { GiTortoise } from "react-icons/gi";
import { BsSoundwave } from "react-icons/bs";

import { PiSpeakerNoneFill } from "react-icons/pi";
import { PiSpeakerHighFill } from "react-icons/pi";
import HanziShow from "../../components/hanziShow/HanziShow";


export default function WordExplain() {
    const token = authService.getToken();
    const [getData, setGetData] = useState([]);
    const { id } = useParams();

    const synth = window.speechSynthesis;
    const voices = useRef([]);
    const quillRef = useRef(null);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [isslow, setSlow] = useState(false)
    const [speak, setspeak] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [selectiontext, setselectionText] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const getEactWord = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/getallwordId/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGetData(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error Status:', error.response.status);
                console.error('Error Data:', error.response.data);
            } else if (error.request) {
                console.error('Error Request:', error.request);
            } else {
                console.error('Error Message:', error.message);
            }
        }
    };

    useEffect(() => {
        if (getData && getData.length > 0) {
            setEditorContent(getData.map((data) => data.detailsexample).join(''));
        }
    }, [getData]);

    useEffect(() => {
        getEactWord();
    }, [])



    useEffect(() => {
        const loadVoices = () => {
            voices.current = synth.getVoices();
        };

        loadVoices();
        synth.onvoiceschanged = loadVoices; // ভয়েস পরিবর্তন হলে লোড করুন
    }, [synth]);

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handleTextSelection = () => {
        const editor = quillRef.current.getEditor();
        const selection = editor.getSelection();
        if (synth.speaking) {
            synth.cancel();
            setspeak(false)
        }

        if (selection && selection.length > 0) {
            const selectedText = editor.getText(selection.index, selection.length);
            if (selectedText.trim().length > 0) {
                setselectionText(selectedText);
                setshowHanziBox(true)
                if (isslow === true) {
                    SelecttextSpeak.slowSpeak(selectedText, voices, synth, setspeak);
                }
                else {
                    SelecttextSpeak.generateSpeech(selectedText, voices, synth, setspeak);
                }
            }
        }
    };


    const settoastMessage = () => {
        if (isReadOnly) {
            toast.warning("Enable edit mode", {
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                autoClose: 1000
            })
        }
        else {
            toast.warning("Disable edit mode", {
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
                autoClose: 1000
            })
        }
    }

    const handleGiveEdit = () => {
        setIsReadOnly((prevState) => !prevState);
        settoastMessage();
        setspeak(false);
    }

    const handleEdit = async () => {
        const editor = quillRef.current.getEditor();
        // const editorContent = editor.root.innerHTML.trim();

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/updateexplainDate/${id}`,
                { updatedData: editorContent },  // Wrap the content in an object
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data.message, {
                className: 'custom-toast',
                bodyClassName: 'custom-toast-body',
            });
            setIsReadOnly(!isReadOnly)
            getEactWord();
        } catch (error) {
            console.error('Error updating content:', error);
        }
    };


    const disabledSlow = () => {
        setSlow(false);
    }
    const enableSlow = () => {
        setSlow(true);
    }

    const handleBackanotherPage = () => {
        navigate(-1)
    }



    // Hanzi_controll
    const [showHanziBox, setshowHanziBox] = useState(false);
    const handleControllHanziBox = () => {
        if (showHanziBox === true) {
            setshowHanziBox(false);
        }
        else {
            setshowHanziBox(true);
        }
    }
    return (
        <div className="each_components explain_components">
            {showHanziBox ? <div className="hanzi_search_sec">
                <HanziShow selectiontext={selectiontext} />
            </div> : ""}
            <div className="max-width">
                <div className="wprd_explain_sec_nav">
                    <div className="explain_nav_box">
                        <div className="nav_left_sec_explain">
                            <div className="word_explain_left" onClick={handleBackanotherPage}>
                                <div className="back_icon_sec"><FaArrowLeft className="back_icon" /></div>
                            </div>
                            <div className="word_explain_right">
                                <div className="word_expain_title">
                                Your weekly plan sentence</div>
                            </div>
                        </div>
                        <div className="nav_right_sec_explain">
                            <div className="explain_wordaction_btn">
                                {isReadOnly && (
                                    <div className="button_section_action">
                                        {isslow ? <button type="button" className="edit_btn slow_spek" onClick={disabledSlow}>
                                            <div className="slow_button_div">
                                                <div className="button_icon_left">
                                                    <GiTortoise className="back_icon slow_icon" />
                                                </div>
                                                <div className="button_icon_right">
                                                    <BsSoundwave className="back_icon slow_icon" />
                                                </div>
                                            </div>
                                        </button> : <button type="button" className="edit_btn" onClick={enableSlow}><GiTortoise className="back_icon slow_icon" /></button>}
                                    </div>
                                )}

                                <div className="button_section_two">
                                    {isReadOnly && (<button type="button" className="edit_btn">{!speak ? <PiSpeakerNoneFill className="back_icon" /> : <PiSpeakerHighFill className="back_icon" />}</button>)}
                                    {isReadOnly ? "" : <button type="submit" onClick={handleEdit} className="edit_btn updateBtn"><FaRegSave className="back_icon" /></button>}
                                    <button type="submit" className="edit_btn" onClick={handleGiveEdit}>{!isReadOnly ? <MdEditOff className="back_icon" /> : <MdEdit className="back_icon" />}</button>
                                </div>
                                <button type="button" onClick={handleControllHanziBox} className="edit_btn"><TbPencilSearch className="back_icon" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="show_data_at_here">
                    <ReactQuill
                        modules={reactQuill.modules}
                        formats={reactQuill.formats}
                        spellCheck={false}
                        ref={quillRef}
                        onChangeSelection={handleTextSelection}
                        value={editorContent}
                        readOnly={isReadOnly}
                        onChange={handleEditorChange}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
