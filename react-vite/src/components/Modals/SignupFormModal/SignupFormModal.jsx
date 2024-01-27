import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkSignup } from "../../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // To be sent to AWS
  const [imgUrl, setImgUrl] = useState("");
  // To determine if image should be displayed
  const [showImage, setShowImage] = useState(true);
  // To display with React
  const [profileImage, setProfileImage] = useState("");
  const [skinType, setSkinType] = useState("");
  const [frontendErrors, setFrontendErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();


  // Toggle submit button classname
  const submitButtonCN = isDisabled ? "disabled-submit-button" : "enabled-submit-button"

  // useEffect to that will set IsDisabled status to true if required fields are not empty
  useEffect(() => {
    // if (submittedForm && (Object.values(backendErrors).length > 0 || Object.values(frontendErrors).length > 0)) {
    if (submittedForm && Object.values(frontendErrors).length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false)
    }
  }, [backendErrors, frontendErrors, submittedForm]);

  // Function to add AWS image
  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setProfileImage(reader.result);
    }
    setImgUrl(file);
    setShowImage(false);
  }


  // useEffect to track validation errors
  useEffect(() => {
    const validationErrors = {}

    const nameFormat = /^[a-zA-Z]+$/;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const usernameFormat = /^[A-Za-z0-9][A-Za-z0-9_-]*[A-Za-z0-9]$/;
    // const imgFormats = [
    //   ".jpg",
    //   ".png",
    //   "jpeg",
    // ];

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
    // const imgFormatError = "Image must be in one of the following formats: .jpg, .jpeg or .png";

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
    // else if (profileImage.startsWith(" ")) validationErrors.profileImage = cannotStartWithSpaces;
    // else if (profileImage.startsWith(".")) validationErrors.profileImage = "Input cannot begin with a '.'";

    if (!skinType) validationErrors.skinType = inputRequired;
    else if (skinType.startsWith(" ")) validationErrors.skinType = cannotStartWithSpaces;
    else if (skinType.length > 255) validationErrors.skinType = maxChar255;

    setFrontendErrors(validationErrors);
  }, [dispatch, firstName, lastName, username, email, password, confirmPassword, profileImage, skinType])

  useEffect(() => {
    setShowErrors(Object.values(frontendErrors).length > 0);
  }, [frontendErrors, backendErrors]);


  // Handle form submission
  const handleSubmit = async (e) => {
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
    }


    // const data = await dispatch(thunkSignup({
    //   'first_name': firstName,
    //   'last_name': lastName,
    //   'username': username,
    //   'email': email,
    //   'password': password,
    //   'profile_image': imgUrl,
    //   'skin_type': skinType
    // }));
    // if (data) {
    //   setBackendErrors(data)
    // } else {
    //   closeModal();
    // }
  };

  console.log('backend errors', backendErrors)


  return (
    <div className="signup-form-wrapper">
      <h1>Sign Up</h1>
      {backendErrors.server && <p>{backendErrors.server}</p>}
      <form
        onSubmit={handleSubmit}
        // encType="multipart/form-data"
        className="signup-form-div">
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName((e.target.value).trim())}
          required
        />
        {showErrors && submittedForm && frontendErrors?.firstName && (<p className="errors-text">{frontendErrors.firstName}</p>)}


        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName((e.target.value).trim())}
          required
        />
        {showErrors && submittedForm && frontendErrors?.lastName && (<p className="errors-text">{frontendErrors.lastName}</p>)}


        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername((e.target.value).trim())}
          required
        />
        {showErrors && submittedForm && frontendErrors?.username && (<p className="errors-text">{frontendErrors.username}</p>)}


        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail((e.target.value).trim())}
          required
        />
        {showErrors && submittedForm && frontendErrors?.email && (<p className="errors-text">{frontendErrors.email}</p>)}


        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword((e.target.value).trim())}
          required
        />
        {showErrors && submittedForm && frontendErrors?.password && (<p className="errors-text">{frontendErrors.password}</p>)}


        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword((e.target.value).trim())}
          required
        />
        {showErrors && submittedForm && frontendErrors?.confirmPassword && (<p className="errors-text">{frontendErrors.confirmPassword}</p>)}


        <label htmlFor="file-upload">Profile Image</label>
        <input
          type="file"
          id="file-upload"
          name="img_url"
          accept=".jpeg, .jpg, .png, .gif, .webp"
          // value={profileImage}
          onChange={updateImage}
          required
        />
        {showErrors && submittedForm && frontendErrors?.profileImage && (<p className="errors-text">{frontendErrors.profileImage}</p>)}
        {!showImage && (
          <div className="profile-img-div">
            <img
              src={profileImage}
              alt="profile image"
              style={{ width: "100px", height: "100px", border: "1px solid black", borderRadius: "180%" }}
            />
          </div>
        )}

        <label>Skin Type</label>
        <select
          value={skinType}
          onChange={(e) => setSkinType(e.target.value)}
          required
        >
          <option value="" disabled>--Select your primary skin type--</option>
          <option value="Dry">Dry</option>
          <option value="Oily">Oily</option>
          <option value="Combination">Combination</option>
          <option value="Acne-Prone">Acne-Prone</option>
        </select>
        {showErrors && submittedForm && frontendErrors?.skinType && (<p className="errors-text">{frontendErrors.skinType}</p>)}

        <button type="submit" className={submitButtonCN} disabled={isDisabled}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
