import { createContext, useState } from "react";

export const QuizContext = createContext();
export const Quizprovider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <QuizContext.Provider value={{ isVisible, setIsVisible }}>
            {children}
        </QuizContext.Provider>
    )
};