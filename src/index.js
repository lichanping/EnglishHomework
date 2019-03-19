import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";

import Question from "./Question.js";
import questionsBank from "./questions4_1_1.json";

import "./styles.css";

const INITIAL_STATE = questionsBank.reduce(
  (memo, { question }) => ({
    ...memo,
    [question]: localStorage.getItem(`question.${question}`) || ""
  }),
  {}
);

function App() {
  const [showAnswer, setShowAnswer] = useState(false);

  const [inputAnswers, updateAnswers] = useReducer(
    (previousInputAnswers, action) => {
      switch (action.type) {
        case "UPDATE":
          const { question, newInputAnswer } = action.payload;
          localStorage.setItem(`question.${question}`, newInputAnswer);
          return {
            ...previousInputAnswers,
            [question]: newInputAnswer
          };
        case "CLEAR":
          localStorage.clear();
          return INITIAL_STATE;
        default:
      }
      return previousInputAnswers;
    },
    INITIAL_STATE
  );

  const onSubmit = () => {
    setShowAnswer(!showAnswer);
  };

  const onClear = () => {
    localStorage.clear();
  };

  return (
    <div className="App">
      <h1>英语错题本</h1>
      <h2>
        <span>姓名</span>
        <span className="Spaces"> </span>
        <span>班级</span>
        <span className="Spaces"> </span>
      </h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <th width="30%">Question</th>
            <th width="40%">Your Answer</th>
            <th width="30%">Correct Answer</th>
          </tr>
          {questionsBank.map(questionItem => {
            return (
              <Question
                key={questionItem.question}
                question={questionItem.question}
                expectedAnswers={questionItem.answers}
                inputAnswer={inputAnswers[questionItem.question]}
                showAnswer={showAnswer}
                onInputAnswerChange={newInputAnswer => {
                  updateAnswers({
                    type: "UPDATE",
                    payload: {
                      question: questionItem.question,
                      newInputAnswer: newInputAnswer
                    }
                  });
                }}
              />
            );
          })}
        </tbody>
      </table>
      <div className="fixed">
        <button type="button" onClick={onSubmit}>
          显示答案
        </button>
        <button type="button" onClick={onClear}>
          清除答案
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
