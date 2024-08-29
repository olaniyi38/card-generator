import { useState } from "react";
import ImageSelector from "./components/ImageSelector";
import CardGenerator from "./components/CardGenerator";
import Header from "./components/Header";

function App() {
  const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
  const [selectorActive, setSelectorActive] = useState(false);

  const openSelector = () => {
    setSelectorActive(true);
  };

  const closeSelector = () => {
    setSelectorActive(false);
  };

  return (
    <main>
      <Header />
      <ImageSelector
        closeSelector={closeSelector}
        isActive={selectorActive}
        selectedImageURL={selectedImageURL}
        setSelectedImage={setSelectedImageURL}
      />
      <CardGenerator openSelector={openSelector} imageURL={selectedImageURL} />
    </main>
  );
}

export default App;
