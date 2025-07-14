import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AuthPage from './components/AuthPage';
import AboutPage from './components/AboutPage';
import StandaloneProfilePage from './components/StandaloneProfilePage';
import AuthCallback from './components/AuthCallback';
import ProfileCompletionPage from './components/ProfileCompletionPage';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ettqxdag4t56suua.us.auth0.com"
      clientId="kIYlaAzVn6IF7I464yN0phyDyTTb6YJm"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/callback",
        audience: "https://eventfinder/api" // <-- Set your API identifier here
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<StandaloneProfilePage />} />
          <Route path="/profile-completion" element={<ProfileCompletionPage />} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
