import React, { useState } from 'react'
import "./flashCard.css"
import HSK1Data from "./HSK1.json";
import HSK2Data from "./HSK2.json";
import Mychoice from "./MyChoice.json"

import CetagoryDesign from './CetagoryDesign';
import WordSearch from './WordSearch';

import { IoSearchOutline } from "react-icons/io5";

export default function FlashCardHome() {
    const [activeTab, setActiveTab] = useState("HSK-1");
    const [wordSearchBoxShow, setShowWordSearch] = useState(false);
    const searchDataSetObject = {
        HSK1Data,
        HSK2Data,
        Mychoice
    }
    return (
        <div className='flashcardMainContainer'>
            <div className='flash_card_main_container_box'>
                <div className='flash_card_nav_item'>
                    {wordSearchBoxShow && (
                        <div className='word_search_box_sec'>
                            <WordSearch setShowWordSearch={setShowWordSearch} searchDataSetObject={searchDataSetObject} />
                        </div>
                    )}
                    {["HSK-1", "HSK-2", "HSK-3", "HSK-4", "MY CHOICE"].map((key) => (
                        <p
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`each_nav_item
                                ${activeTab === key ? "active_link" : ""}`}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </p>
                    ))}
                    <div className='word_search_box' onClick={() => setShowWordSearch(true)}>
                        <IoSearchOutline className='word_search_icon' />
                    </div>
                </div>
                <div className='flash_card_cetagory_sec'>
                    {activeTab === "HSK-1" && (
                        <CetagoryDesign setShowWordSearch={setShowWordSearch} activeTab={activeTab} DataSet={HSK1Data} />
                    )}
                    {activeTab === "HSK-2" && (
                        <CetagoryDesign setShowWordSearch={setShowWordSearch} activeTab={activeTab} DataSet={HSK2Data} />
                    )}
                    {activeTab === "HSK-3" && (
                        <CetagoryDesign setShowWordSearch={setShowWordSearch} activeTab={activeTab} />
                    )}
                    {activeTab === "HSK-4" && (
                        <CetagoryDesign setShowWordSearch={setShowWordSearch} activeTab={activeTab} />
                    )}
                    {activeTab === "MY CHOICE" && (
                        <CetagoryDesign setShowWordSearch={setShowWordSearch} activeTab={activeTab} DataSet={Mychoice} />
                    )}
                </div>
            </div>
        </div>
    )
}
