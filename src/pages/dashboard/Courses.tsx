import { Link } from 'react-router-dom';
import { Play, Lock, Check, ArrowRight } from 'lucide-react';
import { mockCourses, mockSubscriptions } from '../../data/mockData';

export default function Courses() {
  const isSubscribed = (courseId: string) => mockSubscriptions.some(s => s.courseId === courseId && s.status === 'active');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-500">Access and manage your learning content</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map(course => {
          const subscribed = isSubscribed(course.id);
          const freeModule = course.modules.find(m => m.isFree);
          
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                {subscribed ? (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Check size={12} /> Active
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                    Trial
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-gray-500">{course.modules.length} Modules</span>
                  <span className="text-gray-500">{freeModule?.submodules.length || 0} Free Lessons</span>
                </div>

                <Link
                  to={`/dashboard/courses/${course.slug}`}
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium ${
                    subscribed 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {subscribed ? (
                    <>Continue Learning <Play size={16} /></>
                  ) : (
                    <>Start Free Trial <ArrowRight size={16} /></>
                  )}
                </Link>

                {!subscribed && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    <Lock size={14} className="inline mr-1" />
                    Subscribe for ₦5,000/month to unlock all modules
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
