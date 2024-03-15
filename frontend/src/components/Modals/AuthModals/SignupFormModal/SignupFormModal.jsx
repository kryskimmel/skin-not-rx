import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { thunkSignup } from "../../../../redux/session";
import { Icon } from "@iconify/react";
import formErrorsObj from "../../../../utils/formErrorsObj";
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
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();
  const submitButtonCN = isDisabled ? "disabled-signup-submit-button" : "enabled-signup-submit-button"  // toggle submit button classname


  useEffect(() => {
    if (isFormSubmitted && Object.values(errors).length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false)
    }
  }, [backendErrors, errors, isFormSubmitted]);


  const addImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
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
    const inputRequiredError = "Input is required";
    const beginningSpacesError = "Input cannot begin with a space";
    const charMax255Error = "Input must not exceed 255 characters";
    const charMax20Error = "Input must not exceed 20 characters";
    const charMin2Error = "Input must be at least 2 characters long";
    const charMin4Error = "Input must be at least 4 characters long";
    const passwordMinError = "Password must be at least 8 characters long";
    const lettersOnlyFormatError = "Input can only contain letters";
    const emailFormatError = "Not a valid email";
    const usernameFormatError = "Not a valid username";


    if (!firstName) validationErrors.firstName = inputRequiredError;
    else if (firstName.startsWith(" ")) validationErrors.firstName = beginningSpacesError;
    else if (firstName.length > 20) validationErrors.firstName = charMax20Error;
    else if (firstName.length < 2) validationErrors.firstName = charMin2Error;
    else if (!nameFormat.test(firstName)) validationErrors.firstName = lettersOnlyFormatError;

    if (!lastName) validationErrors.lastName = inputRequiredError;
    else if (lastName.startsWith(" ")) validationErrors.lastName = beginningSpacesError;
    else if (lastName.length > 20) validationErrors.lastName = charMax20Error;
    else if (lastName.length < 2) validationErrors.lastName = charMin2Error;
    else if (!nameFormat.test(lastName)) validationErrors.lastName = lettersOnlyFormatError;

    if (!username) validationErrors.username = inputRequiredError;
    else if (username.startsWith(" ")) validationErrors.username = beginningSpacesError;
    else if (username.length > 20) validationErrors.username = charMax20Error;
    else if (username.length < 4) validationErrors.username = charMin4Error;
    else if (!usernameFormat.test(username)) validationErrors.username = usernameFormatError;

    if (!email) validationErrors.email = inputRequiredError;
    else if (email.startsWith(" ")) validationErrors.email = beginningSpacesError;
    else if (email.length > 20) validationErrors.email = charMax20Error;
    else if (email.length < 4) validationErrors.email = charMin4Error;
    else if (!emailFormat.test(email)) validationErrors.email = emailFormatError;

    if (!password) validationErrors.password = inputRequiredError;
    else if (password.startsWith(" ")) validationErrors.password = beginningSpacesError;
    else if (password.length > 255) validationErrors.password = charMax255Error;
    else if (password.length < 8) validationErrors.password = passwordMinError;


    if (password !== confirmPassword) validationErrors.confirmPassword = "Password inputs do not match";
    if (!profileImage) validationErrors.profileImage = inputRequiredError;
    if (!skinType) validationErrors.skinType = inputRequiredError;
 

    setErrors(validationErrors);
  }, [dispatch, firstName, lastName, username, email, password, confirmPassword, profileImage, skinType]);

  const handleFirstNameChange = (e) => {
    setFirstName((e.target.value).trim());
    setBackendErrors({ ...backendErrors, first_name: null });
  };

  const handleLastNameChange = (e) => {
    setLastName((e.target.value).trim());
    setBackendErrors({ ...backendErrors, last_name: null });
  };

  const handleUsernameChange = (e) => {
    setUsername((e.target.value).trim());
    setBackendErrors({ ...backendErrors, username: null });
  };

  const handleEmailChange = (e) => {
    setEmail((e.target.value).trim());
    setBackendErrors({ ...backendErrors, email: null });
  };

  const handlePasswordChange = (e) => {
    setPassword((e.target.value).trim());
    setBackendErrors({ ...backendErrors, password: null });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword((e.target.value).trim());
    setBackendErrors({ ...backendErrors, confirmPassword: null });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_image", imgUrl);
    formData.append("skin_type", skinType)

    const res = await dispatch(thunkSignup(formData));
    if (res.error) {
      setIsFormSubmitted(true);
      setShowErrors(true);
      if (res.error.message) {
        console.log('errorss??',res.error.message)
        setBackendErrors(formErrorsObj(res.error.message));
      } else {
        setBackendErrors({})
      }
    } else {
      setShowErrors(false);
      setBackendErrors({});
      setErrors({});
      closeModal();
    }
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
              onChange={handleFirstNameChange}
              className="signup-input"
              required
            />
            {showErrors && isFormSubmitted && errors?.firstName && (
              <div className="errors-div">
                <p className="errors-text">{errors.firstName}</p>
              </div>
            )}
          </div>
          <div className="last-name-div">
            <label>Last Name<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              className="signup-input"
              required
            />
            {showErrors && isFormSubmitted && errors?.lastName && (
              <div className="errors-div">
                <p className="errors-text">{errors.lastName}</p>
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
              onChange={handleUsernameChange}
              className="signup-input"
              required
            />
            {showErrors && backendErrors?.username && (
              <div className="errors-div">
                  <p className="errors-text">{backendErrors.username}</p>
              </div>
            )} 
            {showErrors && isFormSubmitted && errors?.username && (
              <div className="errors-div">
                <p className="errors-text">{errors.username}</p>
              </div>
            )}
          </div>
          <div className="email-div">
            <label>Email<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="signup-input"
              required
            />
            {showErrors && backendErrors?.email && (
              <div className="errors-div">
                  <p className="errors-text">{backendErrors.email}</p>
              </div>
            )} 
            {showErrors && isFormSubmitted && errors?.email && (
              <div className="errors-div">
                <p className="errors-text">{errors.email}</p>
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
              onChange={handlePasswordChange}
              className="signup-input"
              required
            />
            {showErrors && isFormSubmitted && errors?.password && (
              <div className="errors-div">
                <p className="errors-text">{errors.password}</p>
              </div>
            )}
          </div>
          <div className="confirm-password-div">
            <label>Confirm Password<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="signup-input"
              required
            />
            {showErrors && isFormSubmitted && errors?.confirmPassword && (
              <div className="errors-div">
                <p className="errors-text">{errors.confirmPassword}</p>
              </div>
            )}
          </div>
        </div>

        <div className="signup-section" id="signup-sec-4">
          <div className="profile-image-div">
            <label htmlFor="signup-file-upload">Profile Image<span style={{color: "#8B0000"}}>*</span></label>
            <input
              type="file"
              id="signup-file-upload"
              name="img_url"
              accept=".jpeg, .jpg, .png, .gif, .webp"
              onChange={addImage}
              style={{marginTop:"2px", cursor:"pointer"}}
              required
            />
            {showErrors && isFormSubmitted && errors?.profileImage && (
              <div className="errors-div">
                <p className="errors-text">{errors.profileImage}</p>
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
            {showErrors && isFormSubmitted && errors?.skinType && (
              <div className="errors-div">
                <p className="errors-text">{errors.skinType}</p>
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