import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Clock, FileText, Activity } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-sans tracking-tight text-white overflow-hidden flex flex-col">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        
        
        <div className="absolute top-[0%] left-[-10%] w-[70%] h-[70%] bg-[#b30000]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] bg-[#ff1a1a]/5 blur-[150px] rounded-full mix-blend-screen"></div>
        
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      
      <nav className="relative z-20 w-full flex items-center justify-between px-6 py-8 md:px-12">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center shadow-inner border border-white/20 group-hover:bg-white/20 transition-all">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">MockMate</span>
        </Link>
        
      </nav>

      
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        
        <div className="max-w-4xl text-center flex flex-col items-center mt-[-40px]">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-6 md:mb-8 tracking-tighter leading-[1.05]">
            AI-Powered <br className="hidden sm:block" />
            Interview Practice Platform
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-medium tracking-wide leading-relaxed">
            Upload your resume, simulate real interviews, and get instant AI feedback
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            
            <button 
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto group relative px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Sign up</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#111111] hover:bg-[#1a1a1a] text-white font-semibold text-sm border border-white/10 transition-colors shadow-inner"
            >
              Log in
            </button>
          </div>
        </div>

        
        <div id="features" className="w-full max-w-[1200px] mt-24 md:mt-32 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#111111]/60 backdrop-blur-md border border-white/5 rounded-[1.5rem] p-8 text-left hover:border-white/15 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                <FileText className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-base mb-3 leading-snug">Resume-based AI question generation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Generate highly relevant interview questions tailored instantly from your uploaded resume.
              </p>
            </div>

            <div className="bg-[#111111]/60 backdrop-blur-md border border-white/5 rounded-[1.5rem] p-8 text-left hover:border-white/15 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold text-base mb-3 leading-snug">Real-time interview with timer</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Immersive mock interviews featuring customized timers and realistic conversational pacing.
              </p>
            </div>

            <div className="bg-[#111111]/60 backdrop-blur-md border border-white/5 rounded-[1.5rem] p-8 text-left hover:border-white/15 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-base mb-3 leading-snug">AI evaluation with score + feedback</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get scored instantly with deep feedback on your delivery, technical accuracy, and tone.
              </p>
            </div>

            <div className="bg-[#111111]/60 backdrop-blur-md border border-white/5 rounded-[1.5rem] p-8 text-left hover:border-white/15 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold text-base mb-3 leading-snug">Interview history tracking</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Monitor your progress over time with detailed analytics and saved session records.
              </p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default Home;