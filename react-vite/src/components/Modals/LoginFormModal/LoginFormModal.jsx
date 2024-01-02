import { useState } from "react";
import { thunkLogin } from "../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { Icon } from '@iconify/react';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDemoUser = () => {
    dispatch(thunkLogin({email:"demo@aa.io", password:"password"}))
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-form-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-inputs-div">
            <Icon icon="material-symbols:person" width="30" height="30"/>
            <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          {errors.email && <p className="errors-text">{errors.email}</p>}

            <Icon icon="solar:lock-bold" width="25" height="25" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {errors.password && <p className="errors-text">{errors.password}</p>}
        </div>
        <div className="login-form-buttons-div">
          <button type="submit">Log In</button>
          <button onClick={handleDemoUser} style={{backgroundColor:"#000000", color:"#FFFFFF"}}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
