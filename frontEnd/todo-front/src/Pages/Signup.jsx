import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import "./Signup.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const SIGNUP_URL = "/users/signup";
const SIGNIN_URL = "/users/signin";

export default function Signup() {
  const { setAuth, auth } = useAuth();

  console.log("auth before", auth);

  const navigate = useNavigate();

  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const userRef = useRef(null);
  const emailRef = useRef(null);
  const pwdRef = useRef(null);
  const matchPwdRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isSignUpActive) {
      userRef.current.focus();
    }
  }, [isSignUpActive]);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidUser = USER_REGEX.test(user);
    const isValidEmail = EMAIL_REGEX.test(email);
    const isValidPwd = PWD_REGEX.test(pwd);
    const passwordsMatch = pwd === matchPwd;

    if (!isValidUser || !isValidEmail || !isValidPwd || !passwordsMatch) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        SIGNUP_URL,
        {
          name: user,
          email,
          password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);

      setIsSignUpActive(false);

      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server response");
      } else if (err.response.status === 409) {
        setErrMsg("User already exists");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Sandaru Clicked");

    try {
      const response = await axios.post(
        SIGNIN_URL,
        {
          email,
          password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);

      const { token } = response.data;

      setAuth({ token });

      console.log("auth after", auth);

      setSuccess(true);
      setEmail("");
      setPwd("");
      navigate("/home", { replace: true });
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server response");
      } else if (err.response.status === 401) {
        setErrMsg("Invalid credentials");
      } else {
        setErrMsg("Sign in failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div
      className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={handleSubmit}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            ref={userRef}
            autoComplete="off"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <p className={user && !validName ? "instructions" : "offscreen"}>
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className={email && !validEmail ? "instructions" : "offscreen"}>
            letters, numbers, underscores or hyphens allowed.
            <br />
            should include the '@' symbol.
          </p>
          <input
            type="password"
            placeholder="Password"
            ref={pwdRef}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          <p className={pwd && !validPwd ? "instructions" : "offscreen"}>
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters: ! @ # $ %
          </p>
          <input
            type="password"
            placeholder="Confirm Password"
            ref={matchPwdRef}
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            required
          />
          <p className={matchPwd && !validMatch ? "instructions" : "offscreen"}>
            Passwords must match.
          </p>
          <button
            disabled={!validName || !validEmail || !validPwd || !validMatch}
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
