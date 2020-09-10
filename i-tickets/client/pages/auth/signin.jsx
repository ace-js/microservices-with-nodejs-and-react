import { useState } from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";
import ErrorAlert from "../../components/error-alert";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, reset, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div className="container">
      <h1>Sign in</h1>
      <form onSubmit={onSubmitHandler}>
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
      <br />
      <ErrorAlert errors={errors} close={reset} />
    </div>
  );
};

export default SignInPage;
