import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
export default function AddSubject({ isClickShowbook }) {
    const [selectbooksCategories, setselectbooksCategories] = useState(null);
    const bookCategoriesOption = [
        { value: "Mejor Categorie", label: "Mejor Categorie" },
        { value: "Non Mejor Categories", label: "Non Mejor Categories" },
    ]
    const handlebookCategoriesChange = (option) => {
        setselectbooksCategories(option)
    }
    const closeBooksAdd = () => {
        isClickShowbook(false);
    }
    return (
        <div className="bluer semester_bluer">
            <div className="create_study_plan_box_sec">
                <div className="study_plan_box">
                    <div className="study_plan_box_nav">
                        <div className="study_plan_left">Add Books</div>
                        <div className="study_plan_right">
                            <div className="study_created_close_box" onClick={closeBooksAdd}>
                                <IoClose className="close_icon"></IoClose>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={""}>
                        <div className="study_plan_user_section">
                            <div className="each_user_study_user_inp dialogue_field">
                                <input
                                    type="text"
                                    placeholder="Name of subject"
                                    className="study_name_user"
                                    required
                                />
                            </div>
                            <div className="each_user_study_user_inp">
                                <Select
                                    value={selectbooksCategories}
                                    onChange={handlebookCategoriesChange}
                                    options={bookCategoriesOption}
                                    placeholder="Select boos Categorie"
                                    className="custom-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                            <div className="create_button">
                                <button type="submit" className="create_btn">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}