import { useState } from "react"
import { signup } from "../apis";
import { useNavigate, Link } from "react-router-dom";
import { Bot, ArrowRight, User, Mail, Lock } from "lucide-react";

function Signup(){
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await signup(formData);
            const {token, user} = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            navigate("/dashboard");
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-sans tracking-tight text-white overflow-hidden flex flex-col items-center justify-center">
            
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-[0%] left-[-10%] w-[70%] h-[70%] bg-[#b30000]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] bg-[#ff1a1a]/5 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      
      <nav className="absolute top-0 w-full z-20 flex items-center px-6 py-8 md:px-12">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center shadow-inner border border-white/20 group-hover:bg-white/20 transition-all">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">MockMate</span>
        </Link>
      </nav>

      
      <div className="relative z-10 w-[92%] max-w-[420px] bg-[#111111]/80 backdrop-blur-md rounded-[1.5rem] border border-white/5 p-8 md:p-12 text-center flex flex-col shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)] my-8">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
              <p className="text-gray-400 text-sm font-medium tracking-wide mb-8">Start practicing interviews with AI feedback</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                
                <div>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                        <User className="w-4 h-4" />
                     </div>
                     <input 
                       type="text"
                       name="name" 
                       value={formData.name} 
                       onChange={handleChange} 
                       placeholder="Full Name" 
                       className="w-full bg-[#111111] border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-white/30 focus:border-white/30 block pl-11 p-3.5 transition-all outline-none placeholder-gray-600 shadow-inner"
                       required
                     />
                  </div>
                </div>

                <div>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                        <Mail className="w-4 h-4" />
                     </div>
                     <input 
                       type="email"
                       name="email" 
                       value={formData.email} 
                       onChange={handleChange} 
                       placeholder="Email address" 
                       className="w-full bg-[#111111] border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-white/30 focus:border-white/30 block pl-11 p-3.5 transition-all outline-none placeholder-gray-600 shadow-inner"
                       required
                     />
                  </div>
                </div>
                
                <div>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                        <Lock className="w-4 h-4" />
                     </div>
                     <input 
                       type="password"
                       name="password" 
                       value={formData.password} 
                       onChange={handleChange} 
                       placeholder="Password" 
                       className="w-full bg-[#111111] border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-white/30 focus:border-white/30 block pl-11 p-3.5 transition-all outline-none placeholder-gray-600 shadow-inner"
                       required
                     />
                  </div>
                </div>

                <div>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                        <Lock className="w-4 h-4" />
                     </div>
                     <input 
                       type="password"
                       name="confirmPassword" 
                       placeholder="Confirm Password" 
                       className="w-full bg-[#111111] border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-white/30 focus:border-white/30 block pl-11 p-3.5 transition-all outline-none placeholder-gray-600 shadow-inner"
                       required
                     />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="group relative w-full mt-4 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10">Create Account</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              
              <p className="mt-8 text-sm text-gray-400 font-medium">
                Already have an account? <Link to="/login" className="text-white hover:underline transition-all ml-1">Login</Link>
              </p>
            </div>

        </div>
    )
}

export default Signup;