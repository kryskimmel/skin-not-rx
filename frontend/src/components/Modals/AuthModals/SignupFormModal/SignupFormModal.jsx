import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { thunkSignup } from "../../../../redux/session";
import { Icon } from "@iconify/react";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [profileImage, setProfileImage] = useState(""); // to be displayed on frontend
  const [skinType, setSkinType] = useState("");
  const [imgUrl, setImgUrl] = useState(""); // to be sent to AWS
  const [frontendErrors, setFrontendErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();
  const submitButtonCN = isDisabled ? "disabled-signup-submit-button" : "enabled-signup-submit-button"  // toggle submit button classname


  useEffect(() => {
    if (submittedForm && Object.values(frontendErrors).length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false)
    }
  }, [backendErrors, frontendErrors, submittedForm]);


  const addImage = async (e) => {  // function to prepare image for sending to AWS S3
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setProfileImage(reader.result);
      }
      setImgUrl(file);
      setShowImage(true);
    } else {
      setImgUrl(null);
      setShowImage(false);
      setProfileImage(null);
    }
  };


  useEffect(() => {
    const validationErrors = {}
    const nameFormat = /^[a-zA-Z]+$/;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const usernameFormat = /^[A-Za-z0-9][A-Za-z0-9_-]*[A-Za-z0-9]$/;
    const inputRequired = "Input is required."
    const cannotStartWithSpaces = "Input cannot begin with a space."
    const maxChar15 = "Input must not exceed 15 characters."
    const maxChar60 = "Input must not exceed 60 characters."
    const maxChar255 = "Input must not exceed 255 characters."
    const minChar3 = "Input must be at least 3 characters long."
    const passwordLength = "Password must be at least 6 characters long."
    const emailFormatError = "Not a valid email."
    const usernameFormatError = "Not a valid username."
    const nameFormatError = "Input can only contain letters."

    if (!firstName) validationErrors.firstName = inputRequired;
    else if (firstName.startsWith(" ")) validationErrors.firstName = cannotStartWithSpaces;
    else if (firstName.length > 15) validationErrors.firstName = maxChar15;
    else if (!nameFormat.test(firstName)) validationErrors.firstName = nameFormatError;

    if (!lastName) validationErrors.lastName = inputRequired;
    else if (lastName.startsWith(" ")) validationErrors.lastName = cannotStartWithSpaces;
    else if (lastName.length > 15) validationErrors.lastName = maxChar15;
    else if (!nameFormat.test(lastName)) validationErrors.lastName = nameFormatError;

    if (!username) validationErrors.username = inputRequired;
    else if (username.startsWith(" ")) validationErrors.username = cannotStartWithSpaces;
    else if (username.length < 3) validationErrors.username = minChar3;
    else if (username.length > 15) validationErrors.username = maxChar15;
    else if (!usernameFormat.test(username)) validationErrors.username = usernameFormatError;

    if (!email) validationErrors.email = inputRequired;
    else if (email.startsWith(" ")) validationErrors.email = cannotStartWithSpaces;
    else if (email.length < 3) validationErrors.email = minChar3;
    else if (email.length > 60) validationErrors.email = maxChar60;
    else if (!emailFormat.test(email)) validationErrors.email = emailFormatError;

    if (!password) validationErrors.password = inputRequired;
    else if (password.startsWith(" ")) validationErrors.password = cannotStartWithSpaces;
    else if (password.length < 6) validationErrors.password = passwordLength;
    else if (password.length > 15) validationErrors.password = maxChar15;

    if (password !== confirmPassword) validationErrors.confirmPassword = "Confirm Password field must be the same as the Password field";

    if (!profileImage) validationErrors.profileImage = inputRequired;

    if (!skinType) validationErrors.skinType = inputRequired;
    else if (skinType.startsWith(" ")) validationErrors.skinType = cannotStartWithSpaces;
    else if (skinType.length > 255) validationErrors.skinType = maxChar255;

    setFrontendErrors(validationErrors);
  }, [dispatch, firstName, lastName, username, email, password, confirmPassword, profileImage, skinType]);

  useEffect(() => {
    setShowErrors(Object.values(frontendErrors).length > 0);
  }, [frontendErrors, backendErrors]);


  const handleSubmit = async (e) => {    // handle form submission
    e.preventDefault()
    setSubmittedForm(true);
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_image", imgUrl);
    formData.append("skin_type", skinType)

    const data = await dispatch(thunkSignup(formData));
    if (data) {
      setBackendErrors(data)
    } else {
      closeModal();
    };
  };


  return (
    <div className="signup-form-wrapper">
      <div className="signup-form-heading-div">
        <h1>Sign Up</h1>
        <div className="signup-form-close-modal-div" onClick={()=> closeModal()}>
          <Icon 
            icon="material-symbols-light:close" 
            width="25" 
            height="25" 
          />
        </div>
      </div>
      {/* {backendErrors.server && <p>{backendErrors.server}</p>} */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="signup-form-div">
        <div className="signup-section" id="signup-sec-1">
          <div className="first-name-div">
            <label>First Name<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName((e.target.value).trim())}
              className="signup-input"
              required
            />
            {showErrors && submittedForm && frontendErrors?.firstName && (
              <div className="errors-div">
                <p className="errors-text">{frontendErrors.firstName}</p>
              </div>
            )}
          </div>
      
          <div className="last-name-div">
            <label>Last Name<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName((e.target.value).trim())}
              className="signup-input"
              required
            />
            {showErrors && submittedForm && frontendErrors?.lastName && (
              <div className="errors-div">
                <p className="errors-text">{frontendErrors.lastName}</p>
              </div>
            )}
          </div>
        </div>
       
        <div className="signup-section" id="signup-sec-2">
          <div className="username-div">
            <label>Username<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername((e.target.value).trim())}
              className="signup-input"
              required
            />
            {showErrors && submittedForm && frontendErrors?.username && (
              <div className="errors-div">
                <p className="errors-text">{frontendErrors.username}</p>
              </div>
            )}
          </div>
          <div className="email-div">
            <label>Email<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail((e.target.value).trim())}
              className="signup-input"
              required
            />
            {showErrors && submittedForm && frontendErrors?.email && (
              <div className="errors-div">
                <p className="errors-text">{frontendErrors.email}</p>
              </div>
            )}
          </div>
        </div>

        <div className="signup-section" id="signup-sec-3">
          <div className="password-div">
            <label>Password<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword((e.target.value).trim())}
              className="signup-input"
              required
            />
            {showErrors && submittedForm && frontendErrors?.password && (
              <div className="errors-div">
                <p className="errors-text">{frontendErrors.password}</p>
              </div>
            )}
          </div>
          <div className="confirm-password-div">
            <label>Confirm Password<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword((e.target.value).trim())}
              className="signup-input"
              required
            />
            {showErrors && submittedForm && frontendErrors?.confirmPassword && (
              <div className="errors-div">
                <p className="errors-text">{frontendErrors.confirmPassword}</p>
              </div>
            )}
          </div>
        </div>

        <div className="signup-section" id="signup-sec-4">
          <div className="profile-image-div">
            <label htmlFor="file-upload">Profile Image<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="file"
              id="file-upload"
              name="img_url"
              accept=".jpeg, .jpg, .png, .gif, .webp"
              onChange={addImage}
              style={{marginTop:"2px", cursor:"pointer"}}
              required
            />
            {showErrors && submittedForm && frontendErrors?.profileImage && (
              <div className="errors-div">
                <p className="errors-text">{frontendErrors.profileImage}</p>
              </div>
            )}
          </div>
          <div className="skin-type-div">
            <label>Skin Type<span style={{color: "#8B0000"}}>*</span></label>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="signup-input"
              required
            >
              <option value="" disabled>--Select your primary skin type--</option>
              <option value="Dry">Dry</option>
              <option value="Oily">Oily</option>
              <option value="Combination">Combination</option>
              <option value="Acne-Prone">Acne-Prone</option>
            </select>
            {showErrors && submittedForm && frontendErrors?.skinType && (
              <div className="errors-div">
                <p className="errors-text">{frontendErrors.skinType}</p>
              </div>
            )}
          </div>
        </div>
        <div className="selected-profile-image-div">
          {showImage ? (
            <img
              src={profileImage}
              alt="profile image"
              style={{ width: "100px", height: "100px", border: "2px solid #767676", borderRadius: "180%" }}
            /> ): 
            <img
            src="https://skin-not-rx-bucket.s3.us-east-2.amazonaws.com/splashpage/portrait-placeholder.png"
            alt="profile image"
            style={{ width: "100px", height: "100px", border: "2px solid #767676", borderRadius: "180%" }}
            />
          }
        </div>
        <div className="signup-submit-button-div">
          <button type="submit" className={submitButtonCN} disabled={isDisabled}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;