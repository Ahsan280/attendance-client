import React, { useState } from "react";
import { Link } from "react-router-dom";

import Spinner from "../../components/Spinner";
import useLogin from "../../hooks/useLogin";
function Login() {
  const { login, loading } = useLogin();
  const handlelogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="gradient vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="form-container vh-100">
              <div className="card">
                <div className="card-body vstack gap-3">
                  <h2 className="card-title">Login</h2>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-3 d-flex justify-content-center">
                    {loading ? (
                      <Spinner />
                    ) : (
                      <button
                        onClick={handlelogin}
                        className="btn btn-primary w-100"
                      >
                        Login
                      </button>
                    )}
                  </div>
                  {/* <div className="d-flex gap-2">
                    <p>Don't have an account?</p>
                    <Link to="/register">Register</Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
