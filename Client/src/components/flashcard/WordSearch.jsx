import React, { useState, useEffect, useRef } from 'react'
import "./wordsearchStyle.css";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import SelecttextSpeak from "../../service/textspeak";
import HanziWrite from "hanzi-writer";

export default function WordSearch(props) {
    const { setShowWordSearch, searchDataSetObject } = props;
    const [page, setpage] = useState(0);
    const [viewflashCard, setViewflashCard] = useState(false);
    const [container, setContainer] = useState();
    const synth = window.speechSynthesis;
    const [speak, setspeak] = useState(false);
    const voices = useRef([]);

    const worddataBase = Object.values(searchDataSetObject).flat();
    const [isfoundSearchData, setIsFoundData] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredArray, setfilteredArray] = useState();
    const handleSearchClick = () => {
        const splittext = searchQuery.match(/[\u4e00-\u9fff]|[a-zA-Z]+/g) || [];
        const filteredArray = worddataBase.filter((item, index, self) =>
            splittext.some(query => {
                const meanings = item.meaning.split(" ").map(m => m.trim().toLowerCase())||item.meaning.split(",").map(m => m.trim().toLowerCase());
                return (
                    item.word === query ||
                    meanings.includes(query.toLowerCase())
                );
            }) &&
            index === self.findIndex(obj => obj.word === item.word)
        );
        if (filteredArray.length > 0) {
            setIsFoundData(true);
            setfilteredArray(filteredArray)
        }
    }



    const [animationChar, setanimationChar] = useState({
        status: false,
        animationChar: ""
    });
    useEffect(() => {
        if (animationChar.status) {
            const container = document.getElementById("hanzi-container");
            container.innerHTML = "";
            setContainer(container)
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


    const itemsPerPage = 1;
    const currentWord = filteredArray && filteredArray[page];
    const totalPages = Math.ceil(filteredArray && filteredArray.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (page === 0) {
            setpage(totalPages - 1)
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
        if (page === filteredArray.length - 1) {
            setpage(0);
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
        const loadVoices = () => {
            voices.current = synth.getVoices();
        };

        loadVoices();
        synth.onvoiceschanged = loadVoices; // ভয়েস পরিবর্তন হলে লোড করুন
    }, [synth]);

    const handleSpeak = (selectedText) => {
        SelecttextSpeak.generateSpeech(selectedText, voices, synth, setspeak);
    }
    const handleSpeaksentence = (selectedText) => {
        SelecttextSpeak.generateSpeech(selectedText, voices, synth, setspeak);
    }

    return (
        <div className='word_search_divider'>
            {isfoundSearchData && (
                <div className='search_result_display_section flash_card_search_box'>
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
                                    <p className='flash_card_word_count'>{page + 1} / {filteredArray.length}</p>
                                    <FiArrowRight className='side_icon' onClick={handleNextPage} />
                                </div>
                            </div>
                            <div className='previous_about_this_word'>
                                <button
                                    className="view_btn back_left"
                                    onClick={(e) => {
                                        setIsFoundData(false);
                                        setpage(0);
                                        container.innerHTML = "";
                                        setfilteredArray();
                                    }}
                                >
                                    Back
                                </button>
                                <button className='view_btn' onClick={(e) => setViewflashCard(true)}>View</button>
                                <button className='view_btn back_right' onClick={() => handleSpeak(currentWord && currentWord.word)}>Speak</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <input
                type='text'
                placeholder='Search your word'
                className='word_search_input_box'
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='search_controller'>
                <button className='search_controller_btn word_search_btn' onClick={handleSearchClick}>Search</button>
                <button className='search_controller_btn' onClick={() => setShowWordSearch(false)}>Close</button>
            </div>
        </div>
    )
}
