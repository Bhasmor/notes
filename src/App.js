import "./App.css";
import React from "react";
import AddNote from "./Components/AddNote";

function App() {
  const [vis, setVis] = React.useState(false);
  const [noteName, setNoteName] = React.useState();
  const [desc, setDesc] = React.useState();
  const [notes, setNotes] = React.useState([]);

  const addNotes = () => {
    if (noteName && desc) {
      setNotes([
        ...notes,
        {
          id: notes.length,
          name: noteName,
          desc: desc,
        },
      ]);
      setNoteName("");
      setDesc("");
      setVis(false);
    }
  };

  const delNote = (index) => {
    setNotes(notes.filter((id, ind) => ind !== index));
    console.log(notes);
  };

  const Note = () => {
    return notes.map((note, index) => {
      return (
        <div key={index} className="border rounded p-4 w-[400px] relative">
          <h2 className="border-b p-4 font-bold uppercase">{note.name}</h2>
          <p className="p-4">{note.desc}</p>
          <button
            onClick={() => delNote(index)}
            className="absolute bottom-2 right-2 border p-2 rounded bg-red-600"
          >
            X
          </button>
        </div>
      );
    });
  };

  return (
    <div className="flex justify-center overflow-hidden">
      <div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mt-6">Take Notes</h2>
          <button
            onClick={() => setVis(!vis)}
            className="p-4 rounded mt-8 bg-green-500 hover:bg-green-600 transition-all"
          >
            Add Note
          </button>
          <AddNote
            visible={vis}
            setNoteName={setNoteName}
            noteName={noteName}
            setDesc={setDesc}
            desc={desc}
            addNotes={addNotes}
          />
        </div>
        <div className="flex flex-wrap w-screen p-24 gap-12 justify-center">
          <Note />
        </div>
      </div>
    </div>
  );
}

export default App;
