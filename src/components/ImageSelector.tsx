import { FC, SetStateAction, Dispatch, useEffect } from "react";
import useFetchPhotos from "../hooks/fetchPhotos";
import Loader from "./Loader";
import Button from "./Button";

type Props = {
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  selectedImageURL: string | null;
  isActive: boolean;
  closeSelector: () => void;
};

const ImageSelector: FC<Props> = ({ isActive, selectedImageURL, setSelectedImage, closeSelector }) => {
  const {
    fetchFn,
    state: { photos, isLoading, error },
  } = useFetchPhotos();

  useEffect(() => {
    fetchFn();
  }, []);

   return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeSelector();
        }
      }}
      className={`selector ${isActive ? "active" : ""}`}
    >
      <div className="container">
        {error && !isLoading && <p className="error">error: {error}</p>}
        <div className="selector__grid">
          {isLoading && <Loader />}
          {photos.map((p) => (
            <div
              className={`selector__img-container  ${selectedImageURL ? selectedImageURL === p.urls.regular && "active" : ""}`}
            >
              <img
                onClick={() => setSelectedImage(p.urls.regular)}
                key={p.id}
                src={p.urls.regular}
                alt={p.alt_description ? p.alt_description : ""}
                className={`selector__img`}
              ></img>
            </div>
          ))}
        </div>

        <div className="selector__actions">
          <button
            className="button"
            disabled={isLoading}
            onClick={() => {
              fetchFn();
            }}
          >
            {error === null ? "More" : "Retry"}
          </button>

          <Button className="button" inverted onClick={() => closeSelector()}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
