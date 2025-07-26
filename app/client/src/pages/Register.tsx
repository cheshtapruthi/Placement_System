import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, GraduationCap, School, Home, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
    address: '',
    qualifications: '',
    skills:'',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://placement-sys.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Registered successfully');
        navigate('/login'); // redirect to login page
      } else {
        alert('❌ ' + result.error);
      }
    } catch (err) {
      console.error('Register Error:', err);
      alert('❌ Server error');
    } finally {
      setLoading(false);
    }
  };
  const apiUrl = process.env.VITE_API_URL;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-lg">
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-2">
            <GraduationCap className="mx-auto h-10 w-10 text-blue-600" />
            <CardTitle className="text-2xl font-bold text-gray-800">Create an Account</CardTitle>
            <CardDescription>Fill in the details to register</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="**********" />
              </div>

              <div>
                <Label htmlFor="branch">Branch</Label>
                <Input id="branch" name="branch" type="text" required value={formData.branch} onChange={handleChange} placeholder="2022-2026" />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" type="text" required value={formData.address} onChange={handleChange} placeholder="City, State" />
              </div>

              <div>
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input id="qualifications" name="qualifications" type="text" required value={formData.qualifications} onChange={handleChange} placeholder="B.Tech in CSE, GPA: 8.5" />
              </div>
              <div>
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" name="skills" type="text" required value={formData.skills} onChange={handleChange}placeholder='Skill1,Skill2,Skill3' />
              </div>

              <Button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
