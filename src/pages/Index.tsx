
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, ArrowRight, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JOBS } from '@/utils/dummyData';
import { motion } from 'framer-motion';

const jobCategories = [
  { name: 'Government Jobs', icon: '🏛️', path: '/jobs/government', count: 145 },
  { name: 'Private Jobs', icon: '🏢', path: '/jobs/private', count: 320 },
  { name: 'Bank Jobs', icon: '🏦', path: '/jobs/bank', count: 57 },
  { name: 'IT Jobs', icon: '💻', path: '/jobs/it', count: 212 },
  { name: 'Railway Jobs', icon: '🚂', path: '/jobs/railway', count: 43 },
  { name: 'PSU Jobs', icon: '🏭', path: '/jobs/psu', count: 76 },
];

const Index = () => {
  const [jobKeyword, setJobKeyword] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/jobs?keyword=${jobKeyword}&location=${jobLocation}`;
  };

  // Get featured jobs (hot or new)
  const featuredJobs = JOBS.filter(job => job.isHot || job.isNew).slice(0, 6);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-transparent py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find Your Dream Job Today
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover thousands of job opportunities from top employers. Your next career move is just a click away.
            </motion.p>
            
            <motion.div 
              className="bg-white p-3 md:p-4 rounded-xl shadow-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-3">
                <div className="relative col-span-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Job title, keyword, or company"
                    className="pl-9"
                    value={jobKeyword}
                    onChange={(e) => setJobKeyword(e.target.value)}
                  />
                </div>
                <div className="relative col-span-3">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="City, state, or remote"
                    className="pl-9"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                  />
                </div>
                <Button type="submit" className="h-10 col-span-1 md:h-auto">
                  <span className="hidden md:inline">Search</span>
                  <Search className="md:hidden h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span>Popular Searches:</span>
            <div className="inline-flex flex-wrap gap-2 mt-2 justify-center">
              <Link to="/jobs?keyword=software engineer" className="hover:text-primary transition-colors">Software Engineer</Link>
              <span>•</span>
              <Link to="/jobs?keyword=data scientist" className="hover:text-primary transition-colors">Data Scientist</Link>
              <span>•</span>
              <Link to="/jobs?keyword=product manager" className="hover:text-primary transition-colors">Product Manager</Link>
              <span>•</span>
              <Link to="/jobs?keyword=marketing" className="hover:text-primary transition-colors">Marketing</Link>
              <span>•</span>
              <Link to="/jobs?keyword=remote" className="hover:text-primary transition-colors">Remote</Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Job Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse Job Categories</h2>
            <Link to="/jobs" className="text-primary hover:text-primary/80 flex items-center text-sm">
              View All Categories <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={category.path}>
                  <Card className="h-full card-hover border">
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <span className="text-3xl">{category.icon}</span>
                        <h3 className="text-lg font-medium mt-3">{category.name}</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {category.count} open positions
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Jobs</h2>
            <Link to="/jobs/featured" className="text-primary hover:text-primary/80 flex items-center text-sm">
              View All Featured Jobs <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="job-card"
              >
                <Card className="h-full card-hover border">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/job/${job.id}`} className="group">
                            <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground text-sm mt-1">{job.company}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {job.isHot && (
                            <Badge variant="destructive" className="text-xs px-2 py-0.5 rounded-full">
                              Hot
                            </Badge>
                          )}
                          {job.isNew && (
                            <Badge variant="default" className="text-xs px-2 py-0.5 rounded-full bg-green-500 hover:bg-green-600">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col mt-4 space-y-2">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-3.5 w-3.5 mr-1.5" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                          <span>{job.jobType}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Badge variant="outline" className="rounded-full text-xs font-normal">
                          {job.category}
                        </Badge>
                        <Badge variant="outline" className="rounded-full text-xs font-normal">
                          {job.experience}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border-t p-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Apply by: <span className="font-medium text-foreground">{job.lastDate}</span>
                      </span>
                      <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Link to={`/job/${job.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/jobs">
                Explore All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-4">The Fastest Way to Your Next Job</h2>
            <p className="text-muted-foreground">
              Join thousands of job seekers who have found their dream careers through JobFluence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div 
              className="p-6 bg-white border rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-3xl font-bold text-primary">10K+</p>
              <p className="text-muted-foreground mt-2">Active Jobs</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-white border rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-3xl font-bold text-primary">5K+</p>
              <p className="text-muted-foreground mt-2">Companies</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-white border rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-3xl font-bold text-primary">20K+</p>
              <p className="text-muted-foreground mt-2">Job Seekers</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-white border rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p className="text-3xl font-bold text-primary">8K+</p>
              <p className="text-muted-foreground mt-2">Hirings</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
