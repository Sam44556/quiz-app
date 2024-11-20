import React from "react";
import { useProvider } from '../context/provder';

function Option() {
    const { questions, index, dispatch, answer } = useProvider();
    const correctIndex = questions[index].incorrect_answers.indexOf(
        questions[index].correct_answer
    );
    
    const labels = ["A", "B", "C", "D"]; // Labels for options

    return (
        <div className="option">
            {questions[index].incorrect_answers.map((option, i) => (
                <button
                    className={
                        answer === null
                            ? "n"
                            : i === correctIndex
                                ? "correct"
                                : i === answer
                                    ? "wrong"
                                    : "n"
                    }
                    disabled={answer !== null}
                    key={i}
                    onClick={() => {
                        if (answer === null) {
                            dispatch({ type: "newAnswer", payload: i });
                        }
                    }}
                >
                    {/* Prepend the corresponding label */}
                    {labels[i]}: {option}
                </button>
            ))}
        </div>
    );
}

export default Option;
