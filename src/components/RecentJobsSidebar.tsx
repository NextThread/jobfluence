
import { Link } from 'react-router-dom';
import { Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecentJob {
  id: string;
  title: string;
  company: string;
  postedAgo: string;
  isNew?: boolean;
}

const recentJobs: RecentJob[] = [
  { id: '1', title: 'Senior Marketing Manager', company: 'Spotify', postedAgo: '2 hours ago', isNew: true },
  { id: '2', title: 'Software Engineer', company: 'IBM', postedAgo: '3 hours ago', isNew: true },
  { id: '3', title: 'Product Designer', company: 'Airbnb', postedAgo: '5 hours ago' },
  { id: '4', title: 'Financial Analyst', company: 'JP Morgan', postedAgo: '8 hours ago' },
  { id: '5', title: 'Customer Success Manager', company: 'Salesforce', postedAgo: '12 hours ago' },
];

const RecentJobsSidebar = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          Recently Added Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <ul className="space-y-4">
          {recentJobs.map((job) => (
            <li key={job.id} className="group">
              <Link to={`/job/${job.id}`} className="block">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                      {job.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{job.company}</p>
                  </div>
                  {job.isNew ? (
                    <Badge variant="default" className="text-xs px-2 py-0.5 bg-green-500 hover:bg-green-600">
                      New
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {job.postedAgo}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        <Button asChild variant="outline" size="sm" className="w-full mt-6">
          <Link to="/jobs/recent">
            <ExternalLink className="h-3.5 w-3.5 mr-2" />
            View All Recent Jobs
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentJobsSidebar;
