
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X, BriefcaseBusiness, Bell, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

const jobCategories = [
  { name: 'Latest Jobs', path: '/jobs/latest' },
  { name: 'Government Jobs', path: '/jobs/government' },
  { name: 'Private Jobs', path: '/jobs/private' },
  { name: 'Bank Jobs', path: '/jobs/bank' },
  { name: 'IT Jobs', path: '/jobs/it' },
  { name: 'Railway Jobs', path: '/jobs/railway' },
  { name: 'PSU Jobs', path: '/jobs/psu' },
  { name: 'Walk-in Jobs', path: '/jobs/walkin' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setMobileMenuOpen(false);
    setSearchVisible(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchVisible) setSearchVisible(false);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BriefcaseBusiness className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold tracking-tight">JobFluence</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {jobCategories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className={`text-sm transition-colors hover:text-primary ${
                  location.pathname === category.path
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Search toggle on mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              className="md:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Search bar on desktop */}
            <div className="hidden md:flex items-center relative">
              <Input
                type="search"
                placeholder="Search jobs..."
                className="w-[200px] lg:w-[260px] rounded-full h-9"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* User actions */}
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </div>

            {/* Login button */}
            <Button variant="default" size={isMobile ? "sm" : "default"} className="hidden sm:flex">
              Sign In
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search bar on mobile */}
        <AnimatePresence>
          {searchVisible && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden pb-4 md:hidden"
            >
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search jobs..."
                  className="w-full rounded-full"
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {jobCategories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className={`py-2 text-sm transition-colors ${
                    location.pathname === category.path
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {category.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2 border-t">
                <Button variant="outline" size="sm" className="w-1/2 mr-2">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="default" size="sm" className="w-1/2">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
