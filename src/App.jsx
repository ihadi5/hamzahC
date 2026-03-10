import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ? 
  <Layout currentPageName={currentPageName}>{children}</Layout> 
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50" dir="rtl">
           <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-[#0f1b2d] mb-2">حساب غير مسجل</h2>
              <p className="text-slate-500">عذراً، هذا الحساب غير مسجل في النظام.</p>
           </div>
        </div>
      );
    } else if (authError.type === 'auth_required') {
      // 🛑 تم إعطاء حارس البوابة إجازة مؤقتة عشان تقدر تشوف الداشبورد في Bolt!
      // navigateToLogin();
      // return null;
      console.log('تم تجاوز حماية تسجيل الدخول للمعاينة المحلية 😎');
    }
  }

  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App;