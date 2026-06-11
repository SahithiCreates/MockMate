import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, getDashboard } from "../apis";
import { LayoutDashboard, Play, History, User, LogOut, ArrowRight, Bot, Target, Trophy, Clock, CheckCircle } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.name || "User";

  const isProfileComplete = (profile) => {
    return (
      profile?.role?.trim() &&
      profile?.company?.trim() &&
      Number(profile?.experienceYears) >= 0 &&
      profile?.resumeLink?.trim()
    );
  };

  useEffect(() => {
    loadProfile();
    loadDashboard();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data.data);
    } catch (err) {
      setErr("Failed to fetch profile");
    }
  };

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();
      setStats(res.data);
    } catch (err) {
      setErr("Failed to load dashboard data");
    }
  };

  const handleStartInterview = () => {
    setErr("");

    if (!profile) return setErr("Profile not loaded yet");

    if (!isProfileComplete(profile)) {
      return setErr("Please complete your profile first");
    }

    navigate("/setup");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col gap-8">
      
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back, {userName}</h1>
          <p className="text-gray-400 text-sm">Track your interview performance and improve your skills.</p>
        </div>
      </div>

      {err && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
          {err}
        </div>
      )}

      
      <div className="relative group overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 p-10 flex flex-col items-start shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-3">Begin AI Interview</h2>
          <p className="text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
            Start a real-time mock interview powered by AI. Get personalized questions based on your profile and industry standards.
          </p>
          
          <button 
            onClick={handleStartInterview}
            className="group/btn relative px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            <span className="relative z-10">Begin Interview</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111]/60 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-gray-400 text-sm font-medium">Total Interviews</span>
          </div>
          <span className="text-3xl font-bold">{stats ? stats.totalInterviews : '-'}</span>
        </div>
        
        <div className="bg-[#111111]/60 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-gray-400 text-sm font-medium">Average Score</span>
          </div>
          <span className="text-3xl font-bold">{stats ? (stats.avgScore ? stats.avgScore.toFixed(1) : '0') : '-'}</span>
        </div>

        <div className="bg-[#111111]/60 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Trophy className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-gray-400 text-sm font-medium">Best Score</span>
          </div>
          <span className="text-3xl font-bold">{stats ? stats.bestScore : '-'}</span>
        </div>
      </div>

      
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
        
        <div className="flex flex-col gap-4">
          {!stats ? (
            <div className="text-sm text-gray-500">Loading recent interviews...</div>
          ) : stats.recent?.length === 0 ? (
            <div className="bg-[#111111]/60 backdrop-blur-md rounded-2xl border border-white/5 p-8 text-center text-sm text-gray-400">
              No interviews completed yet.
            </div>
          ) : (
            stats.recent.map((item) => (
              <div key={item.id} className="group bg-[#111111]/40 hover:bg-[#111111]/80 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{item.role}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      item.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      item.score >= 60 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      Score: {item.score}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate max-w-lg">{item.feedback}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <button onClick={() => navigate("/report", { state: { reportData: item } })} className="text-xs px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/5 transition-colors">
                    View Report
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;