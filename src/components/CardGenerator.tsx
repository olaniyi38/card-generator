import { FC, useEffect, useRef, useState } from "react";
import Button from "./Button";
import adjustCanvas from "../utils/adjustCanvas";
import Steps from "./Steps";

type Props = {
  imageURL: string | null;
  openSelector: () => void;
};

const CardGenerator: FC<Props> = ({ imageURL, openSelector }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      adjustCanvas(canvas);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    //draw image automatically for s
    if (canvas && imageURL !== null && hasGenerated) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = imageURL;
      drawImage(canvas, image);
    }
  }, [imageURL]);

  function drawImage(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    //draw image onto canvas
    const ctx = canvas.getContext("2d");
    if (ctx !== null) {
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.font = `bold 4rem sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        //embed text
        ctx.fillText("Thank You", canvas.width / 2, 120);
        ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height - 50);
        setHasGenerated(true);
      };
    }
  }

  function createCard() {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      const ctx = canvas.getContext("2d");
      if (ctx && imageURL) {
        //create image
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = imageURL;
        drawImage(canvas, image);
      }
    }
  }

  function download() {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = `greeting-card-${name}.jpg`;
      link.href = canvas.toDataURL();
      link.click();
    }
  }

  return (
    <div className="generator">
      <div className="container">
        <div className="generator__canvas">
          {!hasGenerated && <Steps name={name} imageURL={imageURL} />}
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className="generator__actions">
          <div className="generator__input">
            <label htmlFor="#name">Enter name here:</label>
            <input
              id="name"
              ref={inputRef}
              placeholder="e.g John Doe"
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
          <div className="generator__buttons">
            <Button inverted disabled={name == "" || imageURL == null} onClick={() => createCard()}>
              Generate Card
            </Button>
            <Button disabled={!hasGenerated} onClick={() => download()}>
              Download
            </Button>
            <Button
              onClick={() => {
                openSelector();
              }}
            >
              Select Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;
