import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/main");
    } catch (error) {
      console.log(error);
      if (!error?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (error?.originalStatus.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error?.originalStatus.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errorRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <section className=" min-h-screen w-full flex items-center justify-center flex-col">
      <p className=" text-red-400 mb-6" ref={errorRef}>
        {errMsg}
      </p>
      <h1 className="text-4xl font-bold">Admin Login</h1>
      <form
        className="flex flex-col gap-4 mt-4 w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            autoComplete="off"
            required
            className="h-10 rounded-lg bg-[#adfaff] text-black p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={handlePwdInput}
            autoComplete="off"
            required
            className="h-10 rounded-lg bg-[#adfaff] text-black p-2"
          />
        </div>

        <button
          className="w-fit p-2 self-center mt-4 rounded-xl text-lg text-[#aaffcc] border-2 border-[#aaffcc] hover:text-[#d1ffdc] hover:border-[#d1ffdc]"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </section>
  );

  return content;
};

export default Login;
