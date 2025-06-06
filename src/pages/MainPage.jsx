import { useState } from "react";
import Balance from "../components/Balance/Balance";
import Header from "../components/Header/Header";
import { Jokes } from "../components/Jokes/JokesCall";
import Report from "../components/Report/Report";

const MainPage = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <Jokes onJokeClose={() => setShowTooltip(true)} />
      <Header />
      <Balance showTooltip={showTooltip} />
      <Report />
    </>
  );
};

export default MainPage;
