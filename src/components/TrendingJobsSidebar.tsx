
import { Link } from 'react-router-dom';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrendingJob {
  id: string;
  title: string;
  company: string;
  views: number;
}

const trendingJobs: TrendingJob[] = [
  { id: '1', title: 'Senior React Developer', company: 'Microsoft', views: 1245 },
  { id: '2', title: 'Project Manager', company: 'Amazon', views: 1087 },
  { id: '3', title: 'UX Designer', company: 'Google', views: 986 },
  { id: '4', title: 'Data Scientist', company: 'Facebook', views: 945 },
  { id: '5', title: 'DevOps Engineer', company: 'Netflix', views: 893 },
];

const TrendingJobsSidebar = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
          Trending Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <ul className="space-y-4">
          {trendingJobs.map((job) => (
            <li key={job.id} className="group">
              <Link to={`/job/${job.id}`} className="block">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                      {job.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{job.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {job.views}
                  </Badge>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        <Button asChild variant="outline" size="sm" className="w-full mt-6">
          <Link to="/jobs/trending">
            <ExternalLink className="h-3.5 w-3.5 mr-2" />
            View All Trending Jobs
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrendingJobsSidebar;
