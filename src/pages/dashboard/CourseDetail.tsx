import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Lock, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { mockCourses, mockSubscriptions } from '../../data/mockData';

export default function CourseDetail() {
  const { courseSlug } = useParams();
  const course = mockCourses.find(c => c.slug === courseSlug);
  const isSubscribed = course && mockSubscriptions.some(s => s.courseId === course.id && s.status === 'active');
  
  const [expandedModule, setExpandedModule] = useState<string | null>(course?.modules[0]?.id || null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-4">Course not found</h2>
        <Link to="/dashboard/courses" className="text-amber-600 hover:underline">Back to courses</Link>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Link to="/dashboard/courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
        <ArrowLeft size={20} /> Back to Courses
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative h-48 md:h-64">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{course.title}</h1>
            <p className="text-gray-200">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Course Content</h2>
        {!isSubscribed && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-lg text-sm">
            <Lock size={16} className="inline mr-2" />
            Subscribe to unlock all modules
          </div>
        )}
      </div>

      <div className="space-y-3">
        {course.modules.map((module, moduleIndex) => {
          const isLocked = !module.isFree && !isSubscribed;
          const isExpanded = expandedModule === module.id;

          return (
            <div key={module.id} className={`bg-white rounded-xl border ${isLocked ? 'border-gray-200' : 'border-amber-200'} overflow-hidden`}>
              <button
                onClick={() => !isLocked && setExpandedModule(isExpanded ? null : module.id)}
                className={`w-full p-5 flex items-center justify-between ${isLocked ? 'cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50'} transition-colors`}
                disabled={isLocked}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${module.isFree || isSubscribed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                    {isLocked ? <Lock size={20} /> : <span className="font-bold">{moduleIndex + 1}</span>}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{module.title}</h3>
                    <p className="text-sm text-gray-500">{module.submodules.length} lessons</p>
                  </div>
                </div>
                {isLocked ? (
                  <Lock className="text-gray-400" size={20} />
                ) : isExpanded ? (
                  <ChevronUp className="text-gray-400" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400" size={20} />
                )}
              </button>

              {isExpanded && !isLocked && (
                <div className="border-t border-gray-100">
                  {module.submodules.map((submodule) => (
                    <div key={submodule.id} className="border-b border-gray-100 last:border-0">
                      {playingVideo === submodule.videos[0]?.id ? (
                        <div className="p-4 bg-gray-50">
                          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3">
                            <iframe
                              src={submodule.videos[0]?.videoUrl}
                              title={submodule.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{submodule.title}</h4>
                              <p className="text-sm text-gray-500">{submodule.description}</p>
                            </div>
                            <button onClick={() => setPlayingVideo(null)} className="text-amber-600 hover:underline text-sm">
                              Close
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => submodule.videos[0] && setPlayingVideo(submodule.videos[0].id)}
                          className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                            <Play size={14} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{submodule.title}</h4>
                            <p className="text-sm text-gray-500">{submodule.description}</p>
                          </div>
                          <span className="text-sm text-gray-400">
                            {submodule.videos[0] && formatDuration(submodule.videos[0].duration)}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isSubscribed && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Unlock All Content</h3>
          <p className="mb-4">Get full access to all modules for just ₦5,000/month</p>
          <button className="bg-white text-amber-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100">
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
}
