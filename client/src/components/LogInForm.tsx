import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const LogInForm = ({ setUser }) => {
  const { login } = useContext(AuthContext);
  const [FormNotify, setFormNotify] = useState("");
  const [isPasswordVisible, setShowPasswordVisible] = useState(false);
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HANDLE LOGIN SUBMISSIONS
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormNotify("");

    // Check if valid input
    if (!validateClientSideInput) {
      return;
    }

    // Logout user with AuthContext login
    await login(FormData);

    // Clear form data
    setFormData({ email: "", password: "" });
  }

  // HANdLE LOGIN INPUT CHANGES
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    // Update form state
    setFormData({
      ...FormData,
      [name]: value,
    });
  }

  // VALIDATES INPUT
  function validateClientSideInput() {
    //Check all inputs fulfilled
    if (FormData.email.length < 1 || FormData.password.length < 1) {
      setFormNotify("Invalid email or password");
      return true;
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded-md w-[500px] py-4 px-6 mt-4 drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear"
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={FormData.email}
          onChange={handleInputChange}
          className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
        />
        <label htmlFor="password" className="mt-4">
          Password
        </label>
        <div className="relative inline-block w-full">
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={FormData.password}
            onChange={handleInputChange}
            className="bg-tertiary-gray rounded-md p-2 pr-10 border border-solid border-secondary-gray w-full"
          />
          <span
            onClick={() =>
              isPasswordVisible
                ? setShowPasswordVisible(false)
                : setShowPasswordVisible(true)
            }
            className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-full mt-4 pr-4 font-bold">
          log in
        </button>

        <p className="text-center mt-2">
          Don't have an account?&nbsp;
          <span className="underline cursor-pointer" onClick={setUser}>
            Click here
          </span>
        </p>
      </form>
      <p className="text-center font-bold text-primary-red mt-2">
        &nbsp;{FormNotify}&nbsp;
      </p>
    </>
  );
};

export default LogInForm;
