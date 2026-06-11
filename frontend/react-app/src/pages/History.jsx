import { useEffect, useState } from "react";
import { getHistory } from "../apis";
import { useNavigate, Link } from "react-router-dom";
import { Bot, ArrowLeft, Clock } from "lucide-react";

function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Interview History</h1>
        <p className="text-gray-400 text-sm">
          Review your past interview sessions, track your progress, and identify areas for improvement over time.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {history.length === 0 ? (
          <div className="text-gray-400 text-center py-10 bg-[#111111]/60 backdrop-blur-md rounded-2xl border border-white/5">
            No interview history found.
          </div>
        ) : (
          history.map((item) => (
            <div key={item._id} className="group bg-[#111111]/40 hover:bg-[#111111]/80 backdrop-blur-md rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white text-lg">{item.role}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    item.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    item.score >= 60 ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                    'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    Score: {item.score}
                  </span>
                </div>
                <p className="text-sm text-gray-400 max-w-2xl line-clamp-2 mt-1">{item.feedback}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-500 text-xs whitespace-nowrap">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <button onClick={() => navigate("/report", { state: { reportData: item } })} className="text-xs px-5 py-2.5 rounded-lg bg-white text-black hover:bg-gray-200 font-semibold transition-colors whitespace-nowrap shadow-sm">
                  View Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;