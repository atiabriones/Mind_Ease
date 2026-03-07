import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard'; 
import UserManagement from './pages/admin/UserManagement';
import ForumReports from './pages/admin/ForumReports';
import ReportedUsers from './pages/admin/ReportedUsers';
import CounselorManagement from './pages/admin/CounselorManagement';
import AdminAppointments from './pages/admin/AdminAppointments';
import AnalysisReports from './pages/admin/AnalysisReports';
import CounselorLogin from './pages/counselor/CounselorLogin';
import CounselorLayout from './layouts/CounselorLayout';
import CounselorDashboard from './pages/counselor/CounselorDashboard';
import CounselorNotifications from './pages/counselor/CounselorNotifications';
import CounselorChat from './pages/counselor/CounselorChat';
import CounselorAppointments from './pages/counselor/CounselorAppointments';
import CounselorProfile from './pages/counselor/CounselorProfile';
import CounselorListen from './pages/counselor/CounselorListen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          
          {/* These paths now match the Sidebar exactly */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="flag-content" element={<ForumReports />} />
          <Route path="counselors-list" element={<CounselorManagement />} />
          <Route path="appointment" element={<AdminAppointments />} />
          <Route path="analysis-reports" element={<AnalysisReports />} />
        </Route>

        {/* Counselor Routes */}
        <Route path="/counselor/login" element={<CounselorLogin />} />
        <Route path="/counselor" element={<CounselorLayout />}>
          <Route path="dashboard" element={<CounselorDashboard />} />
          <Route path="notifications" element={<CounselorNotifications />} />
          <Route path="chat" element={<CounselorChat />} />
          <Route path="listen-only" element={<CounselorListen />} />
          <Route path="appointments" element={<CounselorAppointments />} />
          <Route path="profile" element={<CounselorProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
