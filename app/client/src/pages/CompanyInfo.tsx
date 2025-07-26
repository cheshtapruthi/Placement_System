import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
} from "lucide-react";


const Companies = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const apiUrl = process.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/companies`)
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error("Failed to fetch companies:", err));
  }, []);

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Companies Hiring
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore opportunities with top companies actively recruiting
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {companies.length} Companies Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card
            key={company.id}
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/90 backdrop-blur-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{company.logo}</div>
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {company.location}
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {company.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{company.openings} openings</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-orange-500" />
                  <span>{company.deadline}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Available Roles:</p>
                <div className="flex flex-wrap gap-1">
                  {company.roles.map((role, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p className="font-semibold text-green-600">{company.package}</p>
                </div>
                <Badge variant="secondary">{company.type}</Badge>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                onClick={() => navigate("/apply-form", { state: { company } })}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Companies;
