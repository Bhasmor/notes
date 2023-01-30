import "./App.css";
import React from "react";
import AddNote from "./Components/AddNote";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./Components/DB";

function App() {
  const [vis, setVis] = React.useState(false);
  const [noteName, setNoteName] = React.useState();
  const [desc, setDesc] = React.useState();
  const [notes, setNotes] = React.useState([]);

  const readQuery = async () => {
    setNotes([]);
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      setNotes((prevData) => [...prevData, doc.data()]);
    });
  };

  React.useEffect(() => {
    readQuery();

    return () => {
      readQuery();
    };
  }, []);

  console.log();

  const addNotes = async () => {
    if (noteName && desc) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          id: uuidv4(),
          name: noteName,
          desc: desc,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setNoteName("");
      setDesc("");
      setVis(false);
    }
    readQuery();
  };

  const delNote = async (id) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((docc) => {
      if (docc.data().id === id) {
        const den = async () => {
          await deleteDoc(doc(db, "users", docc.id));
        };
        den();
      }
    });

    readQuery();
  };

  const Note = () => {
    return notes.map((note, index) => {
      return (
        <div key={index} className="border rounded p-4 w-[400px] relative">
          <h2 className="border-b p-4 font-bold uppercase">{note.name}</h2>
          <p className="p-4">{note.desc}</p>
          <button
            onClick={() => delNote(note.id)}
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
