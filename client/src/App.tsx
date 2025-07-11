import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CreateRequestPage from './pages/CreateRequestPage';
import RequestDetailPage from './pages/RequestDetailPage';
import MyRequestsPage from './pages/MyRequestsPage';
import AcceptedRequestsPage from './pages/AcceptedRequestsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/create-request' element={<CreateRequestPage />} />
        <Route path='/request/:id' element={<RequestDetailPage />} />
        <Route path='/my-requests' element={<MyRequestsPage />} />
        <Route path='/accepted-requests' element={<AcceptedRequestsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
