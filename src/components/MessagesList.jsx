import { useAITeacher } from "@/hooks/useAITeacher";
import { useEffect, useRef } from "react";

export const MessagesList = () => {
  const messages = useAITeacher((state) => state.messages);
  const playMessage = useAITeacher((state) => state.playMessage);
  const stopMessage = useAITeacher((state) => state.stopMessage);
  const { currentMessage } = useAITeacher();
  const speech = useAITeacher((state) => state.speech);
  const classroom = useAITeacher((state) => state.classroom);

  const container = useRef();

  useEffect(() => {
    container.current.scrollTo({
      top: container.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  return (
    <div
      className={`${
        classroom === "default"
          ? "w-[1288px] h-[676px]"
          : "w-[2528px] h-[856px]"
      } p-8 overflow-y-auto flex flex-col space-y-8 bg-transparent opacity-80`}
      ref={container}
    >
      {messages.length === 0 && (
        <div className="h-full w-full grid place-content-center text-center">
          <h2 className="text-8xl font-bold text-white/90 italic">
            AI Teacher
            <br />
            Interactive Learning
          </h2>
        </div>
      )}
      {messages.map((message, i) => (
        <div key={i}>
          <div className="flex">
            <div className="flex-grow">
              <div className="flex items-center gap-3">
                <span
                  className={`text-white/90 text-2xl font-bold uppercase px-3 py-1 rounded-full ${
                    message.speech === "formal"
                      ? "bg-indigo-600"
                      : "bg-teal-600"
                  }`}
                >
                  {message.speech}
                </span>
                <h3 className="text-4xl inline-block px-2 rounded-sm font-bold text-white/90">
                  {message.answer.topic}
                </h3>
              </div>

              <div className="mt-4 text-white text-3xl">
                {message.answer.answer}
              </div>
            </div>
            {currentMessage === message ? (
              <button
                className="text-white/65"
                onClick={() => stopMessage(message)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="text-white/65"
                onClick={() => playMessage(message)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
              </button>
            )}
          </div>
          
          {message.answer.additionalInfo && (
            <div className="p-5 mt-5 bg-gradient-to-br from-blue-200/20 to-blue-500/20 rounded-xl">
              <span className="pr-4 italic bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-3xl font-bold uppercase inline-block">
                Additional Information
              </span>
              <div className="mt-3 text-white/90 text-2xl">
                {message.answer.additionalInfo}
              </div>
            </div>
          )}
          
          {message.answer.example && message.answer.example.length > 0 && (
            <div className="p-5 mt-5 bg-gradient-to-br from-green-200/20 to-green-500/20 rounded-xl">
              <span className="pr-4 italic bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-3xl font-bold uppercase inline-block">
                Examples
              </span>
              <div className="mt-3">
                {message.answer.example.map((ex, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-green-300/90 text-2xl font-bold">{ex.scenario}</p>
                    <p className="text-white/90 text-2xl">{ex.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {message.answer.followUpQuestion && (
            <div className="p-5 mt-5 bg-gradient-to-br from-purple-200/20 to-purple-500/20 rounded-xl">
              <span className="pr-4 italic bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-3xl font-bold uppercase inline-block">
                Think About This
              </span>
              <div className="mt-3 text-white/90 text-2xl italic">
                {message.answer.followUpQuestion}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
