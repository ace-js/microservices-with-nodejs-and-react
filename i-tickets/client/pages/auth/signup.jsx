import { useState } from "react";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      await axios.post("https://itickets.dev/api/users/signup", {
        email,
        password,
      });

      const { data = {} } = await axios.get(
        "https://itickets.dev/api/users/currentuser"
      );

      console.log("Success : ", data.currentUser);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h1>Sign up</h1>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-control"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
};
