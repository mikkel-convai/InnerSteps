import { useState } from "react";
import ProfileList from "./profile_list";
import Story from "./story";

export default function Profiling() {
  const [genres, setGenres] = useState<string[]>([]);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [creatures, setCreatures] = useState<string[]>([]);

  const addItem = (type: string, item: string) => {
    if (type === "genres") {
      setGenres((prev) => [...prev, item]);
    } else if (type === "emotions") {
      setEmotions((prev) => [...prev, item]);
    } else if (type === "creatures") {
      setCreatures((prev) => [...prev, item]);
    }
  };

  function resetLists() {
    setGenres([]);
    setEmotions([]);
    setCreatures([]);
  }

  const isFilled: boolean =
    genres.length > 0 && emotions.length > 0 && creatures.length > 0;

  return (
    <>
      <div className="list-div">
        <ProfileList
          name="genres"
          label="Genres"
          items={genres}
          addItem={addItem}
        />

        <ProfileList
          name="emotions"
          label="Emotions"
          items={emotions}
          addItem={addItem}
        />

        <ProfileList
          name="creatures"
          label="Creatures"
          items={creatures}
          addItem={addItem}
        />
      </div>
      {isFilled && (
        <Story
          genres={genres}
          emotions={emotions}
          creatures={creatures}
          resetLists={resetLists}
        />
      )}
    </>
  );
}
