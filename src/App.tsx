import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart2, 
  Settings,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Upload,
  Mail,
  Trash2,
  GripVertical,
  FileSearch,
  Download,
  ThumbsUp,
  ThumbsDown,
  Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const activityData = [
  { name: 'Mon', students: 12 },
  { name: 'Tue', students: 45 },
  { name: 'Wed', students: 30 },
  { name: 'Thu', students: 80 },
  { name: 'Fri', students: 65 },
  { name: 'Sat', students: 20 },
  { name: 'Sun', students: 15 },
];

type View = 'dashboard' | 'exams' | 'create-exam' | 'candidates' | 'results' | 'staff' | 'resumes';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  return (
    <div className="flex h-screen bg-[#FAFAFA] text-zinc-900 font-sans antialiased selection:bg-zinc-200">
      {/* Sidebar */}
      <aside className="w-64 bg-[#FAFAFA] border-r border-zinc-200 flex flex-col">
        <div className="h-14 flex items-center px-6 border-b border-zinc-200/50">
          <div className="flex items-center gap-2 font-medium text-sm">
            <div className="w-5 h-5 bg-zinc-900 rounded-[4px] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm" />
            </div>
            Acme Exams
          </div>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <NavItem 
            icon={<LayoutDashboard size={16} />} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')} 
          />
          <NavItem 
            icon={<FileText size={16} />} 
            label="Exams" 
            active={currentView === 'exams' || currentView === 'create-exam'} 
            onClick={() => setCurrentView('exams')} 
          />
          <NavItem 
            icon={<Users size={16} />} 
            label="Candidates" 
            active={currentView === 'candidates'} 
            onClick={() => setCurrentView('candidates')} 
          />
          <NavItem 
            icon={<FileSearch size={16} />} 
            label="Resumes" 
            active={currentView === 'resumes'} 
            onClick={() => setCurrentView('resumes')} 
          />
          <NavItem 
            icon={<BarChart2 size={16} />} 
            label="Results" 
            active={currentView === 'results'} 
            onClick={() => setCurrentView('results')} 
          />
          <NavItem 
            icon={<Settings size={16} />} 
            label="Staff" 
            active={currentView === 'staff'} 
            onClick={() => setCurrentView('staff')} 
          />
        </nav>

        <div className="p-4 border-t border-zinc-200/50">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-medium text-zinc-600">
              R
            </div>
            <div className="text-sm font-medium text-zinc-700">Rahul</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">
        {currentView === 'dashboard' && <DashboardView onViewChange={setCurrentView} />}
        {currentView === 'exams' && <ExamsView onViewChange={setCurrentView} />}
        {currentView === 'create-exam' && <CreateExamView onViewChange={setCurrentView} />}
        {currentView === 'candidates' && <CandidatesView />}
        {currentView === 'resumes' && <ResumesView />}
        {currentView === 'results' && <ResultsView />}
        {currentView === 'staff' && <StaffView />}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-1.5 text-sm rounded-md transition-colors ${
        active 
          ? 'bg-zinc-100 text-zinc-900 font-medium' 
          : 'text-zinc-600 hover:bg-zinc-100/50 hover:text-zinc-900'
      }`}
    >
      <span className={active ? 'text-zinc-900' : 'text-zinc-400'}>{icon}</span>
      {label}
    </button>
  );
}

// --- Views ---

function DashboardView({ onViewChange }: { onViewChange: (view: View) => void }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="max-w-5xl mx-auto px-10 py-12">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Welcome back, Rahul</h1>
          <p className="text-sm text-zinc-500 mt-1">{today}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onViewChange('candidates')}
            className="px-3 py-1.5 border border-zinc-200 rounded-md text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Invite Candidates
          </button>
          <button 
            onClick={() => onViewChange('create-exam')}
            className="bg-zinc-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-1.5 transition-colors"
          >
            <Plus size={14} />
            Create Exam
          </button>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Exams" value="24" trend="+3 this week" positive />
        <StatCard label="Active Candidates" value="1,240" trend="+12% vs last month" positive />
        <StatCard label="Average Score" value="76.4%" trend="-2.1% vs last month" positive={false} />
        <StatCard label="Completion Rate" value="92%" trend="+4% vs last month" positive />
      </div>

      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="col-span-2 border border-zinc-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-zinc-900">Assessments Taken</h2>
            <select className="text-xs text-zinc-500 bg-transparent border-none focus:ring-0 cursor-pointer outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#18181b', fontSize: '14px', fontWeight: 500 }}
                  labelStyle={{ color: '#71717a', fontSize: '12px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="students" stroke="#18181b" strokeWidth={2} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-zinc-200 rounded-xl p-6 flex flex-col">
          <h2 className="text-sm font-medium text-zinc-900 mb-6">Recent Activity</h2>
          <div className="space-y-6 flex-1">
            <ActivityItem 
              icon={<CheckCircle2 size={14} className="text-emerald-600" />}
              title="Alex Chen passed Java Core" 
              time="2 hours ago" 
              score="98%"
            />
            <ActivityItem 
              icon={<FileText size={14} className="text-blue-600" />}
              title="New exam published" 
              time="5 hours ago" 
              desc="Python Basics"
            />
            <ActivityItem 
              icon={<Users size={14} className="text-purple-600" />}
              title="50 candidates imported" 
              time="Yesterday" 
              desc="By Sarah Jenkins"
            />
            <ActivityItem 
              icon={<Clock size={14} className="text-amber-600" />}
              title="Data Structures closed" 
              time="2 days ago" 
              desc="89 attempts"
            />
          </div>
          <button 
            className="text-xs text-zinc-500 hover:text-zinc-900 font-medium text-left mt-4 transition-colors"
          >
            View all activity &rarr;
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-zinc-900">Active Exams Overview</h2>
          <button 
            onClick={() => onViewChange('exams')}
            className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors"
          >
            Manage exams <ArrowRight size={12} />
          </button>
        </div>
        <div className="border border-zinc-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50">
                <th className="font-medium text-zinc-500 px-4 py-3">Exam Name</th>
                <th className="font-medium text-zinc-500 px-4 py-3">Completion</th>
                <th className="font-medium text-zinc-500 px-4 py-3">Avg. Score</th>
                <th className="font-medium text-zinc-500 px-4 py-3">Time Left</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <ActiveExamRow name="Java Core Concepts" completed={142} total={150} score="78%" timeLeft="2 days" onClick={() => onViewChange('results')} />
              <ActiveExamRow name="System Design Interview" completed={34} total={100} score="65%" timeLeft="5 days" onClick={() => onViewChange('results')} />
              <ActiveExamRow name="Frontend Architecture" completed={89} total={90} score="82%" timeLeft="12 hours" onClick={() => onViewChange('results')} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, positive }: { label: string, value: string, trend: string, positive: boolean }) {
  return (
    <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-sm shadow-zinc-100/50">
      <div className="text-xs font-medium text-zinc-500 mb-2">{label}</div>
      <div className="text-2xl font-semibold tracking-tight text-zinc-900 mb-2">{value}</div>
      <div className={`text-xs font-medium ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend}
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, time, desc, score }: { icon: React.ReactNode, title: string, time: string, desc?: string, score?: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-zinc-900">{title}</p>
        {(desc || score) && (
          <div className="flex items-center gap-2 mt-0.5">
            {desc && <span className="text-xs text-zinc-500">{desc}</span>}
            {score && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{score}</span>}
          </div>
        )}
        <p className="text-xs text-zinc-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

function ActiveExamRow({ name, completed, total, score, timeLeft, onClick }: { name: string, completed: number, total: number, score: string, timeLeft: string, onClick: () => void }) {
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <tr onClick={onClick} className="hover:bg-zinc-50 transition-colors cursor-pointer group">
      <td className="px-4 py-3 font-medium text-zinc-900">{name}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden max-w-[100px]">
            <div className="h-full bg-zinc-900 rounded-full" style={{ width: `${percentage}%` }} />
          </div>
          <span className="text-xs text-zinc-500">{completed}/{total}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-zinc-600">{score}</td>
      <td className="px-4 py-3 text-zinc-500 text-xs flex items-center gap-1.5 mt-1">
        <Clock size={12} /> {timeLeft}
      </td>
      <td className="px-4 py-3 text-right">
        <button className="text-zinc-400 hover:text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={16} />
        </button>
      </td>
    </tr>
  );
}

function ExamsView({ onViewChange }: { onViewChange: (view: View) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-10 py-12">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Exams</h1>
        <button 
          onClick={() => onViewChange('create-exam')}
          className="bg-zinc-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-1.5 transition-colors"
        >
          <Plus size={16} />
          Create Exam
        </button>
      </header>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search exams..." 
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-500">Filter:</span>
          <select className="bg-transparent border-none text-zinc-900 font-medium focus:ring-0 cursor-pointer">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50">
              <th className="font-medium text-zinc-500 px-4 py-3">Exam Name</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Status</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Attempts</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Created Date</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            <ExamRow name="Java Core Concepts" status="Published" attempts="142" date="Oct 24, 2023" />
            <ExamRow name="Python Basics" status="Draft" attempts="-" date="Oct 23, 2023" />
            <ExamRow name="Data Structures" status="Closed" attempts="89" date="Oct 15, 2023" />
            <ExamRow name="System Design Interview" status="Published" attempts="34" date="Oct 10, 2023" />
            <ExamRow name="Frontend Architecture" status="Draft" attempts="-" date="Oct 05, 2023" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExamRow({ name, status, attempts, date }: { name: string, status: string, attempts: string, date: string }) {
  return (
    <tr className="hover:bg-zinc-50 transition-colors cursor-pointer group">
      <td className="px-4 py-3 font-medium text-zinc-900">{name}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          status === 'Published' ? 'bg-emerald-100/50 text-emerald-700' :
          status === 'Draft' ? 'bg-zinc-100 text-zinc-600' :
          'bg-rose-100/50 text-rose-700'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-3 text-zinc-600">{attempts}</td>
      <td className="px-4 py-3 text-zinc-500">{date}</td>
      <td className="px-4 py-3 text-right">
        <button className="text-zinc-400 hover:text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}

type QuestionType = 'mcq' | 'subjective';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  points: number;
  options: Option[];
}

function CreateExamView({ onViewChange }: { onViewChange: (view: View) => void }) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'What is the time complexity of binary search?',
      type: 'mcq',
      points: 5,
      options: [
        { id: 'o1', text: 'O(1)', isCorrect: false },
        { id: 'o2', text: 'O(n)', isCorrect: false },
        { id: 'o3', text: 'O(log n)', isCorrect: true },
        { id: 'o4', text: 'O(n^2)', isCorrect: false },
      ]
    }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, {
      id: Date.now().toString(),
      text: '',
      type: 'mcq',
      points: 1,
      options: [
        { id: Date.now() + '1', text: '', isCorrect: true },
        { id: Date.now() + '2', text: '', isCorrect: false },
      ]
    }]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (qId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: [...q.options, { id: Date.now().toString(), text: '', isCorrect: false }]
        };
      }
      return q;
    }));
  };

  const updateOption = (qId: string, oId: string, text: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.map(o => o.id === oId ? { ...o, text } : o)
        };
      }
      return q;
    }));
  };

  const setCorrectOption = (qId: string, oId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.map(o => ({ ...o, isCorrect: o.id === oId }))
        };
      }
      return q;
    }));
  };

  const removeOption = (qId: string, oId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.filter(o => o.id !== oId)
        };
      }
      return q;
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-10 py-12">
      <div className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
        <button onClick={() => onViewChange('exams')} className="hover:text-zinc-900">Exams</button>
        <ChevronRight size={14} />
        <span className="text-zinc-900 font-medium">Create Exam</span>
      </div>

      <div className="space-y-10">
        {/* Settings Section */}
        <section>
          <h2 className="text-lg font-medium text-zinc-900 mb-4">Exam Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Exam Title</label>
              <input 
                type="text" 
                placeholder="e.g. Midterm Assessment" 
                className="w-full px-3 py-2 bg-transparent border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all placeholder:text-zinc-400"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Duration (minutes)</label>
                <input 
                  type="number" 
                  placeholder="60" 
                  className="w-full px-3 py-2 bg-transparent border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all placeholder:text-zinc-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Total Marks</label>
                <input 
                  type="number" 
                  placeholder="100" 
                  className="w-full px-3 py-2 bg-transparent border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
                <span className="text-sm text-zinc-700">Enable negative marking</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" defaultChecked />
                <span className="text-sm text-zinc-700">Shuffle questions for each candidate</span>
              </label>
            </div>
          </div>
        </section>

        <hr className="border-zinc-100" />

        {/* Questions Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-zinc-900">Questions</h2>
          </div>
          
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="border border-zinc-200 rounded-xl p-5 bg-white shadow-sm shadow-zinc-100/50 relative group">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-zinc-400 hover:text-zinc-600">
                  <GripVertical size={16} />
                </div>
                
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 flex items-start gap-3">
                    <span className="text-sm font-medium text-zinc-400 mt-2">{index + 1}.</span>
                    <textarea 
                      placeholder="Type your question here..." 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 resize-none placeholder:text-zinc-400"
                      rows={2}
                      value={q.text}
                      onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <select 
                      value={q.type}
                      onChange={(e) => updateQuestion(q.id, { type: e.target.value as QuestionType })}
                      className="bg-transparent border border-zinc-200 rounded-md text-sm px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    >
                      <option value="mcq">Multiple Choice</option>
                      <option value="subjective">Short Answer</option>
                    </select>
                    <div className="flex items-center gap-1 border border-zinc-200 rounded-md px-2 py-1.5">
                      <input 
                        type="number" 
                        value={q.points}
                        onChange={(e) => updateQuestion(q.id, { points: parseInt(e.target.value) || 0 })}
                        className="w-8 text-sm text-center bg-transparent border-none p-0 focus:ring-0"
                      />
                      <span className="text-xs text-zinc-500">pts</span>
                    </div>
                    <button 
                      onClick={() => removeQuestion(q.id)}
                      className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                {q.type === 'mcq' && (
                  <div className="pl-6 space-y-2">
                    {q.options.map((opt) => (
                      <div key={opt.id} className="flex items-center gap-3 group/opt">
                        <button 
                          onClick={() => setCorrectOption(q.id, opt.id)}
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${opt.isCorrect ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 hover:border-zinc-400'}`}
                          title={opt.isCorrect ? "Correct answer" : "Mark as correct"}
                        >
                          {opt.isCorrect && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </button>
                        <input 
                          type="text" 
                          placeholder="Option text" 
                          value={opt.text}
                          onChange={(e) => updateOption(q.id, opt.id, e.target.value)}
                          className={`flex-1 bg-transparent border px-2 py-1.5 text-sm rounded-md focus:outline-none transition-colors ${opt.isCorrect ? 'border-emerald-200 bg-emerald-50/30 focus:border-emerald-400' : 'border-transparent hover:border-zinc-200 focus:border-zinc-300'}`}
                        />
                        {q.options.length > 2 && (
                          <button 
                            onClick={() => removeOption(q.id, opt.id)}
                            className="text-zinc-300 hover:text-rose-500 opacity-0 group-hover/opt:opacity-100 transition-opacity p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => addOption(q.id)}
                      className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 mt-3 px-2 py-1 rounded hover:bg-zinc-100 transition-colors"
                    >
                      <Plus size={12} /> Add option
                    </button>
                  </div>
                )}
                
                {q.type === 'subjective' && (
                  <div className="pl-6">
                    <div className="w-full h-20 bg-zinc-50 border border-dashed border-zinc-200 rounded-md flex items-center justify-center text-sm text-zinc-400">
                      Candidate will type their answer here
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button 
              onClick={addQuestion}
              className="w-full py-4 border border-dashed border-zinc-300 rounded-xl text-sm font-medium text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Add Question
            </button>
          </div>
        </section>

        <div className="pt-6 flex justify-end gap-3 sticky bottom-0 bg-white/80 backdrop-blur-md pb-6 border-t border-zinc-100 mt-10">
          <button 
            onClick={() => onViewChange('exams')}
            className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onViewChange('exams')}
            className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Save Exam
          </button>
        </div>
      </div>
    </div>
  );
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  exams: number;
  status: 'Active' | 'Invited' | 'Completed';
  lastActive?: string;
}

const INITIAL_CANDIDATES: Candidate[] = [
  { id: '1', name: 'Alex Chen', email: 'alex.c@example.com', exams: 3, status: 'Active', lastActive: '2 hours ago' },
  { id: '2', name: 'Maria Garcia', email: 'm.garcia@example.com', exams: 1, status: 'Completed', lastActive: '1 day ago' },
  { id: '3', name: 'James Wilson', email: 'james.w@example.com', exams: 5, status: 'Active', lastActive: '5 mins ago' },
  { id: '4', name: 'Sophia Lee', email: 'sophia.l@example.com', exams: 0, status: 'Invited', lastActive: 'Never' },
];

function CandidatesView() {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [newCandidate, setNewCandidate] = useState({ name: '', email: '' });

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.email) return;
    
    const candidate: Candidate = {
      id: Date.now().toString(),
      name: newCandidate.name,
      email: newCandidate.email,
      exams: 0,
      status: 'Invited',
      lastActive: 'Never'
    };
    
    setCandidates([candidate, ...candidates]);
    setNewCandidate({ name: '', email: '' });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-5xl mx-auto px-10 py-12 relative">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Candidates</h1>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-zinc-200 rounded-md text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors">
            <Upload size={14} />
            Import CSV
          </button>
          <button className="px-3 py-1.5 border border-zinc-200 rounded-md text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-1.5 transition-colors">
            <Mail size={14} />
            Invite
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-zinc-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-1.5 transition-colors ml-2"
          >
            <Plus size={14} />
            Add Candidate
          </button>
        </div>
      </header>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all placeholder:text-zinc-400"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-zinc-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-900"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Invited">Invited</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50">
              <th className="font-medium text-zinc-500 px-4 py-3">Name</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Email</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Exams Attempted</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Last Active</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Status</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map(candidate => (
                <CandidateRow 
                  key={candidate.id} 
                  candidate={candidate} 
                  onDelete={() => handleDelete(candidate.id)} 
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                  No candidates found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Candidate Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="font-medium text-zinc-900">Add New Candidate</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-xl leading-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddCandidate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  placeholder="Jane Doe" 
                  className="w-full px-3 py-2 bg-transparent border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newCandidate.email}
                  onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                  placeholder="jane@example.com" 
                  className="w-full px-3 py-2 bg-transparent border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CandidateRow({ candidate, onDelete }: { candidate: Candidate, onDelete: () => void }) {
  const [showMenu, setShowMenu] = useState(false);

  const statusStyles = {
    'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Completed': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'Invited': 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <tr className="hover:bg-zinc-50 transition-colors group">
      <td className="px-4 py-3 font-medium text-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-medium text-zinc-600">
            {candidate.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          {candidate.name}
        </div>
      </td>
      <td className="px-4 py-3 text-zinc-600">{candidate.email}</td>
      <td className="px-4 py-3 text-zinc-600">{candidate.exams}</td>
      <td className="px-4 py-3 text-zinc-500 text-xs">{candidate.lastActive}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${statusStyles[candidate.status]}`}>
          {candidate.status}
        </span>
      </td>
      <td className="px-4 py-3 text-right relative">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          onBlur={() => setTimeout(() => setShowMenu(false), 200)}
          className="text-zinc-400 hover:text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-zinc-100"
        >
          <MoreVertical size={16} />
        </button>
        
        {showMenu && (
          <div className="absolute right-8 top-10 w-40 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 z-10 text-left">
            <button className="w-full px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 text-left">
              View Results
            </button>
            <button className="w-full px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 text-left">
              Resend Invite
            </button>
            <div className="h-px bg-zinc-100 my-1"></div>
            <button 
              onClick={onDelete}
              className="w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 text-left"
            >
              Remove
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

function ResultsView() {
  return (
    <div className="max-w-5xl mx-auto px-10 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Results</h1>
      </header>

      {/* Insights */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="p-4 border border-zinc-200 rounded-lg">
          <div className="text-xs text-zinc-500 mb-1">Average Score</div>
          <div className="text-2xl font-medium text-zinc-900">76.4%</div>
        </div>
        <div className="p-4 border border-zinc-200 rounded-lg">
          <div className="text-xs text-zinc-500 mb-1">Pass Rate</div>
          <div className="text-2xl font-medium text-zinc-900">82%</div>
        </div>
        <div className="p-4 border border-zinc-200 rounded-lg">
          <div className="text-xs text-zinc-500 mb-3">Top Performers</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-zinc-700">Alex Chen</span><span className="font-medium">98%</span></div>
            <div className="flex justify-between"><span className="text-zinc-700">Maria Garcia</span><span className="font-medium">95%</span></div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-sm font-medium text-zinc-900 mb-4">Question-wise Accuracy</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="w-8 text-zinc-500">Q1</div>
            <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-900 rounded-full" style={{ width: '92%' }} />
            </div>
            <div className="w-12 text-right font-medium">92%</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="w-8 text-zinc-500">Q2</div>
            <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-900 rounded-full" style={{ width: '45%' }} />
            </div>
            <div className="w-12 text-right font-medium">45%</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="w-8 text-zinc-500">Q3</div>
            <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-zinc-900 rounded-full" style={{ width: '78%' }} />
            </div>
            <div className="w-12 text-right font-medium">78%</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-500">Exam:</span>
          <select className="bg-transparent border-none text-zinc-900 font-medium focus:ring-0 cursor-pointer">
            <option>Java Core Concepts</option>
            <option>Data Structures</option>
          </select>
        </div>
      </div>

      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50">
              <th className="font-medium text-zinc-500 px-4 py-3">Student</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Score</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Percentage</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            <ResultRow name="Alex Chen" score="49/50" percentage="98%" passed={true} />
            <ResultRow name="Maria Garcia" score="47/50" percentage="94%" passed={true} />
            <ResultRow name="James Wilson" score="35/50" percentage="70%" passed={true} />
            <ResultRow name="David Kim" score="20/50" percentage="40%" passed={false} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResultRow({ name, score, percentage, passed }: { name: string, score: string, percentage: string, passed: boolean }) {
  return (
    <tr className="hover:bg-zinc-50 transition-colors cursor-pointer">
      <td className="px-4 py-3 font-medium text-zinc-900">{name}</td>
      <td className="px-4 py-3 text-zinc-600">{score}</td>
      <td className="px-4 py-3 text-zinc-600">{percentage}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
        }`}>
          {passed ? 'Pass' : 'Fail'}
        </span>
      </td>
    </tr>
  );
}

function StaffView() {
  return (
    <div className="max-w-5xl mx-auto px-10 py-12">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Staff Management</h1>
        <button className="bg-zinc-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-zinc-800 flex items-center gap-1.5 transition-colors">
          <Plus size={16} />
          Add Staff
        </button>
      </header>

      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50">
              <th className="font-medium text-zinc-500 px-4 py-3">Name</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Role</th>
              <th className="font-medium text-zinc-500 px-4 py-3">Permissions</th>
              <th className="font-medium text-zinc-500 px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            <StaffRow name="Rahul Sharma" email="rahul@acme.com" role="Admin" permissions="Full Access" />
            <StaffRow name="Sarah Jenkins" email="sarah@acme.com" role="Evaluator" permissions="Grade Exams" />
            <StaffRow name="Tom Baker" email="tom@acme.com" role="Creator" permissions="Create Exams" />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StaffRow({ name, email, role, permissions }: { name: string, email: string, role: string, permissions: string }) {
  const [active, setActive] = useState(true);
  
  return (
    <tr className="hover:bg-zinc-50 transition-colors cursor-pointer group">
      <td className="px-4 py-3">
        <div className="font-medium text-zinc-900">{name}</div>
        <div className="text-xs text-zinc-500">{email}</div>
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-700">
          {role}
        </span>
      </td>
      <td className="px-4 py-3 text-zinc-600">{permissions}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-4">
          <button 
            onClick={() => setActive(!active)}
            className={`w-8 h-4 rounded-full transition-colors relative ${active ? 'bg-zinc-900' : 'bg-zinc-200'}`}
          >
            <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${active ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </button>
          <button className="text-zinc-400 hover:text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

interface Resume {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  status: 'Pending' | 'Shortlisted' | 'Rejected';
  appliedDate: string;
  skills: string[];
  experience: string;
  education: string;
  summary: string;
}

const MOCK_RESUMES: Resume[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Senior Frontend Engineer',
    matchScore: 94,
    status: 'Pending',
    appliedDate: '2 hours ago',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    experience: '5 years at TechCorp building scalable web applications. Led a team of 4 frontend developers.',
    education: 'B.S. Computer Science, University of Washington',
    summary: 'Strong candidate with excellent React and TypeScript skills. Experience aligns perfectly with the senior role requirements. Shows great leadership potential.'
  },
  {
    id: '2',
    name: 'Michael Chang',
    role: 'Backend Developer',
    matchScore: 82,
    status: 'Shortlisted',
    appliedDate: '1 day ago',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    experience: '3 years at DataSys. Maintained microservices architecture and improved API response times by 40%.',
    education: 'M.S. Software Engineering, San Jose State University',
    summary: 'Solid backend experience, particularly with Node.js and AWS. Good fit for the mid-level backend position.'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    matchScore: 65,
    status: 'Rejected',
    appliedDate: '3 days ago',
    skills: ['Figma', 'Prototyping', 'User Research', 'Wireframing'],
    experience: '1 year at DesignStudio. Created wireframes and user flows for mobile apps.',
    education: 'B.A. Graphic Design, RISD',
    summary: 'Promising junior designer, but lacks the required 3+ years of experience for this specific role.'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Senior Frontend Engineer',
    matchScore: 88,
    status: 'Pending',
    appliedDate: '4 days ago',
    skills: ['Vue.js', 'JavaScript', 'CSS', 'Jest', 'Webpack'],
    experience: '6 years at WebSolutions. Architected the main customer portal using Vue.js.',
    education: 'B.S. Computer Science, UC Berkeley',
    summary: 'Very experienced frontend developer, though primary experience is in Vue rather than React. Still a strong candidate worth interviewing.'
  }
];

function ResumesView() {
  const [resumes, setResumes] = useState<Resume[]>(MOCK_RESUMES);
  const [selectedId, setSelectedId] = useState<string>(MOCK_RESUMES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedResume = resumes.find(r => r.id === selectedId);

  const handleStatusChange = (id: string, newStatus: 'Pending' | 'Shortlisted' | 'Rejected') => {
    setResumes(resumes.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const filteredResumes = resumes.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - List */}
      <div className="w-80 border-r border-zinc-200 flex flex-col">
        <div className="p-4 border-b border-zinc-200">
          <h1 className="text-lg font-semibold text-zinc-900 mb-4">Resume Screening</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input 
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredResumes.map(resume => (
            <button
              key={resume.id}
              onClick={() => setSelectedId(resume.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedId === resume.id 
                  ? 'bg-zinc-900 text-white' 
                  : 'hover:bg-zinc-50 text-zinc-900'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-sm truncate pr-2">{resume.name}</div>
                <div className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  selectedId === resume.id 
                    ? 'bg-zinc-800 text-zinc-300' 
                    : resume.matchScore >= 90 ? 'bg-emerald-100 text-emerald-700' :
                      resume.matchScore >= 75 ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                }`}>
                  {resume.matchScore}% Match
                </div>
              </div>
              <div className={`text-xs truncate ${selectedId === resume.id ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {resume.role}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] uppercase tracking-wider font-medium ${
                  selectedId === resume.id ? 'text-zinc-400' :
                  resume.status === 'Shortlisted' ? 'text-emerald-600' :
                  resume.status === 'Rejected' ? 'text-rose-600' :
                  'text-zinc-400'
                }`}>
                  {resume.status}
                </span>
                <span className={`text-[10px] ${selectedId === resume.id ? 'text-zinc-500' : 'text-zinc-400'}`}>•</span>
                <span className={`text-[10px] ${selectedId === resume.id ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {resume.appliedDate}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Content - Details */}
      {selectedResume ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50/50">
          <div className="p-8 border-b border-zinc-200 bg-white flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-900 mb-1">{selectedResume.name}</h2>
              <div className="text-zinc-500 text-sm flex items-center gap-2">
                <span>{selectedResume.role}</span>
                <span>•</span>
                <span>Applied {selectedResume.appliedDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors border border-zinc-200 bg-white" title="Download PDF">
                <Download size={16} />
              </button>
              <button 
                onClick={() => handleStatusChange(selectedResume.id, 'Rejected')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                  selectedResume.status === 'Rejected' 
                    ? 'bg-rose-50 text-rose-700 border-rose-200' 
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <ThumbsDown size={14} />
                Reject
              </button>
              <button 
                onClick={() => handleStatusChange(selectedResume.id, 'Shortlisted')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                  selectedResume.status === 'Shortlisted' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800'
                }`}
              >
                <ThumbsUp size={14} />
                Shortlist
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto space-y-8">
              
              {/* AI Analysis Card */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <h3 className="font-medium text-zinc-900">AI Screening Analysis</h3>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {selectedResume.summary}
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-zinc-500">Match Score:</span>
                    <span className="ml-2 font-semibold text-zinc-900">{selectedResume.matchScore}%</span>
                  </div>
                  <div className="h-4 w-px bg-zinc-200"></div>
                  <div className="text-sm">
                    <span className="text-zinc-500">Recommendation:</span>
                    <span className={`ml-2 font-medium ${selectedResume.matchScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {selectedResume.matchScore >= 80 ? 'Strongly Consider' : 'Review Carefully'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-medium text-zinc-900 mb-3 uppercase tracking-wider">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedResume.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-medium text-zinc-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-medium text-zinc-900 mb-3 uppercase tracking-wider">Experience</h3>
                <div className="bg-white border border-zinc-200 rounded-xl p-5">
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {selectedResume.experience}
                  </p>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-medium text-zinc-900 mb-3 uppercase tracking-wider">Education</h3>
                <div className="bg-white border border-zinc-200 rounded-xl p-5">
                  <p className="text-sm text-zinc-600">
                    {selectedResume.education}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-zinc-50/50">
          <div className="text-center text-zinc-500">
            <FileSearch size={48} className="mx-auto mb-4 opacity-20" />
            <p>Select a candidate to view their resume</p>
          </div>
        </div>
      )}
    </div>
  );
}
