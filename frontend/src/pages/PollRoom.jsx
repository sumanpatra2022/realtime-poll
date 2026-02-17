

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://realtime-poll-ydrg.onrender.com");

function PollRoom() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetchPoll();

    socket.emit("joinPoll", id);

    socket.on("pollUpdated", (updatedPoll) => {
      setPoll(updatedPoll);
    });

    return () => {
      socket.off("pollUpdated");
    };
  }, []);

  const fetchPoll = async () => {
    try {
      const res = await axios.get(
        `https://realtime-poll-ydrg.onrender.com/api/polls/${id}`
      );
      setPoll(res.data);
    } catch (err) {
      alert("Poll not found");
    }
  };

  const handleVote = async () => {
    try {
     await axios.post(
  `https://realtime-poll-ydrg.onrender.com/api/polls/${id}/vote`,

        {
          optionIndex: selected
        }
      );

      setVoted(true);
    } catch (err) {
      alert("Already Voted");
    }
  };

  if (!poll) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{poll.question}</h2>

      {poll.options.map((opt, index) => (
        <div key={index}>
          <input
            type="radio"
            name="option"
            disabled={voted}
            onChange={() => setSelected(index)}
          />
          {opt.text} — {opt.votes} votes
        </div>
      ))}

      <br />

      {!voted && (
        <button
          onClick={handleVote}
          disabled={selected === null}
        >
          Vote
        </button>
      )}
    </div>
  );
}

export default PollRoom;
