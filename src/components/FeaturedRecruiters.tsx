
import { Link } from 'react-router-dom';
import { Building, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Recruiter {
  id: string;
  name: string;
  logo: string;
  jobCount: number;
}

const recruiters: Recruiter[] = [
  { id: '1', name: 'Google', logo: 'G', jobCount: 25 },
  { id: '2', name: 'Microsoft', logo: 'M', jobCount: 18 },
  { id: '3', name: 'Amazon', logo: 'A', jobCount: 22 },
  { id: '4', name: 'Apple', logo: 'A', jobCount: 15 },
  { id: '5', name: 'Facebook', logo: 'F', jobCount: 12 },
];

const FeaturedRecruiters = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Building className="h-4 w-4 mr-2 text-primary" />
          Featured Recruiters
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <ul className="space-y-4">
          {recruiters.map((recruiter) => (
            <li key={recruiter.id} className="group">
              <Link to={`/recruiter/${recruiter.id}`} className="block">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={`/companies/${recruiter.id}.png`} alt={recruiter.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {recruiter.logo}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                      {recruiter.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {recruiter.jobCount} open positions
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        <Button asChild variant="outline" size="sm" className="w-full mt-6">
          <Link to="/recruiters">
            <ExternalLink className="h-3.5 w-3.5 mr-2" />
            View All Recruiters
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedRecruiters;
