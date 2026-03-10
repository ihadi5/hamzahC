import React from 'react';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleDashboardAccess = () => {
    const p = window.prompt('أدخل رمز المرور للوحة التحكم:');
    if (p === 'hamza2025') {
      navigate('/Dashboard');
    } else if (p !== null) {
      alert('رمز المرور غير صحيح! ❌');
    }
  };

  return (
    <footer dir="rtl" className="bg-[#0a1220] py-12 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* الشعار والاسم */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wide">مؤسسة حمزة مرغلاني التجارية</h3>
              <p className="text-white/40 text-xs mt-1 font-medium">للسباكة والكهرباء والتوريدات</p>
            </div>
          </div>
          
          {/* الحقوق والباب السري للوحة التحكم */}
          <p className="text-white/30 text-sm font-medium">
            © <span 
                className="cursor-pointer hover:text-orange-500/80 transition-colors duration-300" 
                onClick={handleDashboardAccess}
                title="الوصول السريع"
              >
                {new Date().getFullYear()}
              </span> مؤسسة حمزة مرغلاني التجارية. جميع الحقوق محفوظة.
          </p>
          
        </div>
      </div>
    </footer>
  );
}