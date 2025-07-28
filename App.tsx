import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ImageEditorPage from './pages/ImageEditorPage';
import WordCounterPage from './pages/WordCounterPage';
import QRCodePage from './pages/QRCodePage';
import FindReplacePage from './pages/FindReplacePage';
import SerpSimulatorPage from './pages/SerpSimulatorPage';
import YouTubeTitleCheckerPage from './pages/YouTubeTitleCheckerPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import SecurityPage from './pages/SecurityPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/image-editor" element={<ImageEditorPage />} />
          <Route path="/word-counter" element={<WordCounterPage />} />
          <Route path="/qr-code-generator" element={<QRCodePage />} />
          <Route path="/find-replace" element={<FindReplacePage />} />
          <Route path="/serp-simulator" element={<SerpSimulatorPage />} />
          <Route path="/youtube-title-checker" element={<YouTubeTitleCheckerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/security" element={<SecurityPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
