import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  PieChart, 
  FileText, 
  Users, 
  CreditCard,
  BarChart3,
  DollarSign,
  Target,
  Briefcase,
  Menu,
  X,
  ChevronRight,
  Star,
  Shield,
  Zap,
  Heart,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Award,
  Globe,
  Clock,
  Building,
  Lightbulb
} from 'lucide-react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    businessType: ''
  });
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    preferredDate: '',
    preferredTime: ''
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you within 24 hours.');
    setContactForm({ name: '', email: '', company: '', phone: '', message: '' });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Welcome to FinanceSaathi! Your free trial account has been created. Check your email for login details.');
    setSignupForm({ name: '', email: '', company: '', phone: '', businessType: '' });
    setIsSignupModalOpen(false);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demo scheduled successfully! We will send you a calendar invite and join details shortly.');
    setDemoForm({ name: '', email: '', company: '', phone: '', preferredDate: '', preferredTime: '' });
    setIsDemoModalOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FinanceSaathi</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</button>
                <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</button>
                <button onClick={() => setIsSignupModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Features</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Pricing</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Contact</button>
              <button onClick={() => setIsSignupModalOpen(true)} className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Business Finance Made{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Aasan
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Simplify your business finances with AI-powered insights, automated bookkeeping, 
              and smart financial planning tools designed for Indian businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSignupModalOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your business finances efficiently and make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Analytics</h3>
              <p className="text-gray-600 mb-4">
                Get deep insights into your business performance with advanced analytics and reporting tools.
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Learn More →
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Budget Planning</h3>
              <p className="text-gray-600 mb-4">
                Create and manage budgets with intelligent forecasting and expense tracking capabilities.
              </p>
              <button className="text-green-600 font-medium hover:text-green-800 transition-colors">
                Learn More →
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Invoice Management</h3>
              <p className="text-gray-600 mb-4">
                Create, send, and track invoices with automated payment reminders and GST compliance.
              </p>
              <button className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
                Learn More →
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600 mb-4">
                Work together with your team with role-based access and real-time collaboration features.
              </p>
              <button className="text-orange-600 font-medium hover:text-orange-800 transition-colors">
                Learn More →
              </button>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Processing</h3>
              <p className="text-gray-600 mb-4">
                Accept payments online with integrated payment gateways and automated reconciliation.
              </p>
              <button className="text-red-600 font-medium hover:text-red-800 transition-colors">
                Learn More →
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tax Compliance</h3>
              <p className="text-gray-600 mb-4">
                Stay compliant with Indian tax regulations with automated GST filing and TDS management.
              </p>
              <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Intuitive Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a complete overview of your business finances at a glance with our beautiful and intuitive dashboard.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-xl font-semibold">Business Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₹12,45,000</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Profit Margin</p>
                      <p className="text-2xl font-bold text-gray-900">23.5%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Active Projects</p>
                      <p className="text-2xl font-bold text-gray-900">18</p>
                    </div>
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Pending Invoices</p>
                      <p className="text-2xl font-bold text-gray-900">7</p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">Payment Received</span>
                      </div>
                      <span className="text-green-600 font-medium">+₹25,000</span>
                    </div>
                    <div className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">Office Rent</span>
                      </div>
                      <span className="text-red-600 font-medium">-₹15,000</span>
                    </div>
                    <div className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">Software Subscription</span>
                      </div>
                      <span className="text-blue-600 font-medium">-₹2,500</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-blue-600 text-white p-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Create Invoice
                    </button>
                    <button className="bg-green-600 text-white p-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      Add Expense
                    </button>
                    <button className="bg-purple-600 text-white p-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                      View Reports
                    </button>
                    <button className="bg-orange-600 text-white p-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                      Manage Clients
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From startups to enterprises, we provide tailored financial solutions for every business size.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-xl">
              <Briefcase className="h-12 w-12 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Starter Plan</h3>
              <p className="text-3xl font-bold mb-2">₹999<span className="text-lg font-normal">/month</span></p>
              <p className="text-blue-100 mb-6">Perfect for startups and small businesses</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Basic accounting setup
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Invoice management (up to 50/month)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Expense tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Basic reporting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Email support
                </li>
              </ul>
              <button 
                onClick={() => setIsSignupModalOpen(true)}
                className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-2xl shadow-xl transform scale-105">
              <div className="flex items-center justify-between mb-6">
                <Users className="h-12 w-12" />
                <span className="bg-yellow-400 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Growth Plan</h3>
              <p className="text-3xl font-bold mb-2">₹2,499<span className="text-lg font-normal">/month</span></p>
              <p className="text-green-100 mb-6">Ideal for growing businesses</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Everything in Starter
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Unlimited invoices
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Multi-user access (up to 5)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Inventory management
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  API integrations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Priority support
                </li>
              </ul>
              <button 
                onClick={() => setIsSignupModalOpen(true)}
                className="w-full bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-8 rounded-2xl shadow-xl">
              <Target className="h-12 w-12 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Enterprise Plan</h3>
              <p className="text-3xl font-bold mb-2">Custom Pricing</p>
              <p className="text-purple-100 mb-6">For large organizations</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Everything in Growth
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Unlimited users
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Custom workflows
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Advanced security
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Custom integrations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Onboarding assistance
                </li>
              </ul>
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of businesses that trust FinanceSaathi for their financial management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "FinanceSaathi has transformed how we manage our business finances. The insights are incredible and the automated GST filing saves us hours every month!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Rajesh Kumar</p>
                  <p className="text-sm text-gray-500">CEO, TechStart Solutions</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The automated invoicing and payment tracking features have revolutionized our billing process. We've reduced payment delays by 60%!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  P
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-500">Founder, Green Earth Organics</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Excellent customer support and the dashboard gives us real-time insights into our business performance. Highly recommended!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Amit Patel</p>
                  <p className="text-sm text-gray-500">Director, Patel Manufacturing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About FinanceSaathi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're on a mission to simplify business finance management for every Indian entrepreneur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
              <p className="text-gray-600 mb-4">
                Founded in 2020 by a team of finance professionals and tech experts, FinanceSaathi was born out of 
                the frustration of managing business finances with outdated tools and complex processes.
              </p>
              <p className="text-gray-600 mb-4">
                We recognized that Indian businesses needed a solution that understood local regulations, 
                GST compliance, and the unique challenges of the Indian market.
              </p>
              <p className="text-gray-600">
                Today, we serve over 10,000+ businesses across India, from startups to large enterprises, 
                helping them streamline their financial operations and make data-driven decisions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">10,000+</h4>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">500+</h4>
                <p className="text-gray-600">Cities Covered</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">₹100Cr+</h4>
                <p className="text-gray-600">Transactions Processed</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">4.8/5</h4>
                <p className="text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h4>
                <p className="text-gray-600">
                  Continuously improving our platform with cutting-edge technology and user feedback.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Trust</h4>
                <p className="text-gray-600">
                  Your financial data is secure with us. We maintain the highest standards of security and privacy.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Customer First</h4>
                <p className="text-gray-600">
                  Every feature we build is designed with our customers' success and satisfaction in mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FinanceSaathi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making business finance management simple, secure, and efficient for Indian businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">
                Your financial data is protected with enterprise-grade security and encryption.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Get instant insights and generate reports in seconds, not hours.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Made for India</h3>
              <p className="text-gray-600">
                Built specifically for Indian businesses with GST compliance and local payment methods.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Get help whenever you need it with our round-the-clock customer support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+91 80-4567-8901</p>
                    <p className="text-sm text-gray-500">Mon-Fri from 8am to 6pm IST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">support@financesaathi.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Office</h4>
                    <p className="text-gray-600">
                      Koramangala, Bangalore<br />
                      Karnataka, India 560034
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                    → Help Center & Documentation
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                    → Schedule a Live Demo
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                    → API Documentation
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                    → System Status
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business Finances?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using FinanceSaathi to streamline their financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Free Trial
            </button>
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Schedule a Demo
            </button>
          </div>
          <p className="text-blue-100 mt-4 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Calculator className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">FinanceSaathi</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making business finance management simple and accessible for every Indian business.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-xs">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FinanceSaathi. All rights reserved. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Start Your Free Trial</h3>
              <button 
                onClick={() => setIsSignupModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  value={signupForm.company}
                  onChange={(e) => setSignupForm({...signupForm, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={signupForm.phone}
                  onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                <select
                  required
                  value={signupForm.businessType}
                  onChange={(e) => setSignupForm({...signupForm, businessType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select business type</option>
                  <option value="startup">Startup</option>
                  <option value="small_business">Small Business</option>
                  <option value="medium_business">Medium Business</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="consultant">Consultant</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Free Account
              </button>
            </form>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Schedule a Demo</h3>
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({...demoForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({...demoForm, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm({...demoForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={demoForm.preferredDate}
                    onChange={(e) => setDemoForm({...demoForm, preferredDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                  <select
                    required
                    value={demoForm.preferredTime}
                    onChange={(e) => setDemoForm({...demoForm, preferredTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Schedule Demo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;