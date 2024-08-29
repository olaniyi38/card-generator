import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  imageURL: string | null;
  name: string;
};

const Steps: FC<Props> = ({ imageURL, name }) => {
  return (
    <div className="steps">
      <div className="container">
        <div className={`steps__step ${imageURL !== null ? "done" : ""}`}>
          <FaCheckCircle className="steps__check-svg" />
          <span>Select an image below</span>
        </div>
        <div className={`steps__step ${name !== "" ? "done" : ""}`}>
          <FaCheckCircle className="steps__check-svg" />
          <span>Type your name</span>
        </div>
        <div className={`steps__step`}>GENERATE!</div>
      </div>
    </div>
  );
};

export default Steps;
