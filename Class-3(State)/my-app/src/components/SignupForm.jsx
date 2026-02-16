import React, { useState } from "react";

function SignupForm() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();

    let obj = {
      name: name,
      userName: userName,
      email: email,
      pass: password,
    };
    console.log(obj);

    setName("");
    setUserName("");
    setPassword("");
    setEmail("");
  }

  return (
    <div>
      <form>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>UserName</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;
