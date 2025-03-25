
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, X, SlidersHorizontal, Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const locations = [
  'New York',
  'San Francisco',
  'Seattle',
  'Austin',
  'Chicago',
  'Boston',
  'Los Angeles',
  'Remote',
];

const categories = [
  'Government',
  'Private',
  'Banking',
  'IT & Software',
  'Railway',
  'PSU',
  'Defense',
  'Teaching',
];

const experiences = [
  'Fresher',
  '1-3 years',
  '3-5 years',
  '5+ years',
];

const JobFilters = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [salaryRange, setSalaryRange] = useState([40000]);
  const [searchInput, setSearchInput] = useState('');
  const isMobile = useIsMobile();

  const handleReset = () => {
    setSalaryRange([40000]);
    setSearchInput('');
    // Reset other filters
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Filter sidebar for mobile
  if (isMobile) {
    return (
      <>
        <div className="sticky top-[80px] z-30 bg-white border-b p-3 flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={toggleFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex-1 mx-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-9 h-9"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7"
                  onClick={() => setSearchInput('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </div>
        
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 z-50 bg-white"
            >
              <div className="flex flex-col h-full">
                <div className="border-b p-4 flex justify-between items-center">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={toggleFilters}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-6">
                    <FilterAccordion />
                  </div>
                </div>
                
                <div className="border-t p-4 flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleReset}>
                    Reset All
                  </Button>
                  <Button className="flex-1" onClick={toggleFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop filter sidebar
  return (
    <div className="w-full md:w-72 lg:w-80 space-y-6 mb-8 md:mb-0">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search jobs..."
          className="pl-9"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium flex items-center">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter Jobs
          </h3>
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-xs">
            Reset
          </Button>
        </div>
        
        <div className="p-4 space-y-6">
          <FilterAccordion />
        </div>
      </div>
    </div>
  );
};

const FilterAccordion = () => {
  const [salaryRange, setSalaryRange] = useState([40000]);
  
  return (
    <Accordion type="multiple" defaultValue={['category', 'jobType', 'location', 'experience', 'salary']} className="space-y-4">
      <AccordionItem value="category" className="border rounded-md">
        <AccordionTrigger className="px-4">Category</AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={`category-${category}`} />
                <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="jobType" className="border rounded-md">
        <AccordionTrigger className="px-4">Job Type</AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="jobType-all" />
              <Label htmlFor="jobType-all" className="text-sm font-normal cursor-pointer">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fulltime" id="jobType-fulltime" />
              <Label htmlFor="jobType-fulltime" className="text-sm font-normal cursor-pointer">
                Full Time
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parttime" id="jobType-parttime" />
              <Label htmlFor="jobType-parttime" className="text-sm font-normal cursor-pointer">
                Part Time
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="contract" id="jobType-contract" />
              <Label htmlFor="jobType-contract" className="text-sm font-normal cursor-pointer">
                Contract
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="temporary" id="jobType-temporary" />
              <Label htmlFor="jobType-temporary" className="text-sm font-normal cursor-pointer">
                Temporary
              </Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="location" className="border rounded-md">
        <AccordionTrigger className="px-4">Location</AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox id={`location-${location}`} />
                <Label htmlFor={`location-${location}`} className="text-sm font-normal cursor-pointer">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="experience" className="border rounded-md">
        <AccordionTrigger className="px-4">Experience</AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <div className="space-y-2">
            {experiences.map((exp) => (
              <div key={exp} className="flex items-center space-x-2">
                <Checkbox id={`experience-${exp}`} />
                <Label htmlFor={`experience-${exp}`} className="text-sm font-normal cursor-pointer">
                  {exp}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="salary" className="border rounded-md">
        <AccordionTrigger className="px-4">Salary Range</AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <div className="space-y-4">
            <Slider
              defaultValue={[40000]}
              max={200000}
              step={5000}
              onValueChange={setSalaryRange}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">$0</span>
              <span className="text-sm font-medium">${salaryRange[0].toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">$200k</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="date" className="border rounded-md">
        <AccordionTrigger className="px-4">Last Date</AccordionTrigger>
        <AccordionContent className="px-4 pt-2 pb-4">
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="date-all" />
              <Label htmlFor="date-all" className="text-sm font-normal cursor-pointer">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="date-today" />
              <Label htmlFor="date-today" className="text-sm font-normal cursor-pointer">
                Today
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3days" id="date-3days" />
              <Label htmlFor="date-3days" className="text-sm font-normal cursor-pointer">
                Next 3 days
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="week" id="date-week" />
              <Label htmlFor="date-week" className="text-sm font-normal cursor-pointer">
                Next week
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="month" id="date-month" />
              <Label htmlFor="date-month" className="text-sm font-normal cursor-pointer">
                Next month
              </Label>
            </div>
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default JobFilters;
