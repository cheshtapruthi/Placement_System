import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

import { 
  Building2, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Award,
  TrendingUp,
  AlertCircle
} from "lucide-react";


export default function StudentsCorner() {
  const { email } = useUser();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`https://placement-sys.onrender.com/api/students/${email}`);
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error("Failed to fetch student:", err);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchStudentData();
  }, [email]);
  console.log(student);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!student) return <div className="p-4 text-center text-red-600">Student data not found</div>;

  const selectedCount = student.applications?.filter(app => app.status === "Selected")?.length || 0;
  const pendingCount = student.applications?.filter(app => app.status === "Interview Pending").length || 0;
  const successRate = student.applications?.length
  ? (selectedCount / student.applications.length) * 100
  : 0;


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student's Corner
          </h1>
          <p className="text-muted-foreground mt-2">
            Your placement journey dashboard
          </p>
        </div>
      </div>

      {/* Student Profile Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-semibold">{student.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Student ID</p>
              <p className="font-semibold">{student.id}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Department</p>
              <p className="font-semibold">{student.branch}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">CGPA</p>
              <p className="font-semibold text-green-600">{student.qualifications.split(":")[1]?.trim()}/10</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {student.skills?.split(',').map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {skill.trim()}
                </Badge>
              )) || <p className="text-sm text-gray-500">No skills listed</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">{student.applications?.length || 0}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Offers</p>
                <p className="text-2xl font-bold text-green-600">{student.offers?.length || 0}</p>
              </div>
              <Award className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">{successRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Past Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Past Applications
            </CardTitle>
            <CardDescription>
              Track your application history and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {student.applications?.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{application.company?.name}</h3>
                      <p className="text-sm text-muted-foreground">{application.company?.position}</p>
                      <p className="text-sm font-medium text-green-600">{application.company?.package}</p>
                      <p className="text-xs text-muted-foreground">Location: {application.company?.location}</p>
                    </div>
                    <Badge className={`bg-gray-100 text-gray-800`}>
                      {application.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Offers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Job Offers
            </CardTitle>
            <CardDescription>
              Your current job offers and their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {student.offers?.map((offer) => (
                <div key={offer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{offer.company}</h3>
                      <Badge variant={offer.status === "Accepted" ? "default" : "secondary"}>
                        {offer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{offer.position}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-green-600">{offer.package}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{offer.location}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Joining: {offer.joiningDate}</p>
                  </div>
                </div>
              ))}

            </div>
          </CardContent>
        </Card>
      </div>


      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="font-medium">{student.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Academic Progress</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
