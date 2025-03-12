"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageType = "info" | "error" | "progress";
type AnalysisPhase = "준비" | "처리" | "분석" | "완료";

interface UIMessage {
  text: string;
  type: MessageType;
  timestamp: number;
  phase?: AnalysisPhase;
  code?: string;
}

interface AnalysisData {
  message?: string;
  error?: string;
  code?: string;
  phase?: AnalysisPhase;
  timestamp?: string;
  type?: string;
  content?: any;
  data?: any;
  uiType?: string;
  uiArgs?: any;
}

interface UIGenerationData {
  type: string;
  uiType: string;
  uiArgs: {
    title: string;
    description: string;
    placeholder: string;
  };
}

const MAX_TEXT_LENGTH = 1000;
const MIN_TEXT_LENGTH = 10;

export default function AnalysisForm() {
  const [feedbackResponses, setFeedbackResponses] = useState<
    Record<string, string>
  >({});
  const { data, input, handleInputChange, handleSubmit, status, stop } =
    useChat({
      api: "http://localhost:3001/analysis/openai",
      body: {
        text: "HelloHelloHelloHelloHello",
      },
    });

  // 피드백 입력 처리 함수
  const handleFeedbackChange = (id: string, value: string) => {
    setFeedbackResponses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 피드백 제출 함수
  const submitFeedback = (id: string) => {
    console.log(`피드백 제출: ${id}`, feedbackResponses[id]);
    // 여기에 피드백을 서버로 전송하는 로직 추가
    // 예: API 호출 등
  };

  // 메시지를 그룹화하는 함수 추가
  const groupMessages = useCallback((messages: AnalysisData[]) => {
    if (!messages || messages.length === 0) return [];

    const groupedMessages: AnalysisData[] = [];
    let currentMessage: AnalysisData = { message: "" };

    messages.forEach((item) => {
      // UI 생성 타입 처리
      if (item.type === "ui-generation") {
        if (item.data && item.data.type === "ui-generation") {
          groupedMessages.push({
            type: "ui-generation",
            uiType: item.data.uiType,
            uiArgs: item.data.uiArgs,
          });
        }
        return;
      }

      // message-endline을 만나면 새 메시지 시작
      if (item.type === "message-endline") {
        if (currentMessage.message) {
          groupedMessages.push({ ...currentMessage });
        }
        currentMessage = { message: "" };
        return;
      }

      // delta 타입이면 메시지 내용 추가
      if (item.type === "delta" || item.type === "text-delta") {
        if (typeof item.content === "string") {
          currentMessage.message =
            (currentMessage.message || "") + item.content;
        }
      }

      // 기타 메타데이터 처리
      if (item.phase) currentMessage.phase = item.phase;
      if (item.timestamp) currentMessage.timestamp = item.timestamp;
      if (item.code) currentMessage.code = item.code;
    });

    // 마지막 메시지 추가
    if (currentMessage.message) {
      groupedMessages.push(currentMessage);
    }

    return groupedMessages;
  }, []);

  // 그룹화된 메시지 생성
  const groupedData = groupMessages(data as AnalysisData[]);

  console.log(data);

  // UI 컴포넌트 렌더링 함수
  const renderUIComponent = (item: AnalysisData, index: number) => {
    if (item.type !== "ui-generation") return null;

    const id = `feedback-${index}`;

    switch (item.uiType) {
      case "feedback":
        return (
          <div
            key={`ui-${index}`}
            className="my-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2">
              {item.uiArgs?.title || "피드백"}
            </h3>
            <p className="text-sm mb-3">
              {item.uiArgs?.description || "피드백을 입력해주세요."}
            </p>
            <textarea
              id={id}
              value={feedbackResponses[id] || ""}
              onChange={(e) => handleFeedbackChange(id, e.target.value)}
              placeholder={item.uiArgs?.placeholder || "피드백을 입력해주세요."}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows={4}
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => submitFeedback(id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                제출
              </button>
            </div>
          </div>
        );
      // 필요에 따라 다른 UI 타입 추가 가능
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col h-full">
      <div className="flex-grow overflow-y-auto space-y-2 mb-4">
        {groupedData.map((item, index) => {
          // UI 생성 타입 처리
          if (item.type === "ui-generation") {
            return renderUIComponent(item, index);
          }

          // 일반 메시지 처리
          return (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                item.phase === "완료"
                  ? "bg-blue-100 dark:bg-blue-900 text-right"
                  : "bg-gray-100 dark:bg-gray-700 text-left"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.timestamp}
                </p>
                {item.phase && (
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.phase === "완료"
                        ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                        : "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                    }`}
                  >
                    {item.phase}
                  </span>
                )}
              </div>
              <div className="markdown-content text-sm text-gray-700 dark:text-gray-300">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-xl font-bold my-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-lg font-bold my-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-md font-bold my-1" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="my-1" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5 my-1" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5 my-1" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="my-0.5" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-blue-500 hover:underline" {...props} />
                    ),
                    code: ({ node, inline, ...props }) =>
                      inline ? (
                        <code
                          className="bg-gray-200 dark:bg-gray-700 px-1 rounded"
                          {...props}
                        />
                      ) : (
                        <code
                          className="block bg-gray-200 dark:bg-gray-700 p-2 rounded my-2 overflow-x-auto"
                          {...props}
                        />
                      ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-gray-300 pl-2 italic my-2"
                        {...props}
                      />
                    ),
                  }}
                >
                  {item.message || ""}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>

      {(status === "submitted" || status === "streaming") && (
        <div className="flex items-center space-x-2 mb-4">
          {status === "submitted" && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          )}
          <button
            type="button"
            onClick={() => stop()}
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Stop
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={status !== "ready"}
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="메시지를 입력하세요..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
