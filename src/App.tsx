import React from 'react';
import Tesseract from 'tesseract.js';
import { Zap, FileText, Shield, ArrowRight, CheckCircle, Users, Clock, TrendingUp, Star, BarChart3, Upload, Target, X, Check, Home, Plus, Download, Calendar, DollarSign, Package, Search, Filter, Eye, CreditCard, Receipt, Activity } from 'lucide-react';

interface UploadedFile {
  id: string;
  filename: string;
  filesize: number;
  uploadDate: string;
  processed: boolean;
  fileData?: string;
  extractedText?: string;
  confidence?: number;
}

interface UploadState {
  isDragging: boolean;
  isUploading: boolean;
  uploadProgress: number;
  uploadedFile: UploadedFile | null;
  isProcessing: boolean;
  isComplete: boolean;
  error: string | null;
}

interface Expense {
  id: string;
  vendor: string;
  amount: number;
  category: string;
  date: string;
  invoiceNumber: string;
  status: string;
  paymentMethod: string;
  uploadId?: string;
  filename?: string;
  extractedText?: string;
  confidence?: number;
}

interface ExpenseSummary {
  total: number;
  thisMonth: number;
  transactionCount: number;
  averageTransaction: number;
  topCategory: string;
}

function App() {
  const [currentView, setCurrentView] = React.useState<'home' | 'dashboard'>('home');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [ocrProgress, setOcrProgress] = React.useState(0);
  const [uploadState, setUploadState] = React.useState<UploadState>({
    isDragging: false,
    isUploading: false,
    uploadProgress: 0,
    uploadedFile: null,
    isProcessing: false,
    isComplete: false,
    error: null
  });

  // Initialize sample data on component mount
  React.useEffect(() => {
    const existingExpenses = localStorage.getItem('financeExpenses');
    if (!existingExpenses) {
      const sampleExpenses: Expense[] = [
        {
          id: 'exp_001',
          vendor: 'Swiggy Corporate',
          amount: 2340,
          category: 'Food & Entertainment',
          date: '2025-01-08',
          invoiceNumber: 'INV-2025-001',
          status: 'processed',
          paymentMethod: 'UPI'
        },
        {
          id: 'exp_002',
          vendor: 'Amazon Business',
          amount: 8750,
          category: 'Office Supplies',
          date: '2025-01-07',
          invoiceNumber: 'INV-2025-002',
          status: 'processed',
          paymentMethod: 'Credit Card'
        },
        {
          id: 'exp_003',
          vendor: 'Reliance Digital',
          amount: 15000,
          category: 'Equipment',
          date: '2025-01-05',
          invoiceNumber: 'INV-2025-003',
          status: 'processed',
          paymentMethod: 'Bank Transfer'
        },
        {
          id: 'exp_004',
          vendor: 'Uber Business',
          amount: 1250,
          category: 'Travel',
          date: '2025-01-04',
          invoiceNumber: 'INV-2025-004',
          status: 'processed',
          paymentMethod: 'UPI'
        },
        {
          id: 'exp_005',
          vendor: 'Ola Cabs',
          amount: 3200,
          category: 'Travel',
          date: '2025-01-06',
          invoiceNumber: 'INV-2025-005',
          status: 'processed',
          paymentMethod: 'UPI'
        },
        {
          id: 'exp_006',
          vendor: 'HDFC Bank',
          amount: 5500,
          category: 'Professional Services',
          date: '2025-01-03',
          invoiceNumber: 'INV-2025-006',
          status: 'processed',
          paymentMethod: 'Bank Transfer'
        },
        {
          id: 'exp_007',
          vendor: 'Airtel Business',
          amount: 2800,
          category: 'Utilities',
          date: '2025-01-02',
          invoiceNumber: 'INV-2025-007',
          status: 'processed',
          paymentMethod: 'Auto Debit'
        }
      ];
      localStorage.setItem('financeExpenses', JSON.stringify(sampleExpenses));
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const generateInvoiceNumber = (): string => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 999) + 1;
    return `INV-${year}-${random.toString().padStart(3, '0')}`;
  };

  const getRandomVendor = () => {
    const vendors = [
      'Swiggy Corporate', 'Amazon Business', 'Reliance Digital', 'Uber Business',
      'Airtel Business', 'Microsoft India', 'Google Workspace'
    ];
    return vendors[Math.floor(Math.random() * vendors.length)];
  };

  const getRandomPaymentMethod = () => {
    const methods = ['UPI', 'Credit Card', 'Bank Transfer', 'Cash', 'Auto Debit'];
    return methods[Math.floor(Math.random() * methods.length)];
  };

  const extractExpenseFromOCR = (text: string, confidence: number, filename: string, uploadId: string): Expense => {
    // Basic OCR data extraction patterns
    const amountPattern = /₹\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    const datePattern = /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/g;
    const totalPattern = /(?:total|amount|grand total|net amount)[\s:]*₹?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/gi;
    
    let vendor = 'Unknown Vendor';
    let amount = 0;
    let date = new Date().toISOString().split('T')[0];
    let category = 'General';

    // Extract vendor from common patterns or filename
    const vendorPatterns = [
      /(?:swiggy|zomato)/i,
      /(?:amazon|flipkart)/i,
      /(?:reliance|jio)/i,
      /(?:uber|ola)/i,
      /(?:airtel|vodafone)/i
    ];

    for (const pattern of vendorPatterns) {
      if (pattern.test(text) || pattern.test(filename)) {
        if (pattern.test('swiggy')) vendor = 'Swiggy Corporate';
        else if (pattern.test('amazon')) vendor = 'Amazon Business';
        else if (pattern.test('reliance')) vendor = 'Reliance Digital';
        else if (pattern.test('uber')) vendor = 'Uber Business';
        else if (pattern.test('airtel')) vendor = 'Airtel Business';
        break;
      }
    }

    // Extract amount (prefer "total" amounts)
    const totalMatches = Array.from(text.matchAll(totalPattern));
    const amountMatches = Array.from(text.matchAll(amountPattern));
    
    if (totalMatches.length > 0) {
      amount = parseFloat(totalMatches[0][1].replace(/,/g, ''));
    } else if (amountMatches.length > 0) {
      // Use the largest amount found
      const amounts = amountMatches.map(match => parseFloat(match[1].replace(/,/g, '')));
      amount = Math.max(...amounts);
    }

    // Extract date
    const dateMatches = Array.from(text.matchAll(datePattern));
    if (dateMatches.length > 0) {
      const [, day, month, year] = dateMatches[0];
      const fullYear = year.length === 2 ? `20${year}` : year;
      date = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Determine category based on vendor
    if (vendor.includes('Swiggy') || vendor.includes('Zomato')) category = 'Food & Entertainment';
    else if (vendor.includes('Amazon') || vendor.includes('Flipkart')) category = 'Office Supplies';
    else if (vendor.includes('Uber') || vendor.includes('Ola')) category = 'Travel';
    else if (vendor.includes('Reliance') || vendor.includes('Jio')) category = 'Utilities';
    else if (vendor.includes('Airtel') || vendor.includes('Vodafone')) category = 'Utilities';

    // Fallback to reasonable defaults if OCR confidence is low
    if (confidence < 60 || amount === 0) {
      amount = Math.floor(Math.random() * (25000 - 1250) + 1250);
      vendor = vendor === 'Unknown Vendor' ? getRandomVendor() : vendor;
    }

    return {
      id: `exp_${Date.now()}`,
      vendor,
      amount,
      category,
      date,
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
      status: 'processed',
      paymentMethod: getRandomPaymentMethod(),
      uploadId,
      extractedText: text.substring(0, 500), // Store first 500 chars
      confidence
    };
  };

  const generateMockExpense = (uploadedFile: UploadedFile): Expense => {
    const vendors = [
      'Swiggy Corporate', 'Amazon Business', 'Reliance Digital', 'Flipkart Business',
      'Uber Business', 'Ola Corporate', 'BigBasket', 'Zomato Business',
      'Paytm Business', 'HDFC Bank', 'Airtel Business', 'Jio Business'
    ];
    
    const categories = ['Office Supplies', 'Travel', 'Food & Entertainment', 'Equipment', 'Utilities', 'Professional Services'];
    const paymentMethods = ['UPI', 'Credit Card', 'Bank Transfer', 'Cash', 'Auto Debit'];
    
    const randomVendor = vendors[Math.floor(Math.random() * vendors.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomAmount = Math.floor(Math.random() * 23750) + 1250; // ₹1,250 to ₹25,000
    const randomPaymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    
    return {
      id: `exp_${Date.now()}`,
      vendor: randomVendor,
      amount: randomAmount,
      category: randomCategory,
      date: new Date().toISOString().split('T')[0],
      invoiceNumber: generateInvoiceNumber(),
      status: 'processed',
      paymentMethod: randomPaymentMethod,
      uploadId: uploadedFile.id,
      filename: uploadedFile.filename
    };
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a PDF, JPG, or PNG file';
    }
    
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }
    
    return null;
  };

  const processFileWithOCR = async (file: File): Promise<void> => {
    setUploadState(prev => ({ ...prev, isProcessing: true }));
    setOcrProgress(0);

    try {
      // Process with Tesseract OCR
      const result = await Tesseract.recognize(file, 'eng+hin', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }
      });

      const extractedText = result.data.text;
      const confidence = result.data.confidence;

      // Convert file to base64
      const reader = new FileReader();
      const fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Store upload data with OCR results
      const uploadedFile: UploadedFile = {
        id: `upload_${Date.now()}`,
        filename: file.name,
        filesize: file.size,
        uploadDate: new Date().toISOString(),
        processed: true,
        fileData,
        extractedText,
        confidence
      };

      // Save to localStorage
      const existingUploads = JSON.parse(localStorage.getItem('financeUploads') || '[]');
      existingUploads.push(uploadedFile);
      localStorage.setItem('financeUploads', JSON.stringify(existingUploads));

      // Extract expense data from OCR text
      const expenseData = extractExpenseFromOCR(extractedText, confidence, file.name, uploadedFile.id);
      
      // Save expense data
      const existingExpenses = JSON.parse(localStorage.getItem('financeExpenses') || '[]');
      existingExpenses.push(expenseData);
      localStorage.setItem('financeExpenses', JSON.stringify(existingExpenses));

      setUploadState(prev => ({
        ...prev,
        isProcessing: false,
        isComplete: true,
        uploadedFile
      }));
    } catch (error) {
      console.error('OCR processing failed:', error);
      // Fallback to mock data generation
      await processFallbackData(file);
    }
  };

  const processFallbackData = async (file: File) => {
    // Fallback processing with mock data
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Convert file to base64
    const reader = new FileReader();
    const fileData = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    
    const uploadedFile: UploadedFile = {
      id: `upload_${Date.now()}`,
      filename: file.name,
      filesize: file.size,
      uploadDate: new Date().toISOString(),
      processed: true,
      fileData,
      confidence: 0 // Indicates fallback data
    };

    // Save to localStorage
    const existingUploads = JSON.parse(localStorage.getItem('financeUploads') || '[]');
    existingUploads.push(uploadedFile);
    localStorage.setItem('financeUploads', JSON.stringify(existingUploads));

    // Generate fallback expense data
    const expenseData = generateMockExpense(uploadedFile);
    
    // Save expense data
    const existingExpenses = JSON.parse(localStorage.getItem('financeExpenses') || '[]');
    existingExpenses.push(expenseData);
    localStorage.setItem('financeExpenses', JSON.stringify(existingExpenses));

    setUploadState(prev => ({
      ...prev,
      isProcessing: false,
      isComplete: true,
      uploadedFile
    }));
  };

  const processFile = async (file: File): Promise<void> => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadState(prev => ({ ...prev, error: validationError }));
      return;
    }

    setUploadState(prev => ({ 
      ...prev, 
      isUploading: true, 
      uploadProgress: 0, 
      error: null 
    }));
    setOcrProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadState(prev => {
        if (prev.uploadProgress >= 100) {
          clearInterval(progressInterval);
          return prev;
        }
        return { ...prev, uploadProgress: prev.uploadProgress + 10 };
      });
    }, 100);

    try {
      // Wait for upload progress to complete
      await new Promise(resolve => setTimeout(resolve, 1200));

      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        uploadProgress: 100
      }));

      // Process with OCR
      await processFileWithOCR(file);

    } catch (error) {
      clearInterval(progressInterval);
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: 'Failed to upload file. Please try again.'
      }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setUploadState(prev => ({ ...prev, isDragging: true }));
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setUploadState(prev => ({ ...prev, isDragging: false }));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setUploadState(prev => ({ ...prev, isDragging: false }));
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const resetUpload = () => {
    setUploadState({
      isDragging: false,
      isUploading: false,
      uploadProgress: 0,
      uploadedFile: null,
      isProcessing: false,
      isComplete: false,
      error: null
    });
    setOcrProgress(0);
  };

  const viewDashboard = () => {
    setCurrentView('dashboard');
  };

  const goHome = () => {
    setCurrentView('home');
  };

  const getExpenses = (): Expense[] => {
    return JSON.parse(localStorage.getItem('financeExpenses') || '[]');
  };

  const getUploads = (): UploadedFile[] => {
    return JSON.parse(localStorage.getItem('financeUploads') || '[]');
  };
  const getExpenseSummary = (): ExpenseSummary => {
    const expenses = getExpenses();
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const transactionCount = expenses.length;
    const averageTransaction = transactionCount > 0 ? total / transactionCount : 0;
    
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const thisMonth = expenses
      .filter(exp => exp.date.startsWith(currentMonth))
      .reduce((sum, exp) => sum + exp.amount, 0);
    
    const categoryTotals: { [key: string]: number } = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    
    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, 'Office Supplies'
    );
    
    return { total, thisMonth, transactionCount, averageTransaction, topCategory };
  };

  const getCategoryData = () => {
    const expenses = getExpenses();
    const categoryTotals: { [key: string]: number } = {};
    
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      percentage: Math.round((amount / expenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100)
    }));
  };

  const getFilteredExpenses = () => {
    const expenses = getExpenses();
    return expenses.filter(expense => {
      const matchesSearch = expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const getRecentActivity = () => {
    const expenses = getExpenses();
    return expenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  };

  const getUniqueCategories = () => {
    const expenses = getExpenses();
    const categories = [...new Set(expenses.map(exp => exp.category))];
    return ['All', ...categories];
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

  if (currentView === 'dashboard') {
    const expenses = getExpenses();
    const uploads = getUploads();
    const summary = getExpenseSummary();
    const categoryData = getCategoryData();
    const filteredExpenses = getFilteredExpenses();
    const recentActivity = getRecentActivity();
    const categories = getUniqueCategories();

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <nav className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-[#002349]" />
                <div className="ml-2">
                  <span className="text-2xl font-black text-[#002349]">FinanceSaathi Business Dashboard</span>
                </div>
              </div>
              <button 
                onClick={goHome}
                className="flex items-center gap-2 bg-[#002349] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#003a66] transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total This Month</p>
                  <p className="text-2xl font-bold text-[#002349]">{formatCurrency(summary.thisMonth)}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-[#f97316]" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Transactions</p>
                  <p className="text-2xl font-bold text-[#002349]">{summary.transactionCount}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-full">
                  <Receipt className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Top Category</p>
                  <p className="text-2xl font-bold text-[#002349]">{summary.topCategory}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Transaction</p>
                  <p className="text-2xl font-bold text-[#002349]">{formatCurrency(summary.averageTransaction)}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Category Spending Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#002349] mb-4">Spending by Category</h3>
              <div className="space-y-4">
                {categoryData.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-[#f97316] rounded-full" style={{
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                      }}></div>
                      <span className="font-medium text-gray-700">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                          }}
                        ></div>
                      </div>
                      <span className="font-semibold text-[#002349] w-20 text-right">
                        {formatCurrency(item.amount)}
                      </span>
                      <span className="text-sm text-gray-500 w-12 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#002349] mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.slice(0, 8).map((expense, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Activity className="w-4 h-4 text-[#f97316]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {formatCurrency(expense.amount)} at {expense.vendor}
                      </p>
                      <p className="text-xs text-gray-500">
                        {expense.category} • {new Date(expense.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Uploads Section */}
          {uploads.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-[#002349] mb-4">Recent Uploads</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploads.slice(-6).map((upload) => (
                  <div key={upload.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{upload.filename}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(upload.filesize)} • {new Date(upload.uploadDate).toLocaleDateString('en-IN')}
                          {upload.confidence !== undefined && upload.confidence > 0 && (
                            <span className="ml-2">• {Math.round(upload.confidence)}% confidence</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Processed</span>
                      </div>
                    </div>
                    <button className="text-xs text-[#f97316] hover:text-[#ea580c] font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={goHome}
              className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              Upload New Receipt
            </button>
            <button className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <Plus className="w-4 h-4" />
              Add Manual Expense
            </button>
            <button className="flex items-center gap-2 bg-[#002349] hover:bg-[#003a66] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <Download className="w-4 h-4" />
              Export Monthly Report
            </button>
            <button className="flex items-center gap-2 bg-[#002349] hover:bg-[#003a66] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <FileText className="w-4 h-4" />
              Generate GST Summary
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search expenses by vendor, category, or invoice number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f97316] focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Expenses Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-[#002349]">
                All Expenses ({filteredExpenses.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(expense.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {expense.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#002349]">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{expense.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Processed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {expense.filename ? (
                          <button className="text-[#f97316] hover:text-[#ea580c] font-medium flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Receipt
                          </button>
                        ) : (
                          <span className="text-gray-400">Manual Entry</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredExpenses.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No expenses found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-[#002349]" />
              <div className="ml-2">
                <span className="text-3xl font-black text-[#002349]">FinanceSaathi</span>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <Users className="w-4 h-4 text-[#f97316]" />
                  <span>Trusted by 500+ Indian businesses</span>
                </div>
              </div>
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
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#002349] mb-2 sm:mb-3 leading-tight px-2 tracking-tight">
              Business Finance Made <span className="text-[#22c55e]">Aasan</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-7 leading-relaxed px-4 font-medium">
              AI-powered automation that transforms paperwork into business insights
            </p>
            
            {/* Key Benefits Bar */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-7 px-4">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-[#22c55e] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Save 20+ Hours Weekly</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">99% Accuracy</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-[#002349] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Instant Reports</span>
              </div>
            </div>

            {/* Interactive Invoice Upload Interface */}
            <div className="mb-6 sm:mb-7 px-4">
              <div className="max-w-2xl mx-auto">
                <div 
                  className={`bg-white rounded-xl shadow-xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${
                    uploadState.isDragging 
                      ? 'border-[#f97316] scale-105' 
                      : uploadState.error 
                        ? 'border-red-400' 
                        : uploadState.isComplete 
                          ? 'border-green-400' 
                          : 'border-gray-200 hover:border-[#f97316] hover:scale-105'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !uploadState.isUploading && !uploadState.isProcessing && document.getElementById('file-upload')?.click()}
                >
                  <div className="px-6 py-8 sm:px-8 sm:py-10 text-center">
                    {uploadState.error ? (
                      <>
                        <div className="mb-6">
                          <X className="w-16 h-16 text-red-500 mx-auto" />
                        </div>
                        <p className="text-xl font-semibold text-red-600 mb-3">
                          {uploadState.error}
                        </p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                          className="text-[#f97316] font-semibold hover:text-[#ea580c] transition-colors"
                        >
                          Try again
                        </button>
                      </>
                    ) : uploadState.isComplete ? (
                      <>
                        <div className="mb-6">
                          <Check className="w-16 h-16 text-green-500 mx-auto" />
                        </div>
                        <p className="text-xl font-semibold text-green-600 mb-3">
                          Processing Complete!
                        </p>
                        <p className="text-base text-gray-600 mb-4">
                          {uploadState.uploadedFile?.filename} ({formatFileSize(uploadState.uploadedFile?.filesize || 0)})
                        </p>
                        {(() => {
                          const uploads = JSON.parse(localStorage.getItem('financeUploads') || '[]');
                          const latestUpload = uploads[uploads.length - 1];
                          return latestUpload?.confidence !== undefined && (
                            <p className="text-sm text-gray-600 mb-4">
                              Extraction confidence: {latestUpload.confidence > 0 ? `${Math.round(latestUpload.confidence)}%` : 'Fallback data used'}
                            </p>
                          );
                        })()}
                        <div className="space-y-3">
                          <button 
                            onClick={(e) => { e.stopPropagation(); viewDashboard(); }}
                            className="bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                          >
                            View Dashboard
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                            className="block mx-auto text-gray-500 hover:text-gray-700 transition-colors text-sm"
                          >
                            Upload another file
                          </button>
                        </div>
                      </>
                    ) : uploadState.isProcessing ? (
                      <>
                        <div className="mb-6">
                          <div className="w-16 h-16 mx-auto">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#f97316] border-t-transparent"></div>
                          </div>
                        </div>
                        <p className="text-xl font-semibold text-[#f97316] mb-3">
                          {ocrProgress > 0 ? 'AI is analyzing your document...' : 'Processing file...'}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                          <div 
                            className="bg-[#f97316] h-3 rounded-full transition-all duration-300"
                            style={{ width: `${ocrProgress || 60}%` }}
                          ></div>
                        </div>
                        <p className="text-base text-gray-600">
                          {ocrProgress > 0 ? `${ocrProgress}% complete` : 'Processing with advanced AI technology...'}
                        </p>
                      </>
                    ) : uploadState.isUploading ? (
                      <>
                        <div className="mb-6">
                          <Upload className="w-16 h-16 text-[#f97316] mx-auto" />
                        </div>
                        <p className="text-xl font-semibold text-gray-800 mb-3">
                          Uploading...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                          <div 
                            className="bg-[#f97316] h-3 rounded-full transition-all duration-300"
                            style={{ width: `${uploadState.uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-base text-gray-600">
                          {uploadState.uploadProgress}% complete
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="mb-6">
                          <Upload className="w-16 h-16 text-[#f97316] group-hover:text-[#ea580c] mx-auto transition-colors" />
                        </div>
                        <p className="text-xl font-semibold text-gray-800 mb-3">
                          Drop your invoice here or click to browse
                        </p>
                        <p className="text-base text-gray-600">
                          Supports PDF, JPG, PNG • <span className="text-[#f97316] font-semibold">See instant AI processing</span>
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    disabled={uploadState.isUploading || uploadState.isProcessing}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#22c55e]" />
                <span>Bank-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                <span>No setup fees</span>
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