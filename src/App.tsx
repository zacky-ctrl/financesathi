import React from 'react';
import { Zap, FileText, Shield, ArrowRight, CheckCircle, Users, Clock, TrendingUp, Star, BarChart3, Upload, Target } from 'lucide-react';

function App() {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('File uploaded:', files[0].name);
      // Handle file upload logic here
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      console.log('File dropped:', files[0].name);
      // Handle file drop logic here
    }
  };

  const testimonials = [
    { name: "Rajesh Sharma", business: "Sharma Electronics, Delhi", rating: 5 },
    { name: "Priya Patel", business: "Patel Trading Co., Mumbai", rating: 5 },
    { name: "Amit Gupta", business: "Gupta Textiles, Ahmedabad", rating: 5 }
  ];

  const features = [
    {
      icon: <Upload className="w-8 h-8 text-orange-500" />,
      title: "Smart Invoice Processing",
      description: "AI automatically extracts data from invoices, receipts, and bills. Simply upload and let our technology handle the rest."
    },
    {
      icon: <Target className="w-8 h-8 text-orange-500" />,
      title: "Automatic Expense Categorization",
      description: "Intelligent categorization of all your business expenses with customizable categories for better organization."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
      title: "Real-time Business Dashboards",
      description: "Visual dashboards that give you instant insights into your spending patterns and business financial health."
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      title: "Instant Summary Reports",
      description: "Generate comprehensive expense reports and financial summaries in seconds, not hours of manual work."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-[#002349]" />
              <span className="ml-2 text-3xl font-black text-[#002349]">FinanceSaathi</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Users className="w-4 h-4 text-[#f97316]" />
              <span>Trusted by 500+ Indian businesses</span>
            </div>
            <button className="bg-[#002349] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#003a66] transition-colors min-h-[44px]">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#002349] mb-2 sm:mb-3 leading-tight px-2 tracking-tight">
              Business Finance Made <span className="text-[#22c55e]">Aasan</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-7 leading-relaxed px-4 font-medium">
              AI-powered automation that transforms paperwork into business insights
            </p>
            
            {/* Interactive Invoice Upload Interface */}
            <div className="mb-6 sm:mb-7 px-4">
              <div className="max-w-2xl mx-auto">
                <div 
                  className="bg-white rounded-xl shadow-xl border-2 border-dashed border-gray-200 hover:border-[#f97316] hover:scale-105 transition-all duration-300 cursor-pointer group"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <div className="px-6 py-8 sm:px-8 sm:py-10 text-center">
                    <div className="mb-6">
                     <Upload className="w-16 h-16 text-[#f97316] group-hover:text-[#ea580c] mx-auto transition-colors" />
                    </div>
                    <p className="text-xl font-semibold text-gray-800 mb-3">
                      Drop your invoice here or click to browse
                    </p>
                   <p className="text-base text-gray-600">
                     Supports PDF, JPG, PNG • <span className="text-[#f97316] font-semibold">See instant AI processing</span>
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002349] mb-4 px-4">
              Are You Drowning in Business Paperwork?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-red-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                Spending hours manually entering invoice data
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Tedious data entry takes away time from growing your business
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <FileText className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                Losing track of business expenses and receipts
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Important receipts get lost, making tax time a nightmare
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                No clear picture of where your money is going
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Without insights, you can't make smart financial decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002349] mb-4 px-4">
              Your AI Business Finance Saathi
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Transform chaos into clarity in minutes, not hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-orange-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <Zap className="w-7 h-7 text-[#f97316]" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                AI processes your invoices instantly
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Upload any invoice and watch AI extract all data in seconds
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-[#f97316]" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                Get clear insights into business spending
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Visual dashboards show exactly where your money goes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="w-7 h-7 text-[#f97316]" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                Save 20+ hours every month
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Automated processing frees you to focus on growing your business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002349] mb-4 px-4">
              Are You <span className="text-[#f97316]">Drowning</span> in Business Paperwork?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4 max-w-4xl mx-auto">
              You're not alone - 500+ Indian SMBs faced the same challenges before finding their Saathi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-red-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <FileText className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                20+ hours weekly spent on manual invoice data entry
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Tedious data entry takes away time from growing your business
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <Clock className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                Lost receipts creating expense tracking headaches
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Important receipts get lost, making tax time a nightmare
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-50 p-4 sm:p-5 rounded-full mb-4 sm:mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="font-bold text-[#002349] mb-3 sm:mb-4 text-base sm:text-lg">
                No clear picture of where business money is going
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Without insights, you can't make smart financial decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002349] mb-4 px-4">
              Simple 4-Step Workflow
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Upload → Categorize → Analyze → Report
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-[#f97316] text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#002349] mb-3 sm:mb-4 px-4">Upload</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Take a photo or upload your invoices, receipts, and bills</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f97316] text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#002349] mb-3 sm:mb-4 px-4">Categorize</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">AI automatically categorizes and organizes your expenses</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f97316] text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#002349] mb-3 sm:mb-4 px-4">Analyze</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Get insights into spending patterns and business trends</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f97316] text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">
                4
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#002349] mb-3 sm:mb-4 px-4">Report</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Generate comprehensive reports and summaries instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002349] mb-4 px-4">
              Choose Your Plan
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Flexible pricing for businesses of all sizes
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-2 border-orange-500 order-1">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#002349] mb-2">Base</h3>
                  <div className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    14-day FREE trial
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-4">
                    ₹199<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">Perfect for small businesses getting started</p>
                  <p className="text-sm text-gray-500 mb-4">No setup fees</p>
                  <button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3 rounded-lg font-semibold w-full transition-colors min-h-[44px]">
                    Start Free Trial
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg opacity-75 order-2">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#002349] mb-2">Smart</h3>
                  <div className="bg-gray-100 text-gray-500 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    14-day FREE trial
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-400 mb-4">
                    ₹599<span className="text-lg text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">Advanced features for growing businesses</p>
                  <p className="text-sm text-gray-500 mb-4">No setup fees</p>
                  <button className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold w-full cursor-not-allowed min-h-[44px]">
                    Coming Soon
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg opacity-75 order-3">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#002349] mb-2">Saathi</h3>
                  <div className="bg-gray-100 text-gray-500 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    14-day FREE trial
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-400 mb-4">
                    ₹1299<span className="text-lg text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-600 mb-6">Complete solution for established businesses</p>
                  <p className="text-sm text-gray-500 mb-4">No setup fees</p>
                  <button className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold w-full cursor-not-allowed min-h-[44px]">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002349] mb-4 px-4">
              Everything Your Business Needs
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Powerful features designed to streamline your financial workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4 sm:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#002349] mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002349] mb-4 px-4">
              What Business Owners Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Join hundreds of satisfied Indian businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 sm:p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6 italic text-sm sm:text-base">
                  "FinanceSaathi has completely transformed how we handle our expense management. What used to take hours now takes minutes!"
                </p>
                <div>
                  <p className="font-semibold text-[#002349] text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#002349]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
            Ready to Save 20+ Hours Every Month?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join 500+ Indian businesses already using FinanceSaathi to automate their expense management
          </p>
          
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 mx-auto transition-colors shadow-lg min-h-[44px] w-full sm:w-auto max-w-sm mb-6 sm:mb-8">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-300 px-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              <span className="text-sm sm:text-base">14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              <span className="text-sm sm:text-base">No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              <span className="text-sm sm:text-base">Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-white" />
                <span className="ml-2 text-xl font-bold">FinanceSaathi</span>
              </div>
              <p className="text-gray-400 max-w-md text-sm sm:text-base">
                Making business expense management simple and automated for Indian small businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2024 FinanceSaathi. Made in India for Indian businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;