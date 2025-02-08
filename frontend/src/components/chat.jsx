import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import FarmerNavbar from "../pages/FarmerNavbar";
const FarmToTableChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;
    
    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");
    
    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);
    
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDIxYLzYWYYRv_Me8ALPfxAYCo6GmU6d2I`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: question }] }],
          }),
        }
      );

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  // Helper function to format text with newlines
  const formatText = (text) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    
    <div className="fixed inset-0 bg-gradient-to-r from-green-50 to-lime-100">
     
      <div className="h-full max-w-4xl mx-auto flex flex-col p-3">
        
        <header className="text-center py-4">
          <a href="https://github.com/Vishesh-Pandey/chat-ai" 
             target="_blank" 
             rel="noopener noreferrer"
             className="block">
            <h1 className="text-4xl font-bold text-green-700 hover:text-green-800 transition-colors">
              Farm to Table Assistant
            </h1>
          </a>
        </header>

        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-lg p-4"
        >
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-green-50 rounded-xl p-8 max-w-2xl">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Welcome to Your Farm to Table Guide! 🌱</h2>
                <p className="text-gray-600 mb-4">
                  I'm here to help you with all your sustainable food and farming questions. Ask me about:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-green-600">🌿</span> Seasonal Produce
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-green-600">👨‍🌾</span> Local Farmers
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-green-600">🥗</span> Market Demand
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-green-600">♻️</span> Sustainability
                  </div>
                </div>
                <p className="text-gray-500 mt-6 text-sm">
                  Start your sustainable food journey by asking a question below!
                </p>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-4 ${chat.type === 'question' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                    chat.type === 'question' 
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-green-50 text-gray-800 rounded-bl-none'
                  }`}>
                    {formatText(chat.content)}
                  </div>
                </div>
              ))}
            </>
          )}
          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block bg-green-50 p-3 rounded-lg animate-pulse">
                Growing response... 🌱
              </div>
            </div>
          )}
        </div>

        <form onSubmit={generateAnswer} className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex gap-2">
            <textarea
              required
              className="flex-1 border border-green-200 rounded p-3 focus:border-green-400 focus:ring-1 focus:ring-green-400 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about sustainable food, farming, or cooking..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            />
            <button
              type="submit"
              className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center ${
                generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={generatingAnswer}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmToTableChat;