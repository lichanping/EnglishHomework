import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";

import Question from "./Question.js";
import questionsBanks from "./questionBanks";

import headerImgSrc1 from "./img/header1.jpg";
import headerImgSrc2 from "./img/header2.jpg";
import headerImgSrc3 from "./img/header3.jpg";
import headerImgSrc4 from "./img/header4.jpg";
import headerImgSrc5 from "./img/header5.jpg";
import headerImgSrc6 from "./img/header6.jpg";
import headerImgSrc7 from "./img/header7.jpg";
import headerImgSrc8 from "./img/header8.jpg";
import headerImgSrc9 from "./img/header9.jpg";
import headerImgSrc10 from "./img/header10.jpg";
import headerImgSrc11 from "./img/header11.jpg";
import headerImgSrc12 from "./img/header12.jpg";
import proverbs from "./data/proverbs.json";

import "./styles.css";

// TODO fix
var allQuestionsBank = [];
for (var i = 0; i < questionsBanks.length; ++i) {
  allQuestionsBank = allQuestionsBank.concat(questionsBanks[i].questionBank);
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
var headerImgList = [
  headerImgSrc1,
  headerImgSrc2,
  headerImgSrc3,
  headerImgSrc4,
  headerImgSrc5,
  headerImgSrc6,
  headerImgSrc7,
  headerImgSrc8,
  headerImgSrc9,
  headerImgSrc10,
  headerImgSrc11,
  headerImgSrc12
];
var randomHeaderImgSrc = headerImgList[getRandomInt(headerImgList.length)];
var randomProverb = proverbs[getRandomInt(proverbs.length)];
const INITIAL_STATE = allQuestionsBank.reduce(
  (memo, { question }) => ({
    ...memo,
    [question]: localStorage.getItem(`question.${question}`) || ""
  }),
  {}
);
const CLEAR_STATE = allQuestionsBank.reduce(
  (memo, { question }) => ({
    ...memo,
    [question]: ""
  }),
  {}
);

function App() {
  const [showAllAnswers, setShowAllAnswers] = useState(false);

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
          return CLEAR_STATE;
        default:
      }
      return previousInputAnswers;
    },
    INITIAL_STATE
  );

  const [answersVisibilities, updateAnswersVisibilities] = useReducer(
    (previousAnswersVisibilities, action) => {
      switch (action.type) {
        case "TOGGLE":
          const { question } = action.payload;
          return {
            ...previousAnswersVisibilities,
            [question]: !previousAnswersVisibilities[question]
          };
        case "SET_ALL": {
          const { visibility } = action.payload;
          return allQuestionsBank.reduce(
            (memo, { question }) => ({
              ...memo,
              [question]: visibility
            }),
            {}
          );
        }
        default:
      }
      return previousAnswersVisibilities;
    },
    {} // TODO
  );

  const onSubmit = () => {
    const newVisibility = !showAllAnswers;
    updateAnswersVisibilities({
      type: "SET_ALL",
      payload: {
        visibility: newVisibility
      }
    });
    setShowAllAnswers(newVisibility);
  };

  const onClear = () => {
    updateAnswers({
      type: "CLEAR"
    });
  };

  const onSelectBank = event => {
    const bankIndex = +event.target.value;
    setCurrentBankIndex(bankIndex);
  };

  return (
    <div className="App">
      <header className="Header">
        <div className="HeaderProverb" id="HeaderProverb">
          <p>{randomProverb.en}</p>
          <p>{randomProverb.cn}</p>
        </div>
        <h2 id="HeaderTitle">★英语错题本</h2>
        <div className="HeaderImgContainer">
          <img
            src={randomHeaderImgSrc}
            id="HeaderImg"
            alt="每日一读"
            className="HeaderImg"
          />
        </div>
      </header>
      <span>子题集: </span>
      <select id="selectBank" value={currentBankIndex} onChange={onSelectBank}>
        {questionsBanks.map((questionBankItem, index) => {
          return (
            <option key={questionBankItem.name} value={index}>
              {questionBankItem.name}
            </option>
          );
        })}
      </select>
      <table id="notebookTable">
        <tbody>
          <tr id="tableHeader">
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
                showAnswer={answersVisibilities[questionItem.question] || false}
                onToggleAnswerVisibility={() => {
                  updateAnswersVisibilities({
                    type: "TOGGLE",
                    payload: {
                      question: questionItem.question
                    }
                  });
                }}
                inputAnswer={inputAnswers[questionItem.question] || ""}
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
        <div />
        <div>
          <button type="button" onClick={onSubmit} id="showAnswer">
            {showAllAnswers ? "隐藏答案" : "显示答案"}
          </button>
          <button type="button" onClick={onClear} id="clearAnswer">
            清除答案
          </button>
        </div>
        <div className="copyRight" id="copyRight">
          copyright by Shirley娉娉.
          <br />
          Activity provided by Lucy.
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
