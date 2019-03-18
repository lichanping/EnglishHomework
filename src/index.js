import React, { useState } from "react";
import ReactDOM from "react-dom";

import Question from "./Question.js";
import questionsBank from "./questions4_1_1.json";

import "./styles.css";

function App() {
  const [showAnswer, setShowAnswer] = useState(false);

  const onSubmit = () => {
    setShowAnswer(!showAnswer);
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
        <tr>
          <th width="30%">Question</th>
          <th width="40%">Your Answer</th>
          <th width="30%">Correct Answer</th>
        </tr>
        {questionsBank.map(questionItem => {
          return (
            <Question
              question={questionItem.question}
              answers={questionItem.answers}
              showAnswer={showAnswer}
            />
          );
        })}
      </table>
      <hr />
      <button type="button" className="fixed" onClick={onSubmit}>
        显示答案
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
