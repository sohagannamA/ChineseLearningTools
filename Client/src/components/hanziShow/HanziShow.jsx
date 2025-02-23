import React, { useEffect, useState } from 'react'
import HanziWrite from "hanzi-writer";
import "./hanziShow.css"
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
export default function HanziShow(props) {
    const { selectiontext } = props;
    const [characters, setCharacters] = useState([]);
    const [index, setIndex] = useState(0);
    const [writer, setWriter] = useState(null)
    const [error, setError] = useState("");

    useEffect(() => {
        if (characters.length === 0 || index < 0 || index >= characters.length) {
            return;
        }
        const character = characters[index];
        const container = document.getElementById("hanzi-container");
        container.innerHTML = "";
        setError("");

        try {
            const newWrite = HanziWrite.create(container, character, {
                width: 200,
                height: 200,
                strokeColor: "#d01527",
                delayBetweenStrokes: 1000,
                showOutline: true,
                outlineColor: "#808080"
            });
            const repeatAnimation = () => {
                newWrite.animateCharacter().then(repeatAnimation); // পুনরাবৃত্তি করে অ্যানিমেশন চালানো
            };

            repeatAnimation();

            setWriter(newWrite);
        }
        catch (error) {
            console.error("Character not supported:", error);
            setError("❌ Character not supported for animation.");
        }
    }, [index, characters]);


    const handleChange = (e) => {
        const inputValue = e.target.value.trim();
        const chineseChars = inputValue.replace(/[^\u4e00-\u9fa5]/g, "");
        if (chineseChars === "") {
            setCharacters([]);
            setIndex(0);
        }
        else {
            const chars = chineseChars.split("");
            setCharacters(chars)
            console.log(chars);
        }
    }
    useEffect(() => {
        const chineseChars = selectiontext.replace(/[^\u4e00-\u9fa5]/g, "");
        if (chineseChars === "") {
            setCharacters([]);
            setIndex(0);
        }
        else {
            const chars = chineseChars.split("");
            setCharacters(chars)
            setIndex(0);
            console.log(chars);
        }
    }, [selectiontext])
    const handlePrevious = () => {
        setIndex((prev) => Math.max(0, prev - 1)); // Prevent going below 0
    };

    // Handle the Next button click
    const handleNext = () => {
        setIndex((prev) => {
            // If we are at the last character, reset to the first character
            if (prev >= characters.length - 1) {
                return 0; // Reset to the first character
            }
            return prev + 1; // Otherwise, go to the next character
        });
    };

    return (
        <div className='hanziBox_sec'>
            <div className='hanzi_search_box_sec'>
                <input
                    type='text'
                    placeholder='Paste Chinese character...'
                    className='hanzi_char_input'
                    onChange={handleChange}
                />
            </div>
            {characters.length > 0 ? <div className='hanzi_display_sec'>
                <div className='show_animation_hanzi_box'>
                    <div className='hanzi_animation_text' id="hanzi-container"></div>
                </div>
                <div className='hanzi_text_controller'>
                    <div className='previous_next_btn_sec'>
                        <GrLinkPrevious className='hanzi_change_icon' onClick={handlePrevious} />
                        <p className='count_char'>{index + 1}/{characters.length}</p>
                        <GrLinkNext className='hanzi_change_icon' onClick={handleNext} />
                    </div>
                    <div className='repeted_animation_btn_sec'>
                        <button className='reply_animation_hanzi' onClick={() => writer && writer.animateCharacter()}>Replay Animation</button>
                    </div>
                </div>
            </div> : ""};
        </div>
    )
}
