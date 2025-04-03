import { useState } from "react";

function EditTask({ initialText, onSave, onCancel }) {
  const [editText, setEditText] = useState(initialText);

  return (
    <>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <button onClick={() => onSave(editText)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  );
}

export default EditTask;
