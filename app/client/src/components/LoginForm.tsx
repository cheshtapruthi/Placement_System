import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, User, Lock, GraduationCap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';


const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ useUser called here correctly
  const { setEmail: setUserEmail, email: loggedInEmail } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        alert(`❌ User Doesn't exist or Password is Incorrect!`);
      } else {
        localStorage.setItem("isLoggedIn", "true");
        setUserEmail(email);
        navigate("/home");
      }
    } catch (err) {
      alert("❌ Network error. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  



  const floatingParticles = useMemo(() => (
    [...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
        }}
      >
        <Sparkles className="w-4 h-4 text-blue-400/30" />
      </div>
    ))
  ), []);

  return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Sparkles and Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        {floatingParticles}
      </div>

      {/* Left Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-transparent z-10 relative">
        <div className="flex flex-col justify-center items-center p-12 text-black">
          <div className="mb-8 text-center text-black-100">
            <GraduationCap className="w-20 h-20" />
            <h1 className="text-4xl font-bold mb-2">PlaceMe</h1>
            <p className="text-xl opacity-90">Student Placement Portal</p>
          </div>
          <div className="max-w-md text-center text-black-100">
            <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Access your placement dashboard, track applications, and connect with top companies recruiting from your institution.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 text-center text-black-200">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm opacity-75">Companies</div>
            </div>
            <div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm opacity-75">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-75">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 bg-gray-50/80 backdrop-blur">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <GraduationCap className="w-12 h-12 mx-auto text-black-600 mb-2" />
            <h1 className="text-2xl font-bold text-black-900">PlaceMe</h1>
            <p className="text-black-600">Student Placement Portal</p>
          </div>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in-up">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-black-900">Sign In</CardTitle>
              <CardDescription className="text-center text-black-600">
                Enter your credentials to access your placement dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-purple-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                  onClick={handleLogin}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  New student?{' '}
                  <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
