import React from "react";

const Question = ({
  question,
  expectedAnswers,
  inputAnswer,
  showAnswer,
  onInputAnswerChange
}) => {
  const onChange = event => {
    const value = event.target.value;
    onInputAnswerChange(value);
  };

  // let isCorrect = false;
  // for (var answer of expectedAnswers) {
  //   isCorrect = inputAnswer === answer || isCorrect;
  // }
  const isCorrect = expectedAnswers.some(
    expectedAnswer => expectedAnswer.trim() === inputAnswer.trim()
  );

  return (
    <tr>
      <td className="Spaces">{question}</td>
      <td>
        <img
          alt="答对了"
          src="https://cdn3.vectorstock.com/i/1000x1000/51/57/green-tick-check-mark-icon-cartoon-vector-13845157.jpg"
          className={isCorrect ? "normal iconImg" : "hidden iconImg"}
        />
      </td>
      <td>
        <textarea
          className="my_answer"
          value={inputAnswer}
          onChange={onChange}
        />
      </td>
      <td className={showAnswer ? "normal" : "hidden"}>
        {expectedAnswers.join(" / ")}
      </td>
    </tr>
  );
};

export default Question;
