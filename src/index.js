import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";

import Question from "./Question.js";
import questionsBanks from "./questionBanks";

import "./styles.css";

// TODO fix
var questionBank = [];

for (var i = 0; i < questionsBanks.length; ++i) {
  questionBank = questionBank.concat(questionsBanks[i].questionBank);
}
const INITIAL_STATE = questionBank.reduce(
  (memo, { question }) => ({
    ...memo,
    [question]: localStorage.getItem(`question.${question}`) || ""
  }),
  {}
);

function App() {
  const [showAnswer, setShowAnswer] = useState(false);

  const [currentBankIndex, setCurrentBankIndex] = useState(0);

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
    if (showAnswer) {
      document.getElementById("showAnswer").textContent = "显示答案";
    } else {
      document.getElementById("showAnswer").textContent = "隐藏答案";
    }
  };

  const onClear = () => {
    localStorage.clear();
  };

  const onSelectBank = event => {
    const bankIndex = +event.target.value;
    setCurrentBankIndex(bankIndex);
  };

  return (
    <div className="App">
      <h2>★英语错题本</h2>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553443200617&di=dc8cf6a8d92276ea820eb0f6456408e0&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20181011%2F79777f35f7c34ea187c0c6ee15cf2cc0.jpeg"
        alt="每日一读"
        className="HeaderImg"
      />
      <span>子题集: </span>
      <select value={currentBankIndex} onChange={onSelectBank}>
        {questionsBanks.map((questionBankItem, index) => {
          return (
            <option key={questionBankItem.name} value={index}>
              {questionBankItem.name}
            </option>
          );
        })}
      </select>
      <table>
        <tbody>
          <tr>
            <th width="30%">题目</th>
            <th width="5%">正确</th>
            <th width="40%">您的解答</th>
            <th width="25%">参考答案（点击显示答案按钮）</th>
          </tr>
          {questionsBanks[currentBankIndex].questionBank.map(questionItem => {
            return (
              <Question
                key={questionItem.question}
                question={questionItem.question}
                expectedAnswers={questionItem.answers}
                inputAnswer={inputAnswers[questionItem.question] || ""}
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
        <button type="button" onClick={onSubmit} id="showAnswer">
          显示答案
        </button>
        <button type="button" onClick={onClear}>
          清除答案
        </button>
      </div>
      <div className="copyright">
        copyright by Shirley娉娉.
        <br />
        Question Bank provided by Lucy.
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
