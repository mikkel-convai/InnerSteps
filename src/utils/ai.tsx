import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are a professional psychologist and a storyteller. Your job is to tell stories about how to handle emotions, 
for young people between ages 5 and 13. You will be given a list of keywords which will include a genre, some
emotions, and creatures. Base your story on those keywords. Feel free to add a h2 title
The answer you generate should be returned as markdown.
`;

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

// Make sure you set an environment variable in Scrimba
// for HF_ACCESS_TOKEN
const hf = new HfInference("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");

interface StoryProps {
  genres: string[];
  emotions: string[];
  creatures: string[];
}

export async function getStoryFromMistral(elements: StoryProps) {
  const { genres, emotions, creatures } = elements;

  const elementString = `
    Genres: ${genres.join(", ")},
    Emotions: ${emotions.join(", ")},
    Creatures: ${creatures.join(", ")}
  `;

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Keywords: ${elementString}. Please give me a story based on these keywords.`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error("Error fetching recipe:", err);
    throw err;
  }
}
