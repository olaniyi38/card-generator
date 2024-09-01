import { FC } from "react";

type Props = {
  type?: "shuriken" | "spinner";
  full?: boolean;
};

const Loader: FC<Props> = ({ type = "shuriken", full = false }) => {
  return (
    <div className={`loader-container ${full ? "loader-container--full" : ""}`}>
      <div className={`loader-${type}`}></div>
    </div>
  );
};

export default Loader;
