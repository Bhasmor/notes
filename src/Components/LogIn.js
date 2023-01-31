import React from "react";

function LogIn({ email, login, register, password, SetEmail, setPassword }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
      <h2 className="text-6xl mb-12">Notes</h2>
      <input
        className="p-4 rounded"
        type={"email"}
        placeholder="Email"
        value={email}
        onChange={(e) => SetEmail(e.target.value)}
      />
      <input
        className="p-4 rounded"
        type={"password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          onClick={() => login()}
          className="p-4 w-36 bg-green-500 rounded"
        >
          LogIn
        </button>
        <button
          onClick={() => register()}
          className="p-4 w-36 bg-green-500 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LogIn;
