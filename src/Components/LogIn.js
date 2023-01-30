import React from "react";

function LogIn({ email, login, password, SetEmail, setPassword }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
      <h2 className="text-5xl">You need to be loged in</h2>
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
      <button onClick={() => login()} className="p-4 bg-green-500 rounded">
        LogIn
      </button>
    </div>
  );
}

export default LogIn;
