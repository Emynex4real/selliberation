import { useState } from 'react';
import { Plus, Edit, Trash2, Play, Lock, Save, X, ChevronDown, FileText, GripVertical } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  isFree: boolean;
  submodules: SubModule[];
}

interface SubModule {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

interface Video {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'published' | 'draft';
  modules: Module[];
}

const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Make Your First ₦10k-₦50k Online',
    description: 'The ultimate beginner guide to earning money online with proven strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop',
    status: 'published',
    modules: [
      { id: 'm1', title: 'Module 1: Introduction', isFree: true, submodules: [
        { id: 's1', title: 'What is Online Income?', description: 'Understanding the various ways to earn money online.', videos: [{ id: 'v1', title: 'Introduction Video', videoUrl: '', duration: 300 }] },
        { id: 's2', title: 'Setting Up Your Mindset', description: 'Mental preparation for your online journey.', videos: [{ id: 'v2', title: 'Mindset Mastery', videoUrl: '', duration: 450 }] }
      ]},
      { id: 'm2', title: 'Module 2: Getting Started', isFree: false, submodules: [
        { id: 's3', title: 'Choosing Your Niche', description: 'How to pick a profitable niche.', videos: [{ id: 'v3', title: 'Niche Selection', videoUrl: '', duration: 600 }] }
      ]}
    ]
  },
  {
    id: '2',
    title: 'WhatsApp Monetization Basics',
    description: 'Turn your WhatsApp into a money-making machine.',
    thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=600&h=400&fit=crop',
    status: 'published',
    modules: [
      { id: 'm3', title: 'Module 1: Getting Started', isFree: true, submodules: [
        { id: 's4', title: 'WhatsApp Business Setup', description: 'Setting up WhatsApp Business for profit.', videos: [{ id: 'v4', title: 'Business Setup', videoUrl: '', duration: 400 }] }
      ]}
    ]
  }
];

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [activeTab, setActiveTab] = useState<'courses' | 'modules'>('courses');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  const [courseForm, setCourseForm] = useState({ title: '', description: '', thumbnail: '', status: 'draft' as 'published' | 'draft' });
  const [moduleForm, setModuleForm] = useState({ title: '', isFree: false });

  const handleSaveCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...courseForm } : c));
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...courseForm,
        modules: []
      };
      setCourses([...courses, newCourse]);
    }
    setShowCourseModal(false);
    setEditingCourse(null);
    setCourseForm({ title: '', description: '', thumbnail: '', status: 'draft' });
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({ title: course.title, description: course.description, thumbnail: course.thumbnail, status: course.status });
    setShowCourseModal(true);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleSaveModule = () => {
    const courseIndex = courses.findIndex(c => c.id === selectedCourseId);
    if (courseIndex === -1) return;

    const updatedCourses = [...courses];
    if (editingModule) {
      updatedCourses[courseIndex].modules = updatedCourses[courseIndex].modules.map(m => 
        m.id === editingModule.id ? { ...m, ...moduleForm } : m
      );
    } else {
      const newModule: Module = {
        id: Date.now().toString(),
        ...moduleForm,
        submodules: []
      };
      updatedCourses[courseIndex].modules.push(newModule);
    }
    setCourses(updatedCourses);
    setShowModuleModal(false);
    setEditingModule(null);
    setModuleForm({ title: '', isFree: false });
  };

  const handleEditModule = (module: Module, courseId: string) => {
    setEditingModule(module);
    setSelectedCourseId(courseId);
    setModuleForm({ title: module.title, isFree: module.isFree });
    setShowModuleModal(true);
  };

  const handleDeleteModule = (courseId: string, moduleId: string) => {
    if (confirm('Delete this module and all its content?')) {
      setCourses(courses.map(c => 
        c.id === courseId ? { ...c, modules: c.modules.filter(m => m.id !== moduleId) } : c
      ));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-500">Create and manage courses, modules, and content</p>
        </div>
        <button 
          onClick={() => { setEditingCourse(null); setCourseForm({ title: '', description: '', thumbnail: '', status: 'draft' }); setShowCourseModal(true); }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> Add Course
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 font-medium ${activeTab === 'courses' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500'}`}
        >
          Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2 font-medium ${activeTab === 'modules' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500'}`}
        >
          All Modules
        </button>
      </div>

      {activeTab === 'courses' && (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-48 h-32 flex-shrink-0">
                  <img src={course.thumbnail || 'https://via.placeholder.com/200x150'} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{course.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {course.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Play size={14} /> {course.modules.length} Modules</span>
                        <span className="flex items-center gap-1"><FileText size={14} /> {course.modules.reduce((sum, m) => sum + m.submodules.length, 0)} Submodules</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditCourse(course)} className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                        <Edit size={18} className="text-gray-500" />
                      </button>
                      <button onClick={() => handleDeleteCourse(course.id)} className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100">
                <button 
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium">Manage Modules ({course.modules.length})</span>
                  <ChevronDown size={20} className={`transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedCourse === course.id && (
                  <div className="px-5 pb-4 space-y-3">
                    <button 
                      onClick={() => { setSelectedCourseId(course.id); setEditingModule(null); setModuleForm({ title: '', isFree: false }); setShowModuleModal(true); }}
                      className="text-amber-600 text-sm font-medium flex items-center gap-1 hover:underline"
                    >
                      <Plus size={16} /> Add Module
                    </button>
                    
                    {course.modules.map((module, idx) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-t-lg">
                          <div className="flex items-center gap-3">
                            <GripVertical size={16} className="text-gray-400 cursor-move" />
                            <span className="font-medium">Module {idx + 1}: {module.title}</span>
                            {module.isFree ? (
                              <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"><Play size={12} /> Free</span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded"><Lock size={12} /> Locked</span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleEditModule(module, course.id)} className="p-1 hover:bg-gray-200 rounded">
                              <Edit size={14} className="text-gray-500" />
                            </button>
                            <button onClick={() => handleDeleteModule(course.id, module.id)} className="p-1 hover:bg-gray-200 rounded">
                              <Trash2 size={14} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-sm text-gray-500">{module.submodules.length} submodules</p>
                        </div>
                      </div>
                    ))}

                    {course.modules.length === 0 && (
                      <p className="text-sm text-gray-400 italic">No modules yet. Click "Add Module" to create one.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'modules' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Course</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Module</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Submodules</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.flatMap(c => c.modules.map(m => ({ course: c, module: m }))).map(({ course, module }) => (
                <tr key={module.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-gray-500">{course.title}</td>
                  <td className="px-5 py-4 font-medium">{module.title}</td>
                  <td className="px-5 py-4">
                    {module.isFree ? (
                      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit"><Play size={12} /> Free</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded w-fit"><Lock size={12} /> Locked</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{module.submodules.length}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => handleEditModule(module, course.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Edit size={16} className="text-gray-500" />
                      </button>
                      <button onClick={() => handleDeleteModule(course.id, module.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
              <button onClick={() => setShowCourseModal(false)}><X size={24} className="text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="e.g., Make Your First ₦50k Online"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  rows={3}
                  placeholder="Describe what students will learn..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={courseForm.thumbnail}
                    onChange={(e) => setCourseForm({ ...courseForm, thumbnail: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="https://..."
                  />
                  {courseForm.thumbnail && (
                    <img src={courseForm.thumbnail} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={courseForm.status}
                  onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value as 'published' | 'draft' })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowCourseModal(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveCourse} className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 flex items-center justify-center gap-2">
                <Save size={18} /> Save Course
              </button>
            </div>
          </div>
        </div>
      )}

      {showModuleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{editingModule ? 'Edit Module' : 'Add New Module'}</h3>
              <button onClick={() => setShowModuleModal(false)}><X size={24} className="text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
                <input
                  type="text"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="e.g., Module 1: Introduction"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={moduleForm.isFree}
                  onChange={(e) => setModuleForm({ ...moduleForm, isFree: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="isFree" className="text-sm font-medium text-gray-700">This module is free (available during trial)</label>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowModuleModal(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveModule} className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 flex items-center justify-center gap-2">
                <Save size={18} /> Save Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
