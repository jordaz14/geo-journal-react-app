import NavBar from "../components/NavBar";
import MainContainer from "../components/MainContainer";

function Account() {
  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <h1 className="text-4xl font-bold">welcome back</h1>
        <form
          action=""
          className="flex flex-col bg-white rounded-md w-[500px] py-4 px-6 mt-4 drop-shadow-sm hover:drop-shadow-2xl transition duration-500 linear"
        >
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
          />
          <label htmlFor="" className="mt-4">Password</label>
          <input
            type="password"
            name="password"
            className="bg-tertiary-gray rounded-md p-2 border border-solid border-secondary-gray"
          />
          <button className="bg-primary-red text-white py-2 px-4 rounded-md shadow-sm w-full mt-4">
            log in
          </button>
          <p className="text-center mt-2">Don't have an account? Click here.</p>
        </form>
      </MainContainer>
    </>
  );
}

export default Account;
