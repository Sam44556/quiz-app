import React, { createContext, useReducer, useEffect, useContext } from "react";

const Contextp = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secrem: null,
};
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

function reducer(state, action) {
  switch (action.type) {
    case "dataNotReceived":
      return { ...state, status: "error" };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "newAnswer":
      const { questions, index, points } = state;
      const correctAnswerIndex = questions[index]?.correct_answer_index;
      const newPoints =
        action.payload === correctAnswerIndex
          ? points + questions[index].value
          : points;
      return { ...state, answer: action.payload, points: newPoints };
    case "start":
      return {
        ...state,
        status: "active",
        secrem: state.questions.length * 30, // Assuming 30 seconds per question
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "tick":
      return {
        ...state,
        secrem: state.secrem - 1,
        status: state.secrem === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, secrem } = state;
  const numberOfQuestions = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.value, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
         ` https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple`

        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("API Data:", data.results);

        const questionsWithValues = data.results.map((question) => {
          const allAnswers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          const shuffledAnswers = shuffleArray(allAnswers);
          return {
            ...question,
            incorrect_answers: shuffledAnswers,
            correct_answer_index: shuffledAnswers.indexOf(question.correct_answer),
            value: 10,
          };
        });

        console.log("Questions with values:", questionsWithValues);
        dispatch({ type: "dataReceived", payload: questionsWithValues });
      } catch (err) {
        console.error("Error fetching data:", err);
        dispatch({ type: "dataNotReceived" });
      }
    }
    fetchData();
  }, []);

  return (
    <Contextp.Provider
      value={{
        questions,
        dispatch,
        status,
        index,
        answer,
        points,
        secrem,
        numberOfQuestions,
        totalPoints,
      }}
    >
      {children}
    </Contextp.Provider>
  );
}

function useProvider() {
  const context = useContext(Contextp);
  if (context === undefined) {
    throw new Error("useProvider must be used within a Provider");
  }
  return context;
}

export { Contextp, Provider, useProvider };
