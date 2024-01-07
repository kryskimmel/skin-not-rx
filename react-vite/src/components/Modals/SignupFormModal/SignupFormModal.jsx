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
  const [profileImage, setProfileImage] = useState("");
  const [skinType, setSkinType] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  // const [disableSubmit, setDisableSubmit] = useState(true)
  const { closeModal } = useModal();


  // useEffect to track validation errors
  useEffect(() => {
    const validationErrors = {}

    const nameFormat = /^[a-zA-Z][a-zA-Z ]*$/;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const usernameFormat= /^[A-Za-z0-9][A-Za-z0-9_-]*[A-Za-z0-9]$/;

    const inputRequired = "Input is required."
    const cannotStartWithSpaces = "Input cannot begin with a space."
    const maxChar15 = "Input must not exceed 15 characters."
    const maxChar60 = "Input must not exceed 60 characters."
    const maxChar255 = "Input must not exceed 255 characters."
    const minChar3 = "Input must be at least 3 characters long."
    const passwordLength = "Password must be at least 6 characters long."
    const emailFormatError = "Not a valid email."
    const usernameFormatError = "Not a valid username."
    const nameFormatError = "Input can only contain letters and spaces in between words."

    if (!firstName) validationErrors.firstName = inputRequired;
    else if (firstName.startsWith(" ")) validationErrors.firstName = cannotStartWithSpaces;
    else if (!nameFormat.test(firstName)) validationErrors.firstName = nameFormatError;
    else if (firstName.length > 15) validationErrors.firstName = maxChar15;
    else if (firstName.length < 3) validationErrors.firstName = minChar3;

    if (!lastName) validationErrors.lastName = inputRequired;
    if (lastName.startsWith(" ")) validationErrors.lastName = cannotStartWithSpaces;
    if (nameFormat.test(!lastName)) validationErrors.lastName = nameFormatError;
    if (lastName.length > 15) validationErrors.lastName = maxChar15;
    if (lastName.length < 3) validationErrors.lastName = minChar3;

    if (!username) validationErrors.username = inputRequired;
    if (username.startsWith(" ")) validationErrors.username = cannotStartWithSpaces;
    if (!usernameFormat.test(username)) validationErrors.username = usernameFormatError;
    if (username.length > 15) validationErrors.username = maxChar15;
    if (username.length < 3) validationErrors.username = minChar3;

    if (!email) validationErrors.email = inputRequired;
    if (email.startsWith(" ")) validationErrors.email = cannotStartWithSpaces;
    if (!emailFormat.test(email)) validationErrors.email = emailFormatError;
    if (email.length > 60) validationErrors.email = maxChar60;

    if (!password) validationErrors.password = inputRequired;
    if (password.startsWith(" ")) validationErrors.password = cannotStartWithSpaces;
    if (password.length < 6) validationErrors.password = passwordLength;
    if (password.length > 15) validationErrors.password = maxChar15;

    if (!profileImage) validationErrors.profileImage = inputRequired;
    if ( profileImage.startsWith(" ")) validationErrors.profileImage = cannotStartWithSpaces;
    if ( profileImage.length > 255) validationErrors.profileImage = maxChar255;

    if (!skinType) validationErrors.skinType = inputRequired;
    if (skinType.startsWith(" ")) validationErrors.skinType = cannotStartWithSpaces;
    if (skinType.length > 255) validationErrors.skinType = maxChar255;

    setErrors(validationErrors);
  }, [dispatch, firstName, lastName, username, email, password, profileImage, skinType])



  console.log('before submit user:', {
    firstName,
    lastName,
    email,
    username,
    password,
    profileImage,
    skinType
  })

// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true)

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    const serverResponse = await dispatch(
      thunkSignup({
        'first_name': firstName,
        'last_name': lastName,
        'username': username,
        'email': email,
        'password': password,
        'profile_image': profileImage,
        'skin_type': skinType
      })
    );
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-form-wrapper">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form-div">
        <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          {showErrors && errors.firstName && <p className="errors-text">{errors.firstName}</p>}


          <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          {showErrors && errors.lastName && <p className="errors-text">{errors.lastName}</p>}


          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        {showErrors && errors.username && <p className="errors-text">{errors.username}</p>}


        <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {showErrors && errors.email && <p className="errors-text">{errors.email}</p>}


        <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {showErrors && errors.password && <p className="errors-text">{errors.password}</p>}


        <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {showErrors && errors.confirmPassword && <p className="errors-text">{errors.confirmPassword}</p>}


        <label>Profile Image</label>
          <input
            type="file"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            required
          />
        {showErrors && errors.profileImage && <p className="errors-text">{errors.profileImage}</p>}


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
        {showErrors && errors.skinType && <p className="errors-text">{errors.skinType}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
