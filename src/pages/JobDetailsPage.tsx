
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Clock, 
  ChevronLeft, 
  Share2, 
  Bookmark, 
  ExternalLink,
  CheckCircle,
  X,
  Heart,
  Flag,
  Linkedin
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { JOBS } from '@/utils/dummyData';
import TrendingJobsSidebar from '@/components/TrendingJobsSidebar';
import RecentJobsSidebar from '@/components/RecentJobsSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate fetch delay
    const timer = setTimeout(() => {
      const foundJob = JOBS.find(job => job.id === id);
      setJob(foundJob);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Job removed from saved jobs" : "Job saved successfully",
      description: isBookmarked 
        ? "The job has been removed from your saved list." 
        : "You can view it in your saved jobs section.",
    });
  };
  
  const handleShareClick = () => {
    setShareOpen(true);
  };
  
  const handleApply = () => {
    toast({
      title: "Application submitted",
      description: "Your application has been successfully submitted.",
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse space-y-4 w-full max-w-3xl">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/jobs">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:flex-1">
          {/* Navigation */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
              <span className="mx-2">/</span>
              <Link to={`/jobs/${job.category.toLowerCase().replace(' jobs', '')}`} className="hover:text-primary transition-colors">{job.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{job.title}</span>
            </div>
            
            <Button asChild variant="outline" size="sm">
              <Link to="/jobs">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Link>
            </Button>
          </div>
          
          {/* Job header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border rounded-lg p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs font-normal rounded-full">
                    {job.category}
                  </Badge>
                  {job.isHot && (
                    <Badge variant="destructive" className="text-xs rounded-full">
                      Hot
                    </Badge>
                  )}
                  {job.isNew && (
                    <Badge variant="default" className="text-xs rounded-full bg-green-500 hover:bg-green-600">
                      New
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1.5" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>Apply by: {job.lastDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1.5" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>Posted: {job.postedDate}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full text-xs font-normal">
                    {job.experience}
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs font-normal">
                    {job.salary}
                  </Badge>
                </div>
              </div>
              
              <div className="flex space-x-2 self-start">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShareClick}
                  aria-label="Share job"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={isBookmarked ? "default" : "outline"}
                  size="icon"
                  onClick={handleBookmark}
                  aria-label={isBookmarked ? "Remove from saved jobs" : "Save job"}
                  className={isBookmarked ? "text-white" : ""}
                >
                  <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      Easy Apply
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Apply for {job.title}</DialogTitle>
                      <DialogDescription>
                        Complete this form to quickly apply for this position at {job.company}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right text-sm">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right text-sm">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="resume" className="text-right text-sm">
                          Resume
                        </label>
                        <input
                          id="resume"
                          type="file"
                          className="col-span-3 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Close"]')?.click()}>
                        Cancel
                      </Button>
                      <Button type="button" onClick={handleApply}>
                        Submit Application
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>
          
          {/* Job details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Job Description</h2>
                <div className="prose prose-sm max-w-none text-foreground/80">
                  <p className="mb-4">{job.description}</p>
                  
                  <h3 className="text-base font-medium mt-6 mb-3">Responsibilities:</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    {job.responsibilities.map((item: string, index: number) => (
                      <li key={index} className="text-foreground/80">{item}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Job Requirements</h2>
                <div className="prose prose-sm max-w-none text-foreground/80">
                  <ul className="space-y-2">
                    {job.requirements.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="benefits" className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Benefits & Perks</h2>
                <div className="prose prose-sm max-w-none text-foreground/80">
                  <ul className="space-y-2">
                    {job.benefits.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="company" className="bg-white border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">About {job.company}</h2>
                <div className="prose prose-sm max-w-none text-foreground/80">
                  <p>
                    {job.company} is a leading company in the industry. More details about the company will be available here.
                  </p>
                  
                  <div className="flex items-center justify-center my-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary">
                      {job.company.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-base font-medium mb-2">Company Details:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Industry: Technology</span>
                      </li>
                      <li className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Headquarters: {job.location}</span>
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Company Size: 1000+ employees</span>
                      </li>
                      <li className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Website: www.{job.company.toLowerCase()}.com</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Job actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            <Button className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
            <Button variant="outline" className="flex items-center" onClick={handleBookmark}>
              <Heart className="h-4 w-4 mr-2" fill={isBookmarked ? "currentColor" : "none"} />
              {isBookmarked ? 'Saved' : 'Save Job'}
            </Button>
            <Button variant="ghost" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </motion.div>
          
          {/* Similar jobs - Mobile only */}
          {isMobile && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
              <TrendingJobsSidebar />
            </div>
          )}
        </div>
        
        {/* Right sidebar - only on desktop */}
        {!isMobile && (
          <div className="w-80 space-y-8 hidden lg:block">
            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Job Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{job.location}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Job Type:</span>
                    <span className="font-medium">{job.jobType}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Salary:</span>
                    <span className="font-medium">{job.salary}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{job.experience}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Last Date:</span>
                    <span className="font-medium">{job.lastDate}</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-6">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </CardContent>
            </Card>
            
            <TrendingJobsSidebar />
            <RecentJobsSidebar />
          </div>
        )}
      </div>
      
      {/* Share dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Job</DialogTitle>
            <DialogDescription>
              Share this job opportunity with your network.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative flex items-center">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm"
                readOnly
                value={window.location.href}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({ title: "Link copied to clipboard" });
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-center gap-4 mt-2">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-[#1877F2] text-white hover:bg-[#1877F2]/90">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-[#25D366] text-white hover:bg-[#25D366]/90">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 bg-[#EA4335] text-white hover:bg-[#EA4335]/90">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="secondary" onClick={() => setShareOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// These components are needed for the Company tab but aren't imported from lucide-react by default
const Users = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Globe = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Copy = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const Facebook = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const MessageCircle = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const Mail = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default JobDetailsPage;
