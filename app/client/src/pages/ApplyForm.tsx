import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CloudUpload, FileText, Sparkles } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useUser } from '@/context/UserContext'; 
import { useLocation } from "react-router-dom";


const FileUploadBox = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 cursor-pointer transition hover:bg-blue-100 text-center"
      style={{ width: 360, height: 180 }}
    >
      <input {...getInputProps()} />
      {!uploadedFile ? (
        <>
          <CloudUpload className="text-blue-600 w-12 h-12 mb-4" />
          <p className="text-sm text-gray-500">Drag & Drop your files here</p>
        </>
      ) : (
        <>
          <FileText className="text-green-600 w-10 h-10 mb-2" />
          <p className="text-sm text-gray-700 font-medium truncate w-48">
            {uploadedFile.name}
          </p>
        </>
      )}
    </div>
  );
};

const ApplyForm = () => {
  const location = useLocation();
  const company = location.state?.company;

  const { email: loggedInEmail } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    qualifications: '',
    branch: '',
    resume: null as File | null,
    password: '',
  });
  useEffect(() => {
    if (loggedInEmail) {
      setFormData(prev => ({ ...prev, email: loggedInEmail }));
    }
  }, [loggedInEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!company) {
      alert("Company data missing");
      return;
    }
  
    const form = new FormData();
    form.append("email", formData.email);
    form.append("name", formData.name);
    form.append("address", formData.address);
    form.append("qualifications", formData.qualifications);
    form.append("branch", formData.branch);
    form.append("resume", formData.resume!);
    form.append("password", formData.password); // only used when first creating
  
    try {
      // Step 1: Upload resume & update student (if exists) OR create
      const studentResponse = await fetch("http://localhost:5000/api/students/update-or-create", {
        method: "POST",
        body: form,
      });
      const studentResult = await studentResponse.json();
  
      if (!studentResponse.ok) {
        alert("❌ Error updating student: " + studentResult.error);
        return;
      }
  
      const studentId = studentResult.id;

  
      // Step 2: Create Application entry
      const appResponse = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          companyId: company.id,
          status: "pending",
        }),
      });
  
      const appResult = await appResponse.json();
  
      if (appResponse.ok) {
        alert("✅ Application submitted successfully!");
        console.log("Application:", appResult);
      } else {
        alert("❌ Error submitting application: " + appResult.error);
      }
  
    } catch (error) {
      console.error("Network error:", error);
      alert("❌ Failed to submit application");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Gradient Blur Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-16 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-24 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
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
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
        <Link
          to="/home"
          className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-8 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Apply for Position</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Your full address"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="qualifications">Qualifications</label>
              <input
                type="text"
                id="qualifications"
                name="qualifications"
                required
                value={formData.qualifications}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="B.Tech in CSE, GPA: 8.5"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                required
                value={formData.branch}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-4" htmlFor="resume">Upload Resume (PDF)</label>
              <FileUploadBox onFileSelect={(file) => setFormData(prev => ({ ...prev, resume: file }))} />
              {formData.resume && (
                <p className="text-sm text-gray-600 mt-1">Uploaded: {formData.resume.name}</p>
              )}
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
