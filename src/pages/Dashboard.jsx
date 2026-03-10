import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import DashboardStats from '../components/dashboard/DashboardStats';
import QuoteRequestsTable from '../components/dashboard/QuoteRequestsTable';
import ReviewsManagement from '../components/dashboard/ReviewsManagement';
import ProjectsManagement from '../components/dashboard/ProjectsManagement';
import AppointmentsManagement from '../components/dashboard/AppointmentsManagement';
import { LayoutDashboard, FileText, Star, Briefcase, CalendarCheck, LogOut, Zap, Menu, X } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
  { id: 'quotes', label: 'طلبات التسعيرة', icon: FileText },
  { id: 'appointments', label: 'المواعيد', icon: CalendarCheck },
  { id: 'reviews', label: 'التقييمات', icon: Star },
  { id: 'projects', label: 'المشاريع', icon: Briefcase },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // 1. حطينا بيانات وهمية للمدير عشان الواجهة تطلع فخمة وما تزعل
  const [user, setUser] = useState({ full_name: 'مدير النظام', email: 'admin@hamza-est.com' });

  useEffect(() => {
    // 2. وقفنا كود الطرد عشان يسمح لك تتصفح الداشبورد براحتك في بيئة Bolt 😎
    // base44.auth.me().then(setUser).catch(() => base44.auth.redirectToLogin());
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardStats />;
      case 'quotes': return <QuoteRequestsTable />;
      case 'appointments': return <AppointmentsManagement />;
      case 'reviews': return <ReviewsManagement />;
      case 'projects': return <ProjectsManagement />;
      default: return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      {/* Sidebar Overlay on mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-[#0f1b2d] z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="text-white font-bold">مؤسسة حمزة</h1>
              <p className="text-white/40 text-xs">لوحة التحكم</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/10">
          {user && (
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                {user.full_name?.charAt(0) || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.full_name}</p>
                <p className="text-white/40 text-xs truncate">{user.email}</p>
              </div>
            </div>
          )}
          {/* 3. خلينا زر الخروج يرجعك بسلاسة للرئيسية */}
          <button onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-white hover:bg-red-500/20 transition-all">
            <LogOut className="w-4 h-4" />
            العودة للموقع
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100">
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-[#0f1b2d] font-black text-lg">{TABS.find(t => t.id === activeTab)?.label}</h2>
          {/* 4. استخدمنا navigate للزر العلوي بعد عشان ما يعلق المتصفح */}
          <button onClick={() => navigate('/')} className="text-sm text-orange-500 hover:underline font-medium cursor-pointer">
            ← العودة للموقع
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}