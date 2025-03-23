import React, { useContext, useEffect, useState } from 'react'
import "./flashCard.css"
import FlashCardDisplay from './FlashCardDisplay';
import { QuizContext } from '../contextAPI/ApplicationContext';
export default function CetagoryDesign(props) {
    const { activeTab, DataSet,setShowWordSearch} = props;
    const [categorydata, setcategorydata] = useState(null);
    const [allwordClick, setallwordClick] = useState(false)
    const { isVisible, setIsVisible } = useContext(QuizContext);
    const groupedDataForHSK1 = DataSet && DataSet.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});


    const handleCategoryClick = (categorydata, allword) => {
        if (categorydata && !allword) {
            setcategorydata(categorydata);
            console.log(categorydata);
            setIsVisible(true);
            setallwordClick(false)
            setShowWordSearch(false)
        }
        else {
            setcategorydata(categorydata)
            setallwordClick(true)
            setIsVisible(true);
            setShowWordSearch(false)
        }
    }

    return (
        <div className='cetagory_container'>
            {categorydata !== null && isVisible && (
                <div className='flash_card_display_section'>
                    <FlashCardDisplay activeTab={activeTab} categorydata={categorydata} allwordClick={allwordClick} />
                </div>
            )}
            <div className='each_cetagory_box fortotalword' onClick={(e) => handleCategoryClick(DataSet, "allword")}>
                <div className='ceagory_name_and_si'><span className='serial_no'>1.</span>Total Word</div>
                <div className='total_word_box_sec'>{DataSet && DataSet.length > 0 ? DataSet.length : "0"}</div>
            </div>
            {

                DataSet && Object.keys(groupedDataForHSK1)
                    .sort((a, b) => groupedDataForHSK1[b].length - groupedDataForHSK1[a].length) // Sorting from max to min
                    .map((category, index) => (
                        <div
                            className='each_cetagory_box'
                            key={index}
                            onClick={(e) => handleCategoryClick(groupedDataForHSK1[category])}
                        >
                            <div className='ceagory_name_and_si'>
                                <span className='serial_no'>{index + 2}. </span>{category.toUpperCase()}
                            </div>
                            <div className='total_word_box_sec'>{groupedDataForHSK1[category].length}</div>
                        </div>
                    ))
            }
        </div >
    )
}
