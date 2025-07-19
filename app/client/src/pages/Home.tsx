import React, { useEffect, useState, useMemo } from 'react';
import { Menu, X, Bell, LogOut, Sparkles, Briefcase, Users, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const navigate = useNavigate();

  // 🔐 Check login
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/');
    }

    const shown = localStorage.getItem("notificationShown");
    if (shown !== "true") {
      setShowNotification(true);
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNotificationClose = () => {
    localStorage.setItem("notificationShown", "true");
    setShowNotification(false);
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setIsRead(checked === true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const menuItems = [
    { name: 'Home', path: '/home' },
    { name: 'Student Corner', path: '/student-corner' },
    { name: 'Company Info', path: '/company-info' },
    { name: 'Results / Selection', path: '/results' },
  ];

  const maangLogos = [
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png', alt: 'Meta logo' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png', alt: 'Apple logo' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png', alt: 'Amazon logo' },
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png', alt: 'Netflix logo' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png', alt: 'Google logo' },
  ];

  const stats = [
    { label: "Total Students", value: "1,200+", icon: Users, color: "text-blue-500" },
    { label: "Companies Visited", value: "60+", icon: Briefcase, color: "text-purple-500" },
    { label: "Successful Placements", value: "800+", icon: Star, color: "text-yellow-500" }
  ];

  const floatingParticles = useMemo(() => (
    [...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      >
        <Sparkles className="w-4 h-4 text-blue-400/30" />
      </div>
    ))
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {floatingParticles}
      </div>

      <div className="relative z-10">
        <header className="bg-white shadow-sm border-b relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900 mr-6">Placement Portal</h1>
                <div className="flex space-x-4 items-center">
                  {maangLogos.map((company, index) => (
                    <div key={index} className="w-12 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-1">
                      <img src={company.logo} alt={company.alt} className="max-w-full max-h-full object-contain" style={{ maxHeight: '24px' }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
                </button>

                <button
                  onClick={handleLogout}
                  className="ml-3 flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="absolute top-full right-4 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 space-y-3">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors border border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to Placement Portal
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your gateway to career opportunities with top tech companies. 
              Connect with leading organizations and kickstart your professional journey.
            </p>
          </div>

          {/* ✅ CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-300">
            <Button 
              onClick={() => navigate('/student-corner')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/company-info')}
              variant="outline"
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Companies
            </Button>
          </div>

          {/* ✅ Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/30 animate-fade-in-up"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ✅ Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Matching",
                description: "AI-powered job matching based on your skills and preferences",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Interview Prep",
                description: "Comprehensive resources and mock interviews to boost confidence",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Real-time Updates",
                description: "Get instant notifications about new opportunities and deadlines",
                gradient: "from-green-500 to-teal-500"
              },
              {
                title: "Company Insights",
                description: "Detailed information about company culture, packages, and requirements",
                gradient: "from-orange-500 to-red-500"
              },
              {
                title: "Progress Tracking",
                description: "Monitor your application status and interview progress",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                title: "Success Stories",
                description: "Learn from peers who successfully landed their dream jobs",
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/30 animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4 flex items-center justify-center`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </main>

        {/* 🔔 Notification Dialog */}
        <Dialog open={showNotification} onOpenChange={setShowNotification}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-sky-600" />
                Hiring Alert
              </DialogTitle>
              <DialogDescription className="text-left pt-2">
                <div className="bg-sky-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">
                    🎉 Great news! This company is actively hiring and you are eligible for this position. 
                    Don't miss out on this opportunity to join a leading tech company.
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="read-notification"
                    checked={isRead}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label htmlFor="read-notification" className="text-sm text-gray-600 cursor-pointer">
                    Mark as read
                  </label>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={handleNotificationClose} className="text-gray-600">
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowNotification(false);
                  navigate('/apply-form');
                }}
                className="bg-sky-600 hover:bg-sky-700"
              >
                Apply Now
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
