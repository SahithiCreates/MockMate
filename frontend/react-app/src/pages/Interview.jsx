import { useState, useEffect, useRef } from "react";
import { start, nextQuestion } from "../apis";
import { useNavigate, useLocation } from "react-router-dom";
import { Bot, User as UserIcon, Send, Clock, AlertTriangle, StopCircle } from "lucide-react";

function Interview() {
  const navigate = useNavigate();
  const location = useLocation();
  const setupDuration = location.state?.duration || 30; // fallback

  const [interviewId, setInterviewId] = useState("");
  const [conversation, setConversation] = useState([]);
  const [answer, setAnswer] = useState("");

  const [timeLeft, setTimeLeft] = useState(setupDuration * 60);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, loading]);

  useEffect(() => {
    startInterview();
  }, []); 

  const startInterview = async () => {
    try {
      setLoading(true);
      const res = await start();
      
      setInterviewId(res.data.interviewId);
      setConversation([{ question: res.data.question, answer: "" }]);
      setStarted(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim() || loading) return;

    try {
      setLoading(true);
      const currentAnswer = answer;
      setAnswer(""); 
      const res = await nextQuestion({
        interviewId,
        answer: currentAnswer,
      });

      setConversation((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = currentAnswer; 
        
        updated.push({
          question: res.data.question, 
          answer: "",
        });

        return updated;
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handeKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitAnswer();
    }
  };

  const endInterview = () => {
    setStarted(false);
    navigate("/endInterview", {
      state: { interviewId },
    });
  };

  useEffect(() => {
    if (!started || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, timeLeft]);

  return (
    <div className="relative h-screen bg-[#0a0a0a] font-sans tracking-tight text-white flex flex-col overflow-hidden">
      
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-[0%] left-[-10%] w-[70%] h-[70%] bg-[#b30000]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] bg-[#ff1a1a]/5 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center shadow-inner border border-white/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">AI Mock Interview in Progress</h1>
            <p className="text-sm text-gray-400">Answer naturally as if in a real environment</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#111111]/80 rounded-xl border border-white/10">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium font-mono text-emerald-400">
              {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:{ (timeLeft % 60).toString().padStart(2, "0") }
            </span>
          </div>

          <button 
            onClick={endInterview}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium text-sm transition-all border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            <StopCircle className="w-4 h-4" />
            End Interview
          </button>
        </div>
      </header>

      
      <main className="relative z-10 flex-1 overflow-y-auto w-full px-4 py-6 custom-scrollbar scroll-smooth">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-20">
          
          {!started && (
            <div className="flex flex-col items-center justify-center h-40 gap-4 mt-20 animate-pulse">
              <Bot className="w-12 h-12 text-gray-500" />
              <p className="text-gray-400 font-medium">Initializing AI Interviewer...</p>
            </div>
          )}

          {conversation.map((c, idx) => (
            <div key={idx} className="flex flex-col gap-6 animate-fade-in-up">
              
              
              <div className="flex items-start gap-4 pr-12 md:pr-24">
                <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center border border-white/10 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-xs text-gray-500 font-medium ml-1">AI Interviewer</span>
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-sm text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                    {c.question}
                  </div>
                </div>
              </div>

              
              {c.answer && (
                <div className="flex flex-row-reverse items-start gap-4 pl-12 md:pl-24 animate-fade-in-up">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex-shrink-0 flex items-center justify-center border border-blue-500/20 mt-1">
                    <UserIcon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-xs text-gray-500 font-medium mr-1">You</span>
                    <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm text-white text-sm leading-relaxed whitespace-pre-wrap">
                      {c.answer}
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          ))}

          {loading && started && (
            <div className="flex items-start gap-4 pr-12 animate-fade-in-up">
              <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center border border-white/10 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          
          <div ref={bottomRef} />
        </div>
      </main>

      
      <footer className="relative z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handeKeyDown}
              disabled={loading || !started}
              placeholder="Type your answer... (Press Shift + Enter for new line)"
              rows={2}
              className="w-full bg-[#111111] border border-white/10 rounded-2xl py-3.5 px-5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all resize-none custom-scrollbar disabled:opacity-50"
            />
          </div>
          <button
            onClick={submitAnswer}
            disabled={!answer.trim() || loading || !started}
            className="flex-shrink-0 h-[3.25rem] w-[3.25rem] sm:w-auto sm:px-6 flex items-center justify-center gap-2 rounded-2xl bg-white text-black font-semibold text-sm hover:scale-[1.02] disabled:hover:scale-100 transition-all disabled:opacity-50 disabled:bg-white/10 disabled:text-gray-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <span className="hidden sm:inline">Send</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </footer>

      <style jsx>{`
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }
        *::-webkit-scrollbar {
          width: 6px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default Interview;