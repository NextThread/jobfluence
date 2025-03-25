
import { Link } from 'react-router-dom';
import { CalendarClock, MapPin, Building, ExternalLink, BookmarkPlus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  lastDate: string;
  category: string;
  jobType: string;
  isHot?: boolean;
  isNew?: boolean;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  lastDate,
  category,
  jobType,
  isHot = false,
  isNew = false,
}: JobCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="job-card"
    >
      <Card className="overflow-hidden card-hover border">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link to={`/job/${id}`} className="group">
                  <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                </Link>
                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Building className="h-3.5 w-3.5 mr-1.5" />
                    <span>{company}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <CalendarClock className="h-3.5 w-3.5 mr-1.5" />
                    <span>Apply by: {lastDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                {isHot && (
                  <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-full">
                    Hot
                  </Badge>
                )}
                {isNew && (
                  <Badge variant="default" className="text-xs px-2 py-0.5 rounded-full bg-green-500 hover:bg-green-600">
                    New
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="rounded-full text-xs font-normal">
                {category}
              </Badge>
              <Badge variant="outline" className="rounded-full text-xs font-normal">
                {jobType}
              </Badge>
            </div>
          </div>
          
          <div className="flex border-t divide-x">
            <Button 
              asChild
              variant="ghost" 
              className="flex-1 rounded-none py-3 h-12 text-sm font-normal justify-center"
            >
              <Link to={`/job/${id}`}>
                View Details
              </Link>
            </Button>
            <Button 
              asChild
              variant="ghost" 
              className="flex-1 rounded-none py-3 h-12 text-sm font-normal justify-center text-primary hover:text-primary/80"
            >
              <a href="#" onClick={(e) => e.preventDefault()}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobCard;
