import React, {useState} from "react";

function QuestionItem({ question, onDelete, onCorrectAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selection, setSelection]=useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'DELETE',
    })
    .then(r=>r.json())
    .then(()=>onDelete(id))
  }
  function handleEditClick(){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({correctIndex: selection})
    })
    .then(r=>r.json())
    .then(()=>onCorrectAnswerChange(id, selection))
  }
  function handleDropdownChange(e){
    setSelection(e.target.value)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleDropdownChange}>{options}</select>
      </label>
      <button onClick={handleEditClick}>Edit Question</button>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
