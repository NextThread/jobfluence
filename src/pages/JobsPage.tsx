
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import JobPagination from '@/components/JobPagination';
import TrendingJobsSidebar from '@/components/TrendingJobsSidebar';
import RecentJobsSidebar from '@/components/RecentJobsSidebar';
import FeaturedRecruiters from '@/components/FeaturedRecruiters';
import { JOBS } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const JobsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8);
  const { category } = useParams();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const locationParam = searchParams.get('location') || '';
  
  // Get filter values from URL parameters
  const categoriesParam = searchParams.get('categories')?.split(',') || [];
  const locationsParam = searchParams.get('locations')?.split(',') || [];
  const experiencesParam = searchParams.get('experiences')?.split(',') || [];
  const jobTypeParam = searchParams.get('jobType') || '';
  const lastDateParam = searchParams.get('lastDate') || '';
  const salaryParam = searchParams.get('salary') ? Number(searchParams.get('salary')) : 0;

  // Filter jobs based on all parameters
  const filteredJobs = JOBS.filter((job) => {
    // Base filters
    const matchesCategory = category 
      ? job.category.toLowerCase().includes(category.toLowerCase()) 
      : true;
      
    const matchesKeyword = keyword
      ? job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(keyword.toLowerCase())
      : true;
      
    const matchesLocation = locationParam
      ? job.location.toLowerCase().includes(locationParam.toLowerCase())
      : true;
    
    // Category filter
    const matchesCategoryFilter = categoriesParam.length > 0
      ? categoriesParam.some(cat => job.category.includes(cat))
      : true;
      
    // Location filter from filter component
    const matchesLocationFilter = locationsParam.length > 0
      ? locationsParam.some(loc => job.location.includes(loc))
      : true;
      
    // Experience filter
    const matchesExperience = experiencesParam.length > 0
      ? experiencesParam.some(exp => job.experience === exp)
      : true;
      
    // Job type filter
    const matchesJobType = jobTypeParam && jobTypeParam !== 'all'
      ? job.jobType.toLowerCase() === jobTypeParam.toLowerCase()
      : true;
      
    // Salary filter
    const matchesSalary = salaryParam > 0
      ? job.salary >= salaryParam
      : true;
      
    // Last date filter logic would go here if we had actual date objects
    // For now, we'll just return true
    const matchesLastDate = true;
    
    return (
      matchesCategory && 
      matchesKeyword && 
      matchesLocation && 
      matchesCategoryFilter && 
      matchesLocationFilter && 
      matchesExperience && 
      matchesJobType && 
      matchesSalary &&
      matchesLastDate
    );
  });

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [location.search, category]);

  // Title based on current view
  const getPageTitle = () => {
    if (keyword && locationParam) return `Jobs for "${keyword}" in "${locationParam}"`;
    if (keyword) return `Jobs for "${keyword}"`;
    if (locationParam) return `Jobs in "${locationParam}"`;
    if (category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      return `${formattedCategory} Jobs`;
    }
    return 'All Jobs';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">{getPageTitle()}</h1>
        <p className="text-muted-foreground mt-2">
          {filteredJobs.length} jobs found{keyword || locationParam || category ? ' matching your criteria' : ''}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <JobFilters />

        {/* Main content */}
        <div className="flex-1">
          {/* Mobile saved jobs button */}
          {isMobile && (
            <div className="mb-6">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Bookmark className="h-4 w-4 mr-2" />
                Saved Jobs (5)
              </Button>
            </div>
          )}

          {/* Job listings */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <AnimatePresence>
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    lastDate={job.lastDate}
                    category={job.category}
                    jobType={job.jobType}
                    isHot={job.isHot}
                    isNew={job.isNew}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-gray-50 rounded-lg"
                >
                  <p className="text-lg text-muted-foreground">No jobs found matching your criteria.</p>
                  <p className="mt-2">Try adjusting your search or filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <JobPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {/* Right sidebar - only on desktop */}
        {!isMobile && (
          <div className="w-80 space-y-8 hidden lg:block">
            <div className="mb-6">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Bookmark className="h-4 w-4 mr-2" />
                Saved Jobs (5)
              </Button>
            </div>
            <TrendingJobsSidebar />
            <RecentJobsSidebar />
            <FeaturedRecruiters />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
