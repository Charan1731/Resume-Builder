import React, { useState } from 'react';
import { Loader2, CheckCircle, FileText, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

const ResumeAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [analysis, setAnalysis] = useState<{
    isWellMatched: boolean;
    matchPercentage: number;
    overallFeedback: string;
    missingKeywords: string[];
    suggestions: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError('');
    
    try {
      // For .txt files
      if (file.type === 'text/plain') {
        const text = await file.text();
        setResumeText(text);
        return;
      }
      
      // For .doc, .docx, and .pdf files
      const formData = new FormData();
      formData.append('file', file);
      
      setError('Currently only .txt files are supported. For other formats, please copy and paste the content directly into the text area.');
    } catch (err) {
      console.error('File upload error:', err);
      setError('Error reading file. Please try again or copy/paste the content directly.');
      setFileName('');
    }
  };

  const handleResumeTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(event.target.value);
  };

  const cleanAndParseJSON = (text: string) => {
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    try {
      return JSON.parse(cleanedText);
    } catch (e) {
      console.error('Original text:', text);
      console.error('Cleaned text:', cleanedText);
      throw new Error('Failed to parse response format');
    }
  };

  const analyzeResume = async () => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setError('Gemini API key is not configured');
      return;
    }

    if (!resumeText || !jobDescription) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert resume analyzer. Analyze the provided resume for the given job description. 
              
Evaluate how well the resume matches the job requirements and provide feedback in JSON format.

If the resume is well-matched (>80% match) with minimal or no improvements needed, set "isWellMatched" to true and provide a brief congratulatory message.

If improvements are needed, set "isWellMatched" to false and provide missing keywords and specific suggestions.

Return your analysis in this exact JSON format:
{
  "isWellMatched": boolean,
  "matchPercentage": number,
  "overallFeedback": "string",
  "missingKeywords": ["keyword1", "keyword2"] or [],
  "suggestions": ["suggestion1", "suggestion2"] or []
}

Resume:
${resumeText}

Job Description:
${jobDescription}

Remember: 
1. Respond ONLY with the JSON object
2. Be encouraging but honest in feedback
3. If isWellMatched is true, missingKeywords and suggestions can be empty arrays
4. Include a match percentage (0-100) based on your analysis`
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', errorData);
        throw new Error(`Failed to analyze resume: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      try {
        const textContent = data.candidates[0].content.parts[0].text;
        console.log('Raw API response:', textContent);
        const analysisResult = cleanAndParseJSON(textContent);
        
        // Validate the response format
        if (!('isWellMatched' in analysisResult) || 
            !('matchPercentage' in analysisResult) || 
            !('overallFeedback' in analysisResult) ||
            !Array.isArray(analysisResult.missingKeywords) || 
            !Array.isArray(analysisResult.suggestions)) {
          throw new Error('Invalid response format');
        }
        
        setAnalysis(analysisResult);
      } catch (e) {
        console.error('Parse Error:', e);
        throw new Error('Failed to parse AI response. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume. Please try again.');
      console.error('Analysis Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white via-indigo-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-30 blur-3xl -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-indigo-200 to-pink-200 rounded-full opacity-30 blur-3xl -z-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-20 blur-3xl -z-10 animate-blob animation-delay-4000"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              className="block"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              AI-Powered Resume Analysis
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Tailored for Your Success
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Upload your resume and job description to get AI-powered suggestions for improvement.
          </motion.p>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {/* File Upload */}
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flow-root bg-gradient-to-br from-white to-indigo-50 rounded-lg px-6 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-lg transform transition hover:scale-110">
                      <FileText className="h-8 w-8 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Upload Resume</h3>
                  <div className="mt-5">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".txt,.pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 cursor-pointer transition-transform transform hover:scale-105"
                    >
                      Choose File
                    </label>
                    <span className="ml-3 text-sm text-gray-600">{fileName || 'No file chosen'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Resume Text Area */}
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flow-root bg-gradient-to-br from-white to-indigo-50 rounded-lg px-6 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-lg transform transition hover:scale-110">
                      <FileText className="h-8 w-8 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Resume Text</h3>
                  <textarea
                    value={resumeText}
                    onChange={handleResumeTextChange}
                    className="w-full h-48 p-3 mt-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Paste your resume text here or upload a file above..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="flow-root bg-gradient-to-br from-white to-indigo-50 rounded-lg px-6 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-lg transform transition hover:scale-110">
                      <Brain className="h-8 w-8 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Job Description</h3>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-32 p-3 mt-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Paste job description here..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Analyze Button */}
            <motion.div 
              className="pt-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <button
                onClick={analyzeResume}
                disabled={loading || !resumeText || !jobDescription}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div 
                className="pt-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              </motion.div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <motion.div 
                className="pt-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
              >
                <div className="space-y-6">
                  {/* Match Score */}
                  <div className="p-6 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">Match Score</h2>
                      <span className={`text-xl font-bold ${
                        analysis.matchPercentage >= 80 ? 'text-green-600' : 
                        analysis.matchPercentage >= 60 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {analysis.matchPercentage}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{analysis.overallFeedback}</p>
                  </div>

                  {analysis.isWellMatched ? (
                    <div className="p-6 bg-green-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        <p className="font-medium">Great match! Your resume is well-aligned with this position.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Missing Keywords */}
                      {analysis.missingKeywords.length > 0 && (
                        <div className="p-6 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                          <h2 className="text-xl font-semibold text-gray-900 mb-4">Missing Keywords</h2>
                          <div className="flex flex-wrap gap-2">
                            {analysis.missingKeywords.map((keyword, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Improvement Suggestions */}
                      {analysis.suggestions.length > 0 && (
                        <div className="p-6 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                          <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggestions</h2>
                          <ul className="space-y-3">
                            {analysis.suggestions.map((suggestion, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                • {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;