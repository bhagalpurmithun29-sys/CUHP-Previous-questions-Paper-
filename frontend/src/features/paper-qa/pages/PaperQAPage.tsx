import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePaperQA } from '../hooks/usePaperQA';
import { PaperChatPanel } from '../components/PaperChatPanel';
import { SelectionToolbar } from '../components/SelectionToolbar';
import { SelectedTextPanel } from '../components/SelectedTextPanel';
import { CitationNavigator } from '../components/CitationNavigator';
import { RelatedQuestions } from '../components/RelatedQuestions';
import { ContextViewer } from '../components/ContextViewer';
import { PageSummary } from '../components/PageSummary';
import { QuestionExplanation } from '../components/QuestionExplanation';

// Mock component to represent the PDF Viewer for the split pane
const PDFViewerMock = ({ onTextSelect }: { onTextSelect: (text: string, x: number, y: number) => void }) => {
  return (
    <div className="h-full w-full bg-gray-100 dark:bg-gray-800 p-8 overflow-y-auto relative"
      onMouseUp={(e) => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim()) {
          onTextSelect(selection.toString().trim(), e.clientX, e.clientY);
        }
      }}
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg p-12 min-h-[1000px]">
        <h1 className="text-2xl font-bold text-center mb-8">Computer Science Final Exam 2024</h1>
        <p className="mb-4">1. Explain the differences between a process and a thread in the context of Operating Systems.</p>
        <p className="mb-4">2. What are the key concepts of ACID properties in Database Management Systems?</p>
        <p className="mb-4 text-gray-400 italic mt-20">(Select any text to interact with the AI Assistant)</p>
      </div>
    </div>
  );
};

export const PaperQAPage: React.FC = () => {
  const { paperId = 'default-paper-id' } = useParams();
  const { messages, isTyping, sendMessage, selectedText, setSelectedText, summarizeDocument, analyzeSelection } = usePaperQA(paperId);
  const [selectionBox, setSelectionBox] = useState<{ text: string; x: number; y: number } | null>(null);
  const [summaryData, setSummaryData] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [explanationData, setExplanationData] = useState<{ question: string, text: string } | null>(null);

  const handleTextSelect = (text: string, x: number, y: number) => {
    setSelectionBox({ text, x, y });
  };

  const handleAskAi = (text: string) => {
    setSelectedText(text);
    setSelectionBox(null);
  };

  const handleExplain = async (text: string) => {
    setSelectionBox(null);
    const data = await analyzeSelection.mutateAsync({ text });
    setExplanationData({ question: 'Analysis', text: data.analysis });
  };

  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    const data = await summarizeDocument.mutateAsync({ type: 'page', pageNumber: 1 });
    setSummaryData(data.content);
    setIsSummarizing(false);
  };

  // Mock citations
  const mockCitations = messages.length > 0 ? [
    { title: 'Computer Science Final Exam', page: 1, confidence: 0.98, reference: 'Explain the differences between a process...' }
  ] : [];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Left side: PDF Document */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <PDFViewerMock onTextSelect={handleTextSelect} />
        <SelectionToolbar 
          selectionInfo={selectionBox} 
          onAskAi={handleAskAi} 
          onExplain={handleExplain}
          onClose={() => setSelectionBox(null)} 
        />
      </div>

      {/* Right side: AI Assistant Panel */}
      <div className="w-[450px] flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl z-10">
        <SelectedTextPanel 
          selectedText={selectedText} 
          onClear={() => setSelectedText(null)} 
          onClose={() => setSelectedText(null)} 
        />
        
        <div className="flex-1 overflow-hidden relative">
          <PaperChatPanel 
            messages={messages} 
            isTyping={isTyping} 
            onSendMessage={(msg) => sendMessage(msg, { selectedText })} 
          />
        </div>

        {/* Dynamic Context Widgets */}
        <div className="border-t border-gray-200 dark:border-gray-800 overflow-y-auto max-h-[40vh] bg-gray-50/50 dark:bg-gray-900/50">
          <ContextViewer />
          
          {explanationData && (
             <div className="p-4 border-t border-gray-200 dark:border-gray-800">
               <QuestionExplanation 
                 questionNumber={explanationData.question} 
                 explanation={explanationData.text} 
               />
             </div>
          )}

          {!summaryData && !explanationData && (
            <div className="p-4 flex justify-center border-t border-gray-200 dark:border-gray-800">
              <button 
                onClick={handleGenerateSummary}
                disabled={isSummarizing}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm w-full flex justify-center items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                {isSummarizing ? 'Generating...' : 'Generate Page Summary'}
              </button>
            </div>
          )}

          {summaryData && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <PageSummary 
                summary={summaryData} 
                pageNumber={1} 
                isLoading={isSummarizing} 
                onRegenerate={handleGenerateSummary} 
              />
            </div>
          )}

          <RelatedQuestions 
            questions={['Summarize this section', 'Explain the formulas', 'Find similar questions']} 
            onSelect={(q) => sendMessage(q)} 
          />
          
          <CitationNavigator citations={mockCitations} onCitationClick={(page) => console.log('Navigate to page', page)} />
        </div>
      </div>
    </div>
  );
};

export default PaperQAPage;
