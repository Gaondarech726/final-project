import Header from "../components/Header/Header";
import Report from "../components/Report/Report";
import Balance from "./../components/Balance/Balance";
import { Jokes } from "./../components/Jokes/JokesCall";

const MainPage = () => {
  return (
    <>
      <Jokes />
      <Header />
      <Balance />
      <Report />
    </>
  );
};

export default MainPage;
