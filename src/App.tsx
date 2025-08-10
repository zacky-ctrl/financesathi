import React, { useState, useRef } from 'react';
import { Upload, FileText, DollarSign, Calendar, Building, AlertCircle, CheckCircle } from 'lucide-react';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface InvoiceData {
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: string;
  taxAmount: string;
  lineItems: Array<{
    description: string;
    quantity: string;
    unitPrice: string;
    amount: string;
  }>;
}

interface ProcessingResult {
  success: boolean;
  data?: InvoiceData;
  error?: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        setResult(null);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setResult(null);
      }
    }
  };

  const analyzeInvoiceWithAI = async (imageBase64: string): Promise<InvoiceData> => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Please analyze this invoice image and extract the following information in JSON format:
                {
                  "vendorName": "Company name",
                  "invoiceNumber": "Invoice number",
                  "invoiceDate": "Invoice date",
                  "dueDate": "Due date",
                  "totalAmount": "Total amount",
                  "taxAmount": "Tax amount",
                  "lineItems": [
                    {
                      "description": "Item description",
                      "quantity": "Quantity",
                      "unitPrice": "Unit price",
                      "amount": "Line total"
                    }
                  ]
                }
                
                Please provide only the JSON response without any additional text.`
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const invoiceData = JSON.parse(content);
      return invoiceData;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix to get just the base64 string
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFile = async () => {
    if (!file) return;

    setProcessing(true);
    setResult(null);

    try {
      // Convert file to base64 for direct AI analysis
      const base64Image = await convertFileToBase64(file);
      
      // Analyze with AI directly
      const invoiceData = await analyzeInvoiceWithAI(base64Image);
      
      setResult({
        success: true,
        data: invoiceData
      });
    } catch (error) {
      console.error('Processing failed:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">FinanceSaathi</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Business Finance Made Aasan - Upload your invoice images and extract key financial data instantly using AI
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-2 text-indigo-600" />
              Upload Invoice
            </h2>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">
                Drag and drop your invoice image here, or click to select
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports JPG, PNG, GIF formats
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Choose File
              </button>
            </div>

            {file && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-indigo-600 mr-2" />
                    <span className="text-gray-700 font-medium">{file.name}</span>
                    <span className="text-gray-500 ml-2">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={processFile}
                      disabled={processing}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                      {processing ? 'Processing...' : 'Process Invoice'}
                    </button>
                    <button
                      onClick={resetForm}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Processing Status */}
          {processing && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
                <span className="text-lg text-gray-700">Processing invoice with AI...</span>
              </div>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                {result.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                )}
                <h2 className="text-2xl font-semibold text-gray-800">
                  {result.success ? 'Extraction Results' : 'Processing Error'}
                </h2>
              </div>

              {result.success && result.data ? (
                <div className="space-y-6">
                  {/* Basic Invoice Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                        <Building className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Vendor</p>
                          <p className="font-semibold text-gray-800">{result.data.vendorName}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-green-50 rounded-lg">
                        <FileText className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Invoice Number</p>
                          <p className="font-semibold text-gray-800">{result.data.invoiceNumber}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Invoice Date</p>
                          <p className="font-semibold text-gray-800">{result.data.invoiceDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-orange-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Due Date</p>
                          <p className="font-semibold text-gray-800">{result.data.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <DollarSign className="w-8 h-8 text-green-600 mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-green-700">{result.data.totalAmount}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <DollarSign className="w-8 h-8 text-blue-600 mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Tax Amount</p>
                        <p className="text-2xl font-bold text-blue-700">{result.data.taxAmount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Line Items */}
                  {result.data.lineItems && result.data.lineItems.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Line Items</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 rounded-lg">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Unit Price</th>
                              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.data.lineItems.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-800">{item.description}</td>
                                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-800">{item.quantity}</td>
                                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-800">{item.unitPrice}</td>
                                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-800 font-semibold">{item.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <p className="text-red-700 font-medium">Error Details:</p>
                  <p className="text-red-600 mt-2">{result.error}</p>
                  <p className="text-sm text-red-500 mt-4">
                    Please ensure you have a valid OpenAI API key configured and try again.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;