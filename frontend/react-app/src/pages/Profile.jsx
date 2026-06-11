import { useState, useEffect, useRef } from "react";
import { putProfile, getProfile } from "../apis";
import { useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, Play, History, User, LogOut, Bot, Upload, CheckCircle, Save, ArrowLeft, Briefcase, Building, Clock } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    experienceYears: "",
  });
  const [resume, setResume] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      if (res.data?.data) {
        setFormData({
          role: res.data.data.role || "",
          company: res.data.data.company || "",
          experienceYears: res.data.data.experienceYears || "",
        });
        setResumeLink(res.data.data.resumeLink || "");
      }
    } catch (err) {
      console.log(err);
      setErrorMsg("Failed to load profile data.");
    } finally { 
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSuccessMsg("");
    setErrorMsg("");
    try {
      setLoading(true);
      const data = new FormData();
      data.append("role", formData.role);
      data.append("company", formData.company);
      data.append("experienceYears", formData.experienceYears);

      if (resume) {
        data.append("resume", resume);
      }

      const res = await putProfile(data);
      setSuccessMsg("Profile updated successfully!");
      
      const updatedProfile = res.data?.data;
      if (updatedProfile) {
        setFormData({
          role: updatedProfile.role || "",
          company: updatedProfile.company || "",
          experienceYears: updatedProfile.experienceYears || "",
        });
        setResumeLink(updatedProfile.resumeLink || "");
        setResume(null);
      } else if (resume) {
        setResumeLink("updated");
        setResume(null);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg("Failed to update profile. Please check the inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isProfileComplete = () => {
  return (
    formData.role?.trim() &&
    formData.company?.trim() &&
    Number(formData.experienceYears) >= 0 &&
    (resumeLink?.trim() || resume)   
  );
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-8 py-12 flex flex-col gap-10 animate-fade-in-up">
      
      
      <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Your Profile</h1>
        <p className="text-gray-400 text-sm">Update your details to personalize your AI interview experience</p>
      </div>

      
      <div className="rounded-[2rem] bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] flex flex-col gap-8">
        
        {successMsg && (
          <div className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col gap-6">
          
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" /> Target Role
            </label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              disabled={loading}
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 focus:bg-[#1f1f1f] transition-all disabled:opacity-50"
            />
          </div>

          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" /> Experience (Years)
            </label>
            <input
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              placeholder="e.g. 3"
              min="0"
              disabled={loading}
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 focus:bg-[#1f1f1f] transition-all disabled:opacity-50"
            />
          </div>

          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-500" /> Target Company
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Amazon, Google"
              disabled={loading}
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 focus:bg-[#1f1f1f] transition-all disabled:opacity-50"
            />
          </div>

          
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-medium text-gray-300">Resume Upload</label>
            <div 
              className={`relative w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${resume ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10'} cursor-pointer group`}
              onClick={() => !loading && fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setResume(e.target.files[0])}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              
              {resume ? (
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm">Resume Selected ✅</span>
                    <span className="text-xs text-emerald-500/70 truncate max-w-[200px] sm:max-w-xs">{resume.name}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-gray-400 group-hover:text-white transition-colors">
                  <Upload className="w-5 h-5" />
                  <span className="font-medium text-sm">
                    {resumeLink ? "Upload New Resume (Overrides current)" : "Upload Resume (.pdf, .doc)"}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5 mt-2">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full sm:w-auto relative px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:hover:scale-100 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10">{loading ? 'Saving...' : 'Save Changes'}</span>
            {!loading && <Save className="w-4 h-4 relative z-10" />}
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 border border-white/5 hover:border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/setup')}
            disabled={loading || !isProfileComplete()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 border border-indigo-500/20 disabled:border-white/5 disabled:bg-white/5 disabled:text-gray-500"
          >
            <Play className="w-4 h-4" />
            Start Interview
          </button>
        </div>

      </div>

    </div>
  );
}

export default Profile;