import { useState } from "react";
import { thunkLogin } from "../../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import OpenModalMenuItem from "../../../../utils/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import { Icon } from '@iconify/react';
import "./LoginFormModal.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDemoUser = async (e) => {
    e.preventDefault();
    dispatch(thunkLogin({email:"demo@aa.io", password:"password"}));
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
  }
  
  return (
    <div className="login-form-wrapper">
      <div className="login-form-heading-div">
        <h1>Log In</h1>
        <div className="login-form-close-modal-div" onClick={()=> closeModal()}>
          <Icon 
            icon="material-symbols-light:close" 
            width="25" 
            height="25" 
          />
        </div>
      </div>
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
      <div className="create-account-div">
          <h4>Don't have an account?</h4>
          <OpenModalMenuItem
            itemText="Create one."
            modalComponent={<SignupFormModal/>}
            className="create-account-link"
          />
      </div>
    </div>
  )
};

export default LoginFormModal;