
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, BriefcaseBusiness } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BriefcaseBusiness className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">JobFluence</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Finding your dream job made simpler. JobFluence provides the latest job openings in various sectors with a seamless application process.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs/featured" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Featured Jobs
                </Link>
              </li>
              <li>
                <Link to="/employers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  For Employers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Job Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs/government" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Government Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs/private" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Private Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs/it" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  IT Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs/bank" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Bank Jobs
                </Link>
              </li>
              <li>
                <Link to="/jobs/railway" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Railway Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                1234 Job Street, Employment City
              </li>
              <li className="text-sm text-muted-foreground">
                contact@jobfluence.com
              </li>
              <li className="text-sm text-muted-foreground">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JobFluence. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
