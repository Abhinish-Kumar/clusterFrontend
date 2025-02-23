import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./Notes.css"

const Notes = () => {
            const { email } = useParams();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user notes based on the email prop
    const fetchNotes = async () => {
      try {
        console.log(`https://clusterapi.onrender.com/${email}`);
        let response = await fetch(`https://clusterapi.onrender.com/${email}`, {
          method: "GET", // Use GET method to match back-end route
          credentials: "include", // Include cookies for authentication
        });

        if (!response.ok) {
          throw new Error("User not found or Unauthorized");
        }

        const data = await response.json();
        setNotes(data); // Set the fetched notes
        console.log(data);
      } catch (err) {
        setError(err.message); // Handle any errors that occur
      }
    };

    fetchNotes();
  }, [email]); // Re-fetch notes whenever the email changes

  return (
    <div id="notes">
      <header>
        <h1>Cluster</h1>
      </header>
      <div id="listOdNotesOfUser">
      <h2>Notes for {email}</h2>

{error && <div style={{ color: "red" }}>{error}</div>}

{/* Render the notes if they exist */}
{notes.length > 0 ? (
  <ul>
    {notes.map((note, index) => (
      <li key={index}>{note[Object.keys(note)[0]]}</li>
    ))}
  </ul>
) : (
  <p>No notes available.</p>
)}
      </div>
      
    </div>
  );
};

export default Notes;
