import React, { useEffect, useState } from "react";

const BatchCoordinatesMessage = ({ batchId }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!batchId) return;

    const fetchMessage = () => {
      fetch(`http://127.0.0.1:8080/home?batchId=${batchId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0NTQ5MzI0NywiZXhwIjoxODg1MTMyNzA3MDA1MTZ9.o5fRVkzP5idnqsBM9veyhUJ6o7NmZPw3kQYOvV95KEI`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.text(); // or res.json() depending on your backend
        })
        .then((data) => {
          setMessage(data);
          setError(null);
        })
        .catch(() => {
          setError("Failed to load message");
        });
    };

    fetchMessage(); // initial fetch
    const intervalId = setInterval(fetchMessage, 1000); // repeat every second

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [batchId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Response for Batch ID: {batchId}</h2>
      <p>
        <strong>{message}</strong>
      </p>
    </div>
  );
};

export default BatchCoordinatesMessage;
