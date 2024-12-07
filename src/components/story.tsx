import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getStoryFromMistral } from "../utils/ai";

interface StoryProps {
  genres: string[];
  emotions: string[];
  creatures: string[];
  resetLists: () => void;
}

export default function Story(props: StoryProps) {
  const [storyShown, setStoryShown] = useState<boolean>(false);
  const [story, setStory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading spinner

  async function getStory() {
    setIsLoading(true); // Start loading spinner
    try {
      const newStory: string | undefined = await getStoryFromMistral(props);
      if (newStory) {
        setStory(newStory);
      }
      setStoryShown(true);
    } catch (error) {
      console.error("Error fetching story:", error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  }

  function newStory() {
    props.resetLists();
    setStory("");
    setStoryShown(false);
  }

  return (
    <div className="story">
      {!storyShown ? (
        <>
          {isLoading ? (
            <div className="spinner"></div> // Show spinner while loading
          ) : (
            <button onClick={getStory}>Create Story</button>
          )}
        </>
      ) : (
        <>
          <ReactMarkdown>{story}</ReactMarkdown>
          <button onClick={newStory}>New Story</button>
        </>
      )}
    </div>
  );
}
