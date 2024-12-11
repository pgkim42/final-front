import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ROUTES } from './constants/routes';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ApplicationManagement from './pages/ApplicationManagement'; // 오타 수정
import JobseekerMyPage from './pages/JobseekerMyPage';
import ProfileEdit from './pages/ProfileEdit';

// Job Features
import JobListPage from './features/job/JobListPage';
import JobPosting from './features/job/JobPosting';
import JobPostDetail from './features/job/JobPostDetail';

// Resume Features
import ResumePosting from './features/resume/ResumePosting';
import ResumeEdit from './features/resume/ResumeEdit';
import ResumeRead from './features/resume/ResumeRead';
import ResumeList from './features/resume/ResumeList';

// Company Features
import CompanyDetail from './features/company/CompanyDetail';

import TestResume from './TestResume';

// User Features
import SignIn from './features/user/view/Authentication/SignIn';
import SignUp from './features/user/view/Authentication/SignUp';
import OAuthCallback from './pages/OAuthCallback';
import { AuthProvider } from './pages/AuthContent';

// Admin Features
import AdminMain from './features/admin/AdminMain';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          {/* 메인 */}
          <Route path={ROUTES.HOME} element={<Home />} />

          {/* 채용공고 관련 */}
          <Route path={ROUTES.JOB.LIST} element={<JobListPage />} />
          <Route path={ROUTES.JOB.POST} element={<JobPosting />} />
          <Route path={ROUTES.JOB.DETAIL} element={<JobPostDetail />} />

          {/* 이력서 관련 */}
          <Route path={ROUTES.RESUME.LIST} element={<ResumeList />} />
          <Route path={ROUTES.RESUME.POST} element={<ResumePosting />} />
          {/* <Route path={ROUTES.RESUME.EDIT} element={<ResumeEdit />} /> */}
          {/* <Route path={ROUTES.RESUME.READ} element={<ResumeRead />} /> */}
          <Route path={ROUTES.RESUME.EDIT_TEST} element={<ResumeEdit />} />
          <Route path={ROUTES.RESUME.READ_TEST} element={<ResumeRead />} />

          {/* 프로필/마이페이지 관련 */}
          <Route path={ROUTES.PROFILE.MY_PAGE} element={<JobseekerMyPage />} />
          <Route path={ROUTES.PROFILE.EDIT} element={<ProfileEdit />} />
          <Route path={ROUTES.PROFILE.APPLICATIONS} element={<ApplicationManagement />} />

          <Route path={ROUTES.PROFILE.COMPANY_TEST} element={<CompanyDetail />} />

          {/* 로그인/회원가입 관련 */}

          <Route path={ROUTES.USER.REGISTER} element={<SignUp />} />
          <Route path={ROUTES.USER.LOGIN} element={<SignIn />} />
          <Route path={ROUTES.USER.SOCIALLOGIN} element={<OAuthCallback />} />

          {/* 관리자 페이지 */}
          <Route path={ROUTES.ADMIN.ADMIN} element={<AdminMain />} />

          {/* API 테스트용 */}
          <Route path="/TestResume" element={<TestResume />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
