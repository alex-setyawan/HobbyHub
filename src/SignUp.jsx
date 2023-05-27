import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      navigateToPage("/");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const navigate = useNavigate();
  const navigateToPage = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div>
        <h3>Register</h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          value={registerEmail}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          value={registerPassword}
        />

        <button onClick={register}>Create User</button>
      </div>
    </div>
  );
}

export default SignUp;
