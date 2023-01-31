import "./App.css";
import React from "react";
import AddNote from "./Components/AddNote";
import { v4 as uuidv4 } from "uuid";
import LogIn from "./Components/LogIn";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./Components/DB";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function App() {
  const [vis, setVis] = React.useState(false);
  const [noteName, setNoteName] = React.useState();
  const [desc, setDesc] = React.useState();
  const [notes, setNotes] = React.useState([]);
  const [email, SetEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [loged, setLoged] = React.useState(false);
  const [userCre, setUserCre] = React.useState();
  const [search, setSearch] = React.useState();

  const readQuery = async () => {
    setNotes([]);
    const userRef = collection(db, "users");
    const q = query(userRef, where("user", "==", `${userCre.uid}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setNotes((prevData) => [...prevData, doc.data()]);
    });
  };

  React.useEffect(() => {
    if (userCre) {
      readQuery();
    }
  }, [userCre]);

  function register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserCre(user);
        setLoged(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error Code:${errorCode}-- Error:${errorMessage}`);
        // ..
      });
  }
  function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setUserCre(user);
        await setLoged(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error Code:${errorCode}-- Error:${errorMessage}`);
      });
  }

  const addNotes = async () => {
    if (noteName && desc) {
      try {
        await addDoc(collection(db, "users"), {
          user: userCre.uid,
          id: uuidv4(),
          name: noteName,
          desc: desc,
        });
      } catch (e) {
        alert(e);
      }
      setNoteName("");
      setDesc("");
      setVis(false);
    }
    readQuery();
  };

  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setLoged(false);
        setUserCre();
      })
      .catch((error) => {
        alert(`Error:${error}`);
      });
  }

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
  const SearchNote = () => {
    const not = notes.filter((nots) => nots.name.includes(search));
    return not.map((note, index) => {
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

  const logedScreen = () => {
    return (
      <div>
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => logOut()}
            className="p-4 absolute top-0 right-0 bg-red-500"
          >
            LogOut
          </button>
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
          <input
            className="mt-4 p-4 w-72 rounded"
            type={"text"}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap w-screen p-24 gap-12 justify-center">
          {search ? <SearchNote /> : <Note />}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center overflow-hidden">
      {loged ? (
        logedScreen()
      ) : (
        <LogIn
          SetEmail={SetEmail}
          setPassword={setPassword}
          email={email}
          password={password}
          login={login}
          register={register}
        />
      )}
    </div>
  );
}

export default App;
