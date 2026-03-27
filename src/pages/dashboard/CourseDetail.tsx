import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Lock, ChevronDown, ChevronRight, ArrowLeft, CheckCircle, Zap } from 'lucide-react';
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
        <Link to="/dashboard/courses" className="font-semibold hover:underline" style={{ color: '#0D2847' }}>Back to courses</Link>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-5">
      <Link to="/dashboard/courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
        <ArrowLeft size={18} /> Back to Courses
      </Link>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="relative h-56 md:h-72">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-3">
              {isSubscribed ? (
                <span className="text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1" style={{ background: '#F0FDF4', color: '#1CB957' }}>
                  <CheckCircle size={12} /> Premium Access
                </span>
              ) : (
                <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: '#FEF3E8', color: '#F5820A' }}>
                  Trial Mode
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{course.title}</h1>
            <p className="text-gray-200 text-sm md:text-base">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
        {!isSubscribed && (
          <div className="text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5" style={{ background: '#FEF3E8', color: '#F5820A', border: '1px solid #FED7AA' }}>
            <Lock size={13} /> Subscribe to unlock all
          </div>
        )}
      </div>

      <div className="space-y-3">
        {course.modules.map((module, moduleIndex) => {
          const isLocked = !module.isFree && !isSubscribed;
          const isExpanded = expandedModule === module.id;

          return (
            <div key={module.id} className="bg-white rounded-2xl overflow-hidden" style={{ border: isLocked ? '1px solid #E5E7EB' : '1px solid rgba(13,40,71,0.15)' }}>
              <button
                onClick={() => !isLocked && setExpandedModule(isExpanded ? null : module.id)}
                className={`w-full p-5 flex items-center justify-between ${isLocked ? 'cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50'} transition-colors`}
                disabled={isLocked}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={module.isFree || isSubscribed 
                      ? { background: '#E8F0F8', color: '#0D2847' }
                      : { background: '#F3F4F6', color: '#9CA3AF' }
                    }>
                    {isLocked ? <Lock size={18} /> : moduleIndex + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-400">{module.submodules.length} lessons</p>
                  </div>
                </div>
                {isLocked ? (
                  <Lock className="text-gray-400" size={18} />
                ) : isExpanded ? (
                  <ChevronDown className="text-gray-400" size={20} />
                ) : (
                  <ChevronRight className="text-gray-400" size={20} />
                )}
              </button>

              {isExpanded && !isLocked && (
                <div style={{ borderTop: '1px solid #F3F4F6' }}>
                  {module.submodules.map((submodule) => (
                    <div key={submodule.id} style={{ borderBottom: '1px solid #F9FAFB' }} className="last:border-0">
                      {playingVideo === submodule.videos[0]?.id ? (
                        <div className="p-5 bg-gray-50">
                          <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                            <iframe
                              src={submodule.videos[0]?.videoUrl}
                              title={submodule.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-1">{submodule.title}</h4>
                              <p className="text-sm text-gray-500">{submodule.description}</p>
                            </div>
                            <button onClick={() => setPlayingVideo(null)} className="text-sm font-semibold hover:underline shrink-0" style={{ color: '#0D2847' }}>
                              Close
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => submodule.videos[0] && setPlayingVideo(submodule.videos[0].id)}
                          className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 text-left transition-colors"
                        >
                          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: '#E8F0F8' }}>
                            <Play size={14} style={{ color: '#0D2847' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm">{submodule.title}</h4>
                            <p className="text-xs text-gray-400 truncate">{submodule.description}</p>
                          </div>
                          <span className="text-xs text-gray-400 font-medium shrink-0">
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
        <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0D2847 0%, #112e52 100%)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(245,130,10,0.2)' }}>
            <Zap size={28} style={{ color: '#F5820A' }} />
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Unlock All Content</h3>
          <p className="text-blue-100/70 mb-6 max-w-md mx-auto">Get full access to all modules, earn commissions, and join 10,000+ active learners for just ₦5,000/month</p>
          <Link
            to="/dashboard/settings"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: '#F5820A' }}
          >
            <Zap size={18} /> Subscribe Now
          </Link>
        </div>
      )}
    </div>
  );
}
