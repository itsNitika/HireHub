import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";

import ProtectedRoute from "./components/ProtectedRoute";
import RecruiterRoute from "./components/RecruiterRoute";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("placepro_splash_seen");
  });

  const [showApp, setShowApp] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (showSplash) {
      const splashTimer = setTimeout(() => {
        sessionStorage.setItem("placepro_splash_seen", "1");
        setShowSplash(false);
      }, 2500);

      return () => clearTimeout(splashTimer);
    }

    const appTimer = setTimeout(() => {
      setShowApp(true);
      setTimeout(() => {
        setFadeIn(true);
      }, 30);
    }, 100);

    return () => clearTimeout(appTimer);
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ease-out ${
        fadeIn ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
      }`}
    >
      <div className="transition-all duration-1000 ease-out">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-applications"
            element={
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter-dashboard"
            element={
              <RecruiterRoute>
                <RecruiterDashboard />
              </RecruiterRoute>
            }
          />

          <Route
            path="/create-job"
            element={
              <RecruiterRoute>
                <CreateJob />
              </RecruiterRoute>
            }
          />

          <Route
            path="/applicants/:jobId"
            element={
              <RecruiterRoute>
                <Applicants />
              </RecruiterRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;