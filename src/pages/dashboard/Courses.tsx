import { Link } from 'react-router-dom';
import { Play, Lock, Check, BookOpen, ChevronRight } from 'lucide-react';
import { mockCourses, mockSubscriptions, mockCourseProgress } from '../../data/mockData';

export default function Courses() {
  const isSubscribed = (courseId: string) => mockSubscriptions.some(s => s.courseId === courseId && s.status === 'active');

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>My Courses</h1>
        <p className="text-gray-500 text-sm mt-0.5">Access and manage your learning content</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockCourses.map(course => {
          const subscribed = isSubscribed(course.id);
          const progress = mockCourseProgress[course.id] ?? 0;
          const freeModule = course.modules.find(m => m.isFree);
          
          return (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
              <div className="relative h-44">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                {subscribed ? (
                  <div className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold" style={{ background: '#F0FDF4', color: '#1CB957' }}>
                    <Check size={12} /> Active
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: '#FEF3E8', color: '#F5820A' }}>
                    Trial
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-medium bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <Lock size={11} /> Module 1 Free
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 leading-snug line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><BookOpen size={13} style={{ color: '#0D2847' }} /> {course.modules.length} Modules</span>
                  <span className="flex items-center gap-1"><Play size={13} style={{ color: '#1CB957' }} /> {freeModule?.submodules.length || 0} Free</span>
                </div>

                {subscribed && progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">{progress}% complete</span>
                      <span className="text-xs font-semibold" style={{ color: progress > 50 ? '#1CB957' : '#F5820A' }}>In progress</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${progress}%`,
                          background: progress > 50 ? 'linear-gradient(90deg, #0D2847, #1CB957)' : 'linear-gradient(90deg, #F5820A, #FFB347)',
                        }}
                      />
                    </div>
                  </div>
                )}

                <Link
                  to={`/dashboard/courses/${course.slug}`}
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all hover:-translate-y-0.5"
                  style={subscribed 
                    ? { background: 'linear-gradient(135deg, #0D2847, #1CB957)', color: 'white' }
                    : { background: '#F8FAFC', color: '#0D2847', border: '1px solid #E5E7EB' }
                  }
                >
                  {subscribed ? (
                    <>Continue Learning <ChevronRight size={16} /></>
                  ) : (
                    <>Start Free Trial <Play size={16} /></>
                  )}
                </Link>

                {!subscribed && (
                  <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <Lock size={11} /> Subscribe for ₦5,000/month to unlock all
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
