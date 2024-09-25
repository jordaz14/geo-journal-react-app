import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postData, serverUrl } from "../utils/fetch";
import { RegisterFormData, RegisterResponse } from "../types/types";

const RegisterForm = ({ setUser }: any) => {
  const [FormNotify, setFormNotify] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isPasswordVisible, setShowPasswordVisible] = useState(false);
  const [FormData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // HANDLE REGISTRATION SUBMISSIONS
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormNotify("");
    setButtonLoading(true);

    // Check if valid input
    if (!validateClientSideInput()) {
      setButtonLoading(false);
      return;
    }

    // Send form data to registration endpoint
    postData(`${serverUrl}/register`, FormData).then(
      (response: RegisterResponse) => {
        // If successful, reload page to login prompt
        if (response.isRegistered) {
          window.location.reload();
        } else {
          setFormNotify(response.message);
        }

        setButtonLoading(false);
      }
    );
  }

  // HANDLE REGISTRATION INPUT CHANGES
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...FormData,
      [name]: value,
    });
  }

  // VALIDATES INPUT
  function validateClientSideInput() {
    //Check all inputs fulfilled
    for (const prop in FormData) {
      if (FormData[prop as keyof RegisterFormData].length < 1) {
        setFormNotify("Invalid username, email, or password");
        return false;
      }
    }

    // Check matching passwords
    if (FormData.password != FormData.confirmPassword) {
      setFormNotify("Passwords do not match");
      return false;
    }

    return true;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded-md w-full sm:w-[500px] py-4 px-6 mt-4 drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear"
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={FormData.username}
          onChange={handleInputChange}
          className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
        />
        <label htmlFor="email" className="mt-4">
          Email
        </label>
        <input
          type="email"
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
        <label htmlFor="confirmPassword" className="mt-4">
          Confirm Password
        </label>
        <div className="relative inline-block w-full">
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={FormData.confirmPassword}
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
        <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-full mt-4 font-bold h-[40px] flex justify-center">
          {isButtonLoading ? <div id="loader-white"></div> : <p>register</p>}
        </button>
        <p className="text-center mt-2">
          Have an account?&nbsp;
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

export default RegisterForm;
