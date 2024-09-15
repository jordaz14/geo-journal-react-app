import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LogInForm({ isUser, setUser }) {
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [FormError, setFormError] = useState("");
  const [isPasswordVisible, setShowPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfError()) {
      return;
    }

    setFormData({ username: "", password: "" });
    setFormError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const checkIfError = () => {
    if (FormData.username.length < 1 || FormData.password.length < 1) {
      setFormError("Invalid username or password");
      return true;
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded-md w-[500px] py-4 px-6 mt-4 drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear"
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={FormData.username}
          onChange={handleInputChange}
          className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
        />
        <label htmlFor="" className="mt-4">
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
        <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-full mt-4 pr-4">
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
        &nbsp;{FormError}&nbsp;
      </p>
    </>
  );
}

export default LogInForm;
