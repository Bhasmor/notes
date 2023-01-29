export default function AddNote({
  visible,
  setNoteName,
  noteName,
  setDesc,
  desc,
  addNotes,
}) {
  return (
    <div
      className={`mt-4 border p-8 flex flex-col gap-2 ${
        visible ? "" : "hidden"
      }`}
    >
      <input
        className="indent-2 rounded border-none p-3"
        type={"text"}
        placeholder="Name"
        onChange={(e) => setNoteName(e.target.value)}
        value={noteName}
      />
      <input
        className="indent-2 rounded border-none p-3"
        type={"text"}
        placeholder="Description"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <button onClick={() => addNotes()} className="p-4 bg-green-400">
        Add
      </button>
    </div>
  );
}
