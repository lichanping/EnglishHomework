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
      <td className={isCorrect ? "green" : "purple"}>{question}</td>
      <td>
        <textarea
          className="my_answer"
          value={inputAnswer}
          onChange={onChange}
        />
      </td>
      <td className={showAnswer ? "normal" : "hidden"}>{expectedAnswers}</td>
    </tr>
  );
};

export default Question;
