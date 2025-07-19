import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { TrendingUp, Users, Building2, Trophy, Target } from "lucide-react";

const acceptanceData = [
  { company: "Google", accepted: 8, applied: 45, rate: 17.8 },
  { company: "Microsoft", accepted: 12, applied: 38, rate: 31.6 },
  { company: "Amazon", accepted: 15, applied: 52, rate: 28.8 },
  { company: "Meta", accepted: 6, applied: 28, rate: 21.4 },
  { company: "Apple", accepted: 4, applied: 22, rate: 18.2 },
  { company: "Netflix", accepted: 3, applied: 18, rate: 16.7 }
];

const applicantTrends = [
  { month: "Aug", applications: 45 },
  { month: "Sep", applications: 78 },
  { month: "Oct", applications: 120 },
  { month: "Nov", applications: 95 },
  { month: "Dec", applications: 67 }
];

const skillDistribution = [
  { skill: "Full Stack", value: 35, color: "#3B82F6" },
  { skill: "Data Science", value: 20, color: "#8B5CF6" },
  { skill: "Mobile Dev", value: 15, color: "#10B981" },
  { skill: "DevOps", value: 12, color: "#F59E0B" },
  { skill: "AI/ML", value: 18, color: "#EF4444" }
];

const placementStats = [
  { 
    title: "Total Placements", 
    value: "148", 
    change: "+23%", 
    icon: Trophy,
    color: "text-green-600"
  },
  { 
    title: "Active Applications", 
    value: "342", 
    change: "+12%", 
    icon: Target,
    color: "text-blue-600"
  },
  { 
    title: "Partner Companies", 
    value: "67", 
    change: "+8%", 
    icon: Building2,
    color: "text-purple-600"
  },
  { 
    title: "Success Rate", 
    value: "43%", 
    change: "+5%", 
    icon: TrendingUp,
    color: "text-orange-600"
  }
];

const Results = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Placement Results & Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Track placement statistics, acceptance rates, and application trends
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {placementStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color} font-medium`}>{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color === 'text-green-600' ? 'from-green-100 to-green-200' : 
                  stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' :
                  stat.color === 'text-purple-600' ? 'from-purple-100 to-purple-200' : 'from-orange-100 to-orange-200'}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acceptance Rates Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
              Company Acceptance Rates
            </CardTitle>
            <CardDescription>
              Success rates by company for current placement season
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={acceptanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="company" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'accepted' ? `${value} students` : 
                    name === 'applied' ? `${value} applications` : `${value}%`,
                    name === 'accepted' ? 'Accepted' : 
                    name === 'applied' ? 'Applied' : 'Success Rate'
                  ]}
                />
                <Bar dataKey="accepted" fill="#10B981" name="accepted" />
                <Bar dataKey="applied" fill="#E5E7EB" name="applied" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skill Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Skill Distribution
            </CardTitle>
            <CardDescription>
              Student preferences by technology stack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {skillDistribution.map((entry, index) => (
                <Badge key={index} variant="outline" className="flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-2" 
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.skill}: {entry.value}%
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Application Trends
            </CardTitle>
            <CardDescription>
              Monthly application volume over the placement season
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={applicantTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} applications`, 'Applications']} />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#3B82F6" 
                  fill="url(#colorGradient)" 
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
