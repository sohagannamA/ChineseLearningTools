import React, { useContext, useEffect, useRef, useState } from 'react'
import "./flashCard.css";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import HanziWrite from "hanzi-writer";
import SelecttextSpeak from "../../service/textspeak";

import { MdOutlineClose } from "react-icons/md";
import QuizTopic from '../quiz/QuizTopic';
import { QuizContext } from '../contextAPI/ApplicationContext';
export default function FlashCardDisplay(props) {
    const { categorydata, activeTab } = props;
    const { setIsVisible } = useContext(QuizContext)
    const [viewflashCard, setViewflashCard] = useState(false);
    const synth = window.speechSynthesis;
    const [speak, setspeak] = useState(false);
    const voices = useRef([]);

    const [eachcategorydataPart, setEachcategoryDataPart] = useState();

    const itemsPerPage = 1;
    const totalPages = Math.ceil(eachcategorydataPart && eachcategorydataPart.length / itemsPerPage);
    const [page, setpage] = useState(0);


    const [animationChar, setanimationChar] = useState({
        status: false,
        animationChar: ""
    });

    const handlePreviousPage = () => {
        if (page === 0) {
            setpage(totalPages - 1)
            setEachcategoryDataPart(shuffleArray(eachcategorydataPart))
        }
        else {
            setpage(page - 1);
        }
        setanimationChar({
            status: false,
            animationChar: ""
        })
    }

    const handleNextPage = () => {
        if (page === eachcategorydataPart.length - 1) {
            setpage(0);
            setEachcategoryDataPart(shuffleArray(eachcategorydataPart))
        }
        else {
            setpage(page + 1)
        }
        setanimationChar({
            status: false,
            animationChar: ""
        })
    }



    useEffect(() => {
        if (animationChar.status) {
            const container = document.getElementById("hanzi-container");
            container.innerHTML = "";
            const newWrite = HanziWrite.create(container, animationChar.animationChar, {
                height: 121,
                width: 121,
                strokeColor: "#d01527",
                delayBetweenStrokes: 1000,
                showOutline: true,
                outlineColor: "#808080",
            });
            const repeatAnimation = () => {
                newWrite.animateCharacter().then(repeatAnimation); // পুনরাবৃত্তি করে অ্যানিমেশন চালানো
            };
            repeatAnimation();
        }
    }, [animationChar]);


    useEffect(() => {
        const loadVoices = () => {
            voices.current = synth.getVoices();
        };

        loadVoices();
        synth.onvoiceschanged = loadVoices; // ভয়েস পরিবর্তন হলে লোড করুন
    }, [synth]);

    const handleSpeak = (selectedText) => {
        SelecttextSpeak.generateSpeech(selectedText, voices, synth, setspeak);
    }

    const currentWord = eachcategorydataPart && eachcategorydataPart[page];


    const handleSpeaksentence = (selectedText) => {
        SelecttextSpeak.generateSpeech(selectedText, voices, synth, setspeak);
    }



    function divideDataIntoGroups(data, groupSize = 5) {
        let parts = [];
        for (let i = 0; i < data.length; i += groupSize) {
            parts.push({
                part: parts.length + 1, // পার্ট নম্বর (১ থেকে শুরু)
                data: data.slice(i, i + groupSize) // ১০টির গ্রুপ তৈরি করা
            });
        }
        return parts;
    }


    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the elements
        }
        return arr;
    }
    const CategoryGroupdat = divideDataIntoGroups(categorydata);
    const category = CategoryGroupdat[0].data[0].category
    const [displayWord, setShowDisplay] = useState(false);
    const HandleseteachCategorydata = (eachcategorydata) => {
        setEachcategoryDataPart(shuffleArray(eachcategorydata));
        setShowDisplay(true);
    }

    return (
        <div className='flash_card_display_container'>
            {displayWord ?
                <div className='flash_card_display_box'>
                    <div className={viewflashCard ? "flesh_card_after_click_show" : "flash_card_view_sec"}>
                        <div className='flash_card_view_box'>
                            <div className='flash_card_main_word maing_word_padding_bottom'>{currentWord.word}</div>
                            <div className='flash_card_word_details'>
                                <div className='each_flash_card_word_details'>
                                    <div className='word_data_field'>Category:</div>
                                    <div className='word_data'>{currentWord.category}</div>
                                </div>
                                <div className='each_flash_card_word_details'>
                                    <div className='word_data_field'>Pinyin:</div>
                                    <div className='word_data'>{currentWord.pinyin}</div>
                                </div>
                                <div className='each_flash_card_word_details'>
                                    <div className='word_data_field'>Meaning:</div>
                                    <div className='word_data'>{currentWord.meaning}</div>
                                </div>
                                <div className='each_flash_card_word_details' onClick={() => handleSpeaksentence(currentWord.example_sentence.replace(/[^\u4e00-\u9fa5]/g, ""))}>
                                    <div className='word_data_field'>Sentence:</div>
                                    <div className='word_data text_line_height'>{currentWord.example_sentence}</div>
                                </div>
                            </div>

                            <div className='previous_about_this_word'>
                                <button className='view_btn' onClick={(e) => setViewflashCard(false)}>Back</button>
                            </div>
                        </div>
                    </div>
                    <div className='flash_card_word_sec'>
                        {animationChar.status ? <div className='flash_card_main_word' id='hanzi-container'></div> : <div className='flash_card_main_word'>{currentWord.word}</div>}
                        <div className='word_writing_practices_view'>
                            <div className='writing_word_item' onClick={() => setanimationChar({ status: false })}>{currentWord.word}</div>
                            {currentWord.word.split("").map((char, index) => (
                                <div key={index} className='writing_word_item' onClick={() => setanimationChar({ status: true, animationChar: char })}>{char}</div>
                            ))}
                        </div>
                    </div>
                    <div className='border_set'></div>
                    <div className='flash_card_controller'>
                        <div className='flash_card_left_and_right_sec'>
                            <div className='flash_card_left_and_right'>
                                <FiArrowLeft className='side_icon' onClick={handlePreviousPage} />
                                <p className='flash_card_word_count'>{page + 1}/{eachcategorydataPart.length}</p>
                                <FiArrowRight className='side_icon' onClick={handleNextPage} />
                            </div>
                        </div>
                        <div className='previous_about_this_word'>
                            <button
                                className="view_btn back_left"
                                onClick={(e) => {
                                    setShowDisplay(false);
                                    setpage(0);
                                    setanimationChar({
                                        status: false,
                                        animationChar: ""
                                    })
                                }}
                            >
                                Back
                            </button>
                            <button className='view_btn' onClick={(e) => setViewflashCard(true)}>View</button>
                            <button className='view_btn back_right' onClick={(e) => handleSpeak(currentWord.word)}>Speak</button>
                        </div>
                    </div>
                </div> : <div className='divide_each_categorySection_box'>
                    <div className='daily_plans'>YOUR LEARNING PLAN</div>
                    <div className='each_category_section_box_data'>
                        {categorydata.length > 5 && (
                            <div className='each_cetagory_box setlastChild' onClick={() => HandleseteachCategorydata(categorydata)}>
                                <div className='ceagory_name_and_si'>Total WORD</div>
                                <div className='total_word_box_sec'>{categorydata.length}</div>
                            </div>
                        )}
                        {CategoryGroupdat && CategoryGroupdat.map((group, index) =>
                            <div className='each_cetagory_box setlastChild' key={index} onClick={() => HandleseteachCategorydata(group.data)}>
                                <div className='ceagory_name_and_si'>DAY-{index + 1}</div>
                                <div className='total_word_box_sec'>{group.data.length}</div>
                            </div>
                        )}
                        <div className='quiz_navber_item'>
                            <QuizTopic category={category} activeTab={activeTab} />
                        </div>
                    </div>
                    <div className='border_set'></div>
                    <div className='previous_about_this_word'>
                        <button className='view_btn' onClick={() => setIsVisible(false)}>Back</button>
                    </div>
                </div>}
        </div >
    )
}
