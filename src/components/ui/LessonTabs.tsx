import { BookOpen, Code2 } from "lucide-react";

interface LessonTabsProps {
  activeTab: 'lesson' | 'editor';
  setActiveTab: (tab: 'lesson' | 'editor') => void;
}

const LessonTabs = ({ activeTab, setActiveTab }: LessonTabsProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-base-200 border-t border-base-300 shadow-lg grid grid-cols-2 z-50">
      <button 
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${activeTab === 'lesson' ? 'bg-base-100 text-primary' : 'text-base-content'}`} 
        onClick={() => setActiveTab('lesson')}
      >
        <BookOpen size={20} />
        <span className="font-bold text-xs">Lesson</span>
      </button>
      <button 
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${activeTab === 'editor' ? 'bg-base-100 text-primary' : 'text-base-content'}`} 
        onClick={() => setActiveTab('editor')}
      >
        <Code2 size={20} />
        <span className="font-bold text-xs">Editor</span>
      </button>
    </div>
  );
};

export default LessonTabs;
