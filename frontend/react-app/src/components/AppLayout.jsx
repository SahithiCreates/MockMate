import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Play, History, User, LogOut, Bot } from "lucide-react";

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Begin Interview", path: "/setup", icon: Play },
    { name: "History", path: "/history", icon: History },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-sans tracking-tight text-white flex overflow-hidden">
      {/* Abstract Background - Persistent */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-[0%] left-[-10%] w-[70%] h-[70%] bg-[#b30000]/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] bg-[#ff1a1a]/5 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      {/* Persistent Left Sidebar */}
      <aside className="relative z-20 w-64 border-r border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl flex flex-col h-screen flex-shrink-0">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center shadow-inner border border-white/20 group-hover:bg-white/20 transition-all">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">MockMate</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive 
                  ? "bg-white/10 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 font-medium text-sm transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Dynamic Main Content Area */}
      <main className="relative z-10 flex-1 h-screen overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
