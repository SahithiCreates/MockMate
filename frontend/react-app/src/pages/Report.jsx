import { useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Target, Trophy, Clock, CheckCircle } from "lucide-react";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();
  const reportData = location.state?.reportData || null;

  if (!reportData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">No report data found.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">Go Back</button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-sans tracking-tight text-white flex flex-col overflow-y-auto">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-[0%] left-[-10%] w-[70%] h-[70%] bg-[#b30000]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] bg-[#ff1a1a]/5 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      
      <nav className="relative z-20 w-full flex items-center justify-between px-6 py-8 md:px-12">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center shadow-inner border border-white/20 group-hover:bg-white/20 transition-all">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">MockMate</span>
        </Link>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </nav>

      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-6 py-4 pb-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Interview Report</h1>
          <p className="text-gray-400 text-lg">Detailed performance analysis of your interview</p>
        </div>

        <div className="bg-[#111111]/80 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 md:p-12 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Role</span>
              <span className="text-2xl font-bold text-white">{reportData.role}</span>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Date</span>
              <div className="flex items-center text-white font-medium">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {new Date(reportData.date || reportData.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 mb-10 flex flex-col items-center justify-center py-12 relative overflow-hidden">
             
             
             <div className={`absolute inset-0 opacity-10 bg-gradient-to-t ${reportData.score >= 80 ? 'from-emerald-500' : reportData.score >= 60 ? 'from-yellow-500' : 'from-red-500'} to-transparent pointer-events-none`}></div>

            <div className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center mb-6 border-4 shadow-xl ${reportData.score >= 80 ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-emerald-500/20' : reportData.score >= 60 ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400 shadow-yellow-500/20' : 'border-red-500 bg-red-500/10 text-red-400 shadow-red-500/20'}`}>
              <span className="text-5xl font-bold">{reportData.score}</span>
            </div>
            <h3 className="relative z-10 text-2xl font-semibold text-white mb-2">Overall Score</h3>
            <p className="relative z-10 text-gray-400 text-base">Out of 100 points</p>
          </div>

          <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-400" />
              AI Feedback & Analysis
            </h3>
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap bg-white/5 p-6 rounded-xl border border-white/5 text-sm md:text-base">
              {reportData.feedback}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Report;
