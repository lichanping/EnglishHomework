import React from "react";
import passedIcon from "./img/passed.jpg";

const Question = ({
  question,
  expectedAnswers,
  inputAnswer,
  onToggleAnswerVisibility,
  showAnswer,
  onInputAnswerChange
}) => {
  const onChange = event => {
    const value = event.target.value;
    onInputAnswerChange(value);
  };
  // Todo solution #1:
  // let isCorrect = false;
  // for (var answer of expectedAnswers) {
  //   isCorrect = (inputAnswer === answer && answer !== "") || isCorrect;
  // }
  const isCorrect =
    expectedAnswers.some(
      expectedAnswer => expectedAnswer.trim() === inputAnswer.trim()
    ) && expectedAnswers[0] !== "";

  let showAnswerButtonHidden = expectedAnswers[0] === "";

  return (
    <tr>
      <td data-at-id="questionText" className="Spaces">
        {question}
      </td>
      <td>
        <img
          alt="答对了"
          src={passedIcon}
          className={isCorrect ? "iconImg" : "hidden"}
          data-at-id="passedIcon"
        />
        <button
          onClick={onToggleAnswerVisibility}
          className={
            showAnswerButtonHidden
              ? "hidden"
              : showAnswer
              ? ""
              : "ShowAnswerButton"
          }
          data-at-id="showEachAnswer"
        >
          {showAnswer ? "隐藏" : "显示"}
        </button>
      </td>
      <td>
        <textarea
          className="my_answer"
          value={inputAnswer}
          onChange={onChange}
          data-at-id="myAnswer"
        />
      </td>
      <td
        className={showAnswer ? "normal" : "hidden"}
        data-at-id="expectedAnswer"
      >
        {expectedAnswers.join(" / ")}
      </td>
    </tr>
  );
};

export default Question;
