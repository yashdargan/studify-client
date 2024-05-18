import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { styles } from "../styles/style";

const Gpt: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [generatingAnswer, setGeneratingAnswer] = useState<boolean>(false);

  async function generateAnswer(e: React.FormEvent) {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer("Loading your answer... \n It might take up to 10 seconds");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-900 h-screen p-3 text-black dark:text-white">
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 dark:bg-gray-800 py-2"
      >
        <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank" rel="noopener noreferrer">
          <h1 className={`${styles.title} text-3xl 800px:!text-[45px]`}>
            Studify GPT
          </h1>
        </a>
        <textarea
          required
          className="border rounded w-11/12 my-2 min-h-fit p-3"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask anything"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
          disabled={generatingAnswer}
        >
          {generatingAnswer ? "Generating..." : "Generate answer"}
        </button>
      </form>
      <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-50 dark:bg-gray-800 my-1">
        <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Gpt;


