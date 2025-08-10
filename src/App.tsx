import React, { useState } from 'react';
import { Upload, FileText, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  // Get API key from environment variables
  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError('');
      setExtractedText('');
      setAnalysis('');
    }
  };

  const processDocument = async () => {
    if (!file) return;

    // Check if API key is configured
    if (!openaiApiKey || openaiApiKey === 'your_openai_api_key_here') {
      setError('Please configure your OpenAI API key in the .env.local file');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Extract text using Tesseract.js
      const Tesseract = await import('tesseract.js');
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      setExtractedText(text);

      // Analyze with OpenAI
      const OpenAI = await import('openai');
      const openai = new OpenAI.default({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend server
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a financial document analyzer. Analyze the provided document text and extract key financial information, identify document type, and provide insights."
          },
          {
            role: "user",
            content: `Please analyze this financial document and provide insights:\n\n${text}`
          }
        ],
        max_tokens: 1000
      });

      setAnalysis(completion.choices[0]?.message?.content || 'No analysis available');
    } catch (err) {
      console.error('Processing error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while processing the document');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FinanceSaathi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Business Finance Made Aasan - Upload your financial documents for instant AI-powered analysis
          </p>
        </div>

        {/* API Key Status */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            !openaiApiKey || openaiApiKey === 'your_openai_api_key_here' 
              ? 'bg-yellow-50 border border-yellow-200' 
              : 'bg-green-50 border border-green-200'
          }`}>
            {!openaiApiKey || openaiApiKey === 'your_openai_api_key_here' ? (
              <>
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-yellow-800 font-medium">API Key Required</p>
                  <p className="text-yellow-700 text-sm">
                    Please add your OpenAI API key to the .env.local file to enable document analysis
                  </p>
                </div>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800">API key configured successfully</p>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* File Upload */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Upload Financial Document
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Choose a file
                </label>
                <p className="text-gray-500 mt-2">
                  Supports images (JPG, PNG) and PDF files
                </p>
                {file && (
                  <p className="text-green-600 mt-2 font-medium">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>

            {/* Process Button */}
            {file && (
              <div className="mb-8">
                <button
                  onClick={processDocument}
                  disabled={isProcessing || (!openaiApiKey || openaiApiKey === 'your_openai_api_key_here')}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Document...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Analyze Document
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800 font-medium">Error</p>
                </div>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            )}

            {/* Results */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Extracted Text */}
              {extractedText && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Extracted Text
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {extractedText}
                    </pre>
                  </div>
                </div>
              )}

              {/* AI Analysis */}
              {analysis && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    AI Analysis
                  </h3>
                  <div className="bg-indigo-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                      {analysis}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              How to set up your API key:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Get your OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">OpenAI Platform</a></li>
              <li>Open the <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> file in your project root</li>
              <li>Replace <code className="bg-blue-100 px-2 py-1 rounded">your_openai_api_key_here</code> with your actual API key</li>
              <li>Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;