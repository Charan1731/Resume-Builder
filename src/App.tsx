import ResumeBuilder from '@/components/ResumeBuilder';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import AiAnalysis from './components/AI';

export default function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="/ai-analysis" element={<AiAnalysis />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}