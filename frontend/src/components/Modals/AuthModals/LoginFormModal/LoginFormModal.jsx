/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { thunkLogin } from "../../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import OpenModalMenuItem from "../../../../utils/OpenModalMenuItem";
import SignupFormModal from "../SignupFormModal";
import { Icon } from '@iconify/react';
import formErrorsObj from "../../../../utils/formErrorsObj";
import "./LoginFormModal.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const frontEndErrors = {};
    if (isFormSubmitted) {
      if (!email) frontEndErrors.email = "Input is required";
      if (!password) frontEndErrors.password = "Input is required";
    }
    setErrors(frontEndErrors)
  }, [email, isFormSubmitted, password]);

  const handleDemoUser = async (e) => {
    e.preventDefault();
    dispatch(thunkLogin({email:"demo@aa.io", password:"password"}));
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(thunkLogin({email: email, password: password}));
    if (res.error) {
      setIsFormSubmitted(true);
      setShowErrors(true);
      if (res.error.message) {
        setBackendErrors(formErrorsObj(res.error.message));
      } else {
        setBackendErrors({});
      }
    } else {
      setShowErrors(false);
      setBackendErrors({});
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
          <div className="login-email">
            <Icon icon="material-symbols:person" width="30" height="30"/>
              <input
                  type="text"
                  id="login-email-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              {showErrors && backendErrors?.email && (
                  <div className="errors-div">
                      <p className="errors-text">{backendErrors.email}</p>
                  </div>
              )}  
              {showErrors && errors?.email && (
                  <div className="errors-div">
                      <p className="errors-text">{errors.email}</p>
                  </div>
              )}  
          </div>
          <div className="login-password">
            <Icon icon="solar:lock-bold" width="25" height="25" />
              <input
                type="password"
                id="login-password-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showErrors && backendErrors?.password && (
                  <div className="errors-div">
                      <p className="errors-text">{backendErrors.password}</p>
                  </div>
              )} 
              {showErrors && errors?.password && (
                  <div className="errors-div">
                      <p className="errors-text">{errors.password}</p>
                  </div>
              )}   
          </div>
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
}

export default LoginFormModal;