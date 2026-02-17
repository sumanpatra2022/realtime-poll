import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || options.filter(opt => opt !== "").length < 2) {
      alert("Enter question and at least 2 options");
      return;
    }

    try {
     const filteredOptions = options.filter(opt => opt.trim() !== "");

const res = await axios.post(
  "https://realtime-poll-vdrg.onrender.com/api/polls",
  {
    question,
    options: filteredOptions
  }
);


      navigate(`/poll/${res.data.pollId}`);
    } catch (err) {
      alert("Error creating poll");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Poll</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "300px", marginBottom: "10px" }}
        />

        <br />

        {options.map((opt, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) =>
                handleOptionChange(index, e.target.value)
              }
              style={{ width: "300px", marginBottom: "5px" }}
            />
          </div>
        ))}

        <button type="button" onClick={addOption}>
          Add Option
        </button>

        <br /><br />

        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}

export default CreatePoll;
