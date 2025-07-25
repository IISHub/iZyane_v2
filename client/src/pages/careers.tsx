import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import JobApplicationModal from "@/components/job-application-modal";
import JobDetailsModal from "@/components/job-details-modal";

interface Job {
  id: string;
  title: string;
  type: string;
  typeColor: string;
  description: string;
  skills: string[];
  location: string;
  experience: string;
  department: string;
  minimumQualifications: string[];
  preferredQualifications: string[];
  aboutTheJob: string;
  responsibilities: string[];
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
  };

  const handleReadMoreClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailsModalOpen(true);
  };

  useEffect(() => {
    fetch('/data/jobs.json')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch(error => console.error('Error loading jobs:', error));
  }, []);

  // Filter jobs based on search term, department, and type
  useEffect(() => {
    let filtered = jobs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by department
    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }

    // Filter by job type
    if (selectedType !== 'All') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedDepartment, selectedType]);

  // Get unique departments and types for filters
  const departments = ['All', ...Array.from(new Set(jobs.map(job => job.department)))];
  const jobTypes = ['All', ...Array.from(new Set(jobs.map(job => job.type)))];
  const benefits = [
    {
      icon: "fas fa-rocket",
      title: "Innovation First",
      description: "Work on cutting-edge projects that push the boundaries of what's possible."
    },
    {
      icon: "fas fa-balance-scale",
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options to help you thrive."
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Learning & Growth",
      description: "Continuous learning opportunities and career development programs."
    },
    {
      icon: "fas fa-heart",
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs for you and your family."
    },
    {
      icon: "fas fa-plane",
      title: "Time Off",
      description: "Generous vacation policy and paid time off to recharge and explore."
    },
    {
      icon: "fas fa-dollar-sign",
      title: "Competitive Pay",
      description: "Market-leading compensation packages with equity options and bonuses."
    }
  ];



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-800 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-primary-accent-light text-primary-custom rounded-full text-sm font-semibold mb-4">
              Join Our Mission
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-responsive leading-tight mb-6">
              Join Our <span className="gradient-text">Amazing</span> Team
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              We're looking for passionate individuals who want to shape the future of technology. 
              Join us and grow your career while making a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="btn-solid px-8 py-4 text-lg">
                View Open Positions
              </button>
              <button className="btn-outline px-8 py-4 text-lg">
                <i className="fas fa-users mr-2"></i>Our Culture
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-responsive">150+</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-responsive">25+</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-responsive">4.8/5</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Employee Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-responsive">98%</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">Retention Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 hero-decoration-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 hero-decoration-primary rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-20 w-8 h-8 bg-primary-accent-medium rounded-full opacity-30"></div>
        <div className="absolute top-1/3 right-32 w-12 h-12 bg-primary-accent-medium rounded-full opacity-20"></div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white dark:bg-slate-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Why Join iZyane?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We believe in creating an environment where our team can thrive, innovate, and grow together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 text-center card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-custom to-accent-custom rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${benefit.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-responsive mb-4">{benefit.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-responsive mb-6">Open Positions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover opportunities to grow your career and make an impact with cutting-edge technology.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-slate-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search jobs, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-custom focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>

              {/* Department Filter */}
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-custom focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
                ))}
              </select>

              {/* Job Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-custom focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                ))}
              </select>
            </div>

            {/* Results Summary */}
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Showing {filteredJobs.length} of {jobs.length} positions
            </div>
          </div>
          
          <div className="grid gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 card-hover">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-responsive">{job.title}</h3>
                      <span className={`bg-${job.typeColor}/10 text-${job.typeColor} px-3 py-1 rounded-full text-sm font-medium`}>
                        {job.type}
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400 text-sm">
                      <div className="flex items-center">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-briefcase mr-2"></i>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => handleReadMoreClick(job)}
                      className="btn-outline px-6 py-2 w-full sm:w-auto"
                    >
                      Read More
                    </button>
                    <button 
                      onClick={() => handleApplyClick(job)}
                      className="btn-solid px-6 py-2 w-full sm:w-auto"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-search text-slate-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No positions found</h3>
                <p className="text-slate-500 dark:text-slate-500 mb-4">
                  Try adjusting your search criteria or browse all positions
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDepartment('All');
                    setSelectedType('All');
                  }}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-600 dark:text-slate-300 mb-6">Don't see a position that fits? We're always looking for talented people.</p>
            <button className="btn-outline px-8 py-3">
              Send Your Resume
            </button>
          </div>
        </div>
      </section>

      <JobDetailsModal 
        isOpen={isJobDetailsModalOpen}
        onClose={() => setIsJobDetailsModalOpen(false)}
        job={selectedJob}
        onApply={handleApplyClick}
      />

      <JobApplicationModal 
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={selectedJob}
      />

      <Footer />
    </div>
  );
}