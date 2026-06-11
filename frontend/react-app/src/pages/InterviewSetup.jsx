import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, Play, History, User, LogOut, Bot, ArrowRight, Clock, Gauge, AlertTriangle } from "lucide-react";
import { getProfile } from "../apis";

function InterviewSetup() {
  const navigate = useNavigate();
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [profile, setProfile] = useState(null);
  const [showProfileWarning, setShowProfileWarning] = useState(false);

  const durations = [10, 20, 30, 45, 60];
  const difficulties = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data?.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfile();
  }, []);

  const isProfileComplete = () => {
    if (!profile) return false;
    return (
      profile.role &&
      profile.role.trim() !== "" &&
      profile.company &&
      profile.company.trim() !== "" &&
      Number(profile.experienceYears) >= 0 &&
      profile.resumeLink &&
      profile.resumeLink.trim() !== ""
    );
  };

  const handleStartSession = () => {
    if (!duration) return;
    
    if (!isProfileComplete()) {
      setShowProfileWarning(true);
      return;
    }

    setShowProfileWarning(false);
    navigate("/interview", { state: { duration, difficulty } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-10 flex flex-col gap-8">
      
      
      <div className="flex justify-between items-end animate-fade-in-setup">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Interview Setup</h1>
          <p className="text-gray-400 text-sm">Configure your session before starting.</p>
        </div>
      </div>

      
      <div className="relative group overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 p-10 flex flex-col shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 animate-fade-in-setup" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-8">
          
          {showProfileWarning && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-setup">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-amber-400 font-semibold text-sm mb-1">Profile Incomplete</h3>
                  <p className="text-amber-500/80 text-xs text-left">Please complete your profile first before starting an interview.</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/profile')}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Go to Profile
              </button>
            </div>
          )}

          
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              Select Duration
            </label>
            <div className="relative">
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full appearance-none bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all cursor-pointer"
              >
                <option value="" disabled className="text-gray-500">Choose a duration...</option>
                {durations.map(d => (
                  <option key={d} value={d} className="bg-[#111111]">{d} Minutes</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-gray-400" />
              Select Difficulty
            </label>
            <div className="flex bg-[#111111]/80 backdrop-blur-md p-1 border border-white/10 rounded-xl">
              {difficulties.map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    difficulty === diff 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-2">
            <button 
              onClick={handleStartSession}
              disabled={!duration}
              className={`group/btn w-full sm:w-auto relative px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 ${
                duration 
                ? 'bg-white text-black hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                : 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/5'
              }`}
            >
              {duration && (
                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              )}
              <span className="relative z-10">Start Interview</span>
              <ArrowRight className={`w-4 h-4 relative z-10 transition-transform ${duration ? 'group-hover/btn:translate-x-1' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInSetup {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-setup {
          animation: fadeInSetup 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

    </div>
  );
}

export default InterviewSetup;
