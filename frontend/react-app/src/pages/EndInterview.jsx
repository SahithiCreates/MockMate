import { useState, useEffect } from "react";
import { end } from "../apis";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronRight, Bot, Target, AlertTriangle } from "lucide-react";

function EndInterview() {
  const navigate = useNavigate();
  const location = useLocation();
  const interviewId = location.state?.interviewId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [actualScore, setActualScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!interviewId) {
      setError("No interview ID found.");
      setLoading(false);
      return;
    }
    fetchResults();
  }, [interviewId]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await end(interviewId);
      
      const rawScore = Number(res.data.score) || 0;
      const parsedScore = rawScore > 10 ? Math.round(rawScore / 10) : rawScore;
      
      setActualScore(parsedScore);
      setFeedback(res.data.feedback || "Good effort. Try focusing more on the specific project examples next time.");
      setLoading(false);
    } catch (e) {
      console.log("Error in end interview ", e);
      setError("Failed to fetch interview results. Please try again later.");
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!loading && !error && actualScore > 0) {
      let current = 0;
      const interval = setInterval(() => {
        current += 0.5; 
        if (current >= actualScore) {
          setDisplayScore(actualScore);
          clearInterval(interval);
        } else {
          setDisplayScore(current);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [loading, error, actualScore]);

  const getScoreColor = (s) => {
    if (s >= 8) return "text-emerald-400";
    if (s >= 5) return "text-yellow-400";
    return "text-red-400";
  };
  
  const getScoreBg = (s) => {
    if (s >= 8) return "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_40px_rgba(52,211,153,0.15)]";
    if (s >= 5) return "bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_40px_rgba(250,204,21,0.15)]";
    return "bg-red-500/10 border-red-500/30 shadow-[0_0_40px_rgba(248,113,113,0.15)]";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans tracking-tight text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-[0%] left-[-10%] w-[70%] h-[70%] bg-[#b30000]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] bg-[#ff1a1a]/5 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6 animate-pulse">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Bot className="w-8 h-8 text-white/50" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Analyzing Performance</h2>
              <p className="text-gray-400">The AI is generating your interview feedback...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center flex flex-col items-center gap-4">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
              <p className="text-red-400">{error}</p>
            </div>
            <button 
              onClick={() => navigate("/dashboard")}
              className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8 animate-fade-in-up">
            
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 mb-6 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Interview Completed 🎉</h1>
              <p className="text-gray-400 text-lg">Here is your performance analysis</p>
            </div>

            
            <div className={`p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col items-center justify-center gap-4 transition-all duration-1000 ${getScoreBg(actualScore)}`}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">Overall Rating</h3>
              <div className="flex items-baseline gap-2">
                <span className={`text-7xl font-black tracking-tighter ${getScoreColor(actualScore)}`}>
                  {Math.floor(displayScore)}
                </span>
                <span className="text-3xl font-bold text-gray-500">/ 10</span>
              </div>
              <p className={`text-sm font-medium mt-2 ${getScoreColor(actualScore)} opacity-80 uppercase tracking-widest`}>
                {actualScore >= 8 ? 'Excellent' : actualScore >= 5 ? 'Good' : 'Needs Improvement'}
              </p>
            </div>

            
            <div className="bg-[#111111]/80 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-sm group hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Feedback</h3>
              </div>
              
              <div className="text-gray-300 text-[15px] leading-relaxed whitespace-pre-wrap">
                {feedback}
              </div>
            </div>

            
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => navigate("/dashboard")}
                className="group relative px-8 py-4 rounded-xl bg-white text-black font-semibold text-[15px] flex items-center justify-center gap-2 overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Back to Dashboard</span>
                <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default EndInterview;