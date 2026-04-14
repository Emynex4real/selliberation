import { useState } from 'react';
import { Plus, Edit, Trash2, Play, Lock, Save, X, ChevronDown, FileText, GripVertical, Video, Clock, Link as LinkIcon } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface VideoItem { id: string; title: string; videoUrl: string; duration: number; }
interface SubModule { id: string; title: string; description: string; videos: VideoItem[]; }
interface Module { id: string; title: string; isFree: boolean; submodules: SubModule[]; }
interface Course { id: string; title: string; description: string; thumbnail: string; status: 'published' | 'draft'; modules: Module[]; }

const initialCourses: Course[] = [
  {
    id: '1', title: 'Make Your First ₦10k-₦50k Online', status: 'published',
    description: 'The ultimate beginner guide to earning money online with proven strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop',
    modules: [
      { id: 'm1', title: 'Module 1: Introduction', isFree: true, submodules: [
        { id: 's1', title: 'What is Online Income?', description: 'Understanding various ways to earn money online.',
          videos: [{ id: 'v1', title: 'Introduction Video', videoUrl: 'https://youtu.be/example1', duration: 300 }] },
        { id: 's2', title: 'Setting Up Your Mindset', description: 'Mental preparation for your online journey.',
          videos: [{ id: 'v2', title: 'Mindset Mastery', videoUrl: '', duration: 450 }] },
      ]},
      { id: 'm2', title: 'Module 2: Getting Started', isFree: false, submodules: [
        { id: 's3', title: 'Choosing Your Niche', description: 'How to pick a profitable niche.',
          videos: [{ id: 'v3', title: 'Niche Selection', videoUrl: '', duration: 600 }] },
      ]},
    ],
  },
  {
    id: '2', title: 'WhatsApp Monetization Basics', status: 'published',
    description: 'Turn your WhatsApp into a money-making machine.',
    thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=600&h=400&fit=crop',
    modules: [
      { id: 'm3', title: 'Module 1: Getting Started', isFree: true, submodules: [
        { id: 's4', title: 'WhatsApp Business Setup', description: 'Setting up WhatsApp Business for profit.',
          videos: [{ id: 'v4', title: 'Business Setup Tutorial', videoUrl: '', duration: 400 }] },
      ]},
    ],
  },
];

function formatDuration(secs: number) {
  const m = Math.floor(secs / 60), s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const defaultCourseForm = { title: '', description: '', thumbnail: '', status: 'draft' as 'published' | 'draft' };
const defaultModuleForm = { title: '', isFree: false };
const defaultSubForm = { title: '', description: '' };
const defaultVideoForm = { title: '', videoUrl: '', duration: 0 };

export default function AdminCourses() {
  const toast = useToast();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'modules'>('courses');

  // Course modal
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState(defaultCourseForm);

  // Module modal
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [moduleCtx, setModuleCtx] = useState({ courseId: '', moduleId: '' });
  const [moduleForm, setModuleForm] = useState(defaultModuleForm);

  // Submodule modal
  const [showSubModal, setShowSubModal] = useState(false);
  const [subCtx, setSubCtx] = useState({ courseId: '', moduleId: '', subId: '' });
  const [subForm, setSubForm] = useState(defaultSubForm);

  // Video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoCtx, setVideoCtx] = useState({ courseId: '', moduleId: '', subId: '', videoId: '' });
  const [videoForm, setVideoForm] = useState(defaultVideoForm);

  /* ---- Course CRUD ---- */
  const openCourseModal = (course?: Course) => {
    setEditingCourse(course ?? null);
    setCourseForm(course ? { title: course.title, description: course.description, thumbnail: course.thumbnail, status: course.status } : defaultCourseForm);
    setShowCourseModal(true);
  };
  const saveCourse = () => {
    if (!courseForm.title.trim()) { toast.warning('Title required'); return; }
    if (editingCourse) {
      setCourses(c => c.map(x => x.id === editingCourse.id ? { ...x, ...courseForm } : x));
      toast.success('Course updated');
    } else {
      setCourses(c => [...c, { id: Date.now().toString(), ...courseForm, modules: [] }]);
      toast.success('Course created');
    }
    setShowCourseModal(false);
  };
  const deleteCourse = (id: string) => {
    setCourses(c => c.filter(x => x.id !== id));
    toast.info('Course deleted');
  };

  /* ---- Module CRUD ---- */
  const openModuleModal = (courseId: string, module?: Module) => {
    setModuleCtx({ courseId, moduleId: module?.id ?? '' });
    setModuleForm(module ? { title: module.title, isFree: module.isFree } : defaultModuleForm);
    setShowModuleModal(true);
  };
  const saveModule = () => {
    if (!moduleForm.title.trim()) { toast.warning('Module title required'); return; }
    setCourses(courses => courses.map(c => {
      if (c.id !== moduleCtx.courseId) return c;
      if (moduleCtx.moduleId) {
        return { ...c, modules: c.modules.map(m => m.id === moduleCtx.moduleId ? { ...m, ...moduleForm } : m) };
      }
      return { ...c, modules: [...c.modules, { id: Date.now().toString(), ...moduleForm, submodules: [] }] };
    }));
    toast.success(moduleCtx.moduleId ? 'Module updated' : 'Module added');
    setShowModuleModal(false);
  };
  const deleteModule = (courseId: string, moduleId: string) => {
    setCourses(c => c.map(x => x.id === courseId ? { ...x, modules: x.modules.filter(m => m.id !== moduleId) } : x));
    toast.info('Module deleted');
  };

  /* ---- Submodule CRUD ---- */
  const openSubModal = (courseId: string, moduleId: string, sub?: SubModule) => {
    setSubCtx({ courseId, moduleId, subId: sub?.id ?? '' });
    setSubForm(sub ? { title: sub.title, description: sub.description } : defaultSubForm);
    setShowSubModal(true);
  };
  const saveSub = () => {
    if (!subForm.title.trim()) { toast.warning('Submodule title required'); return; }
    setCourses(courses => courses.map(c => {
      if (c.id !== subCtx.courseId) return c;
      return {
        ...c, modules: c.modules.map(m => {
          if (m.id !== subCtx.moduleId) return m;
          if (subCtx.subId) {
            return { ...m, submodules: m.submodules.map(s => s.id === subCtx.subId ? { ...s, ...subForm } : s) };
          }
          return { ...m, submodules: [...m.submodules, { id: Date.now().toString(), ...subForm, videos: [] }] };
        }),
      };
    }));
    toast.success(subCtx.subId ? 'Submodule updated' : 'Submodule added');
    setShowSubModal(false);
  };
  const deleteSub = (courseId: string, moduleId: string, subId: string) => {
    setCourses(c => c.map(x => x.id === courseId ? {
      ...x, modules: x.modules.map(m => m.id === moduleId ? { ...m, submodules: m.submodules.filter(s => s.id !== subId) } : m)
    } : x));
    toast.info('Submodule deleted');
  };

  /* ---- Video CRUD ---- */
  const openVideoModal = (courseId: string, moduleId: string, subId: string, video?: VideoItem) => {
    setVideoCtx({ courseId, moduleId, subId, videoId: video?.id ?? '' });
    setVideoForm(video ? { title: video.title, videoUrl: video.videoUrl, duration: video.duration } : defaultVideoForm);
    setShowVideoModal(true);
  };
  const saveVideo = () => {
    if (!videoForm.title.trim()) { toast.warning('Video title required'); return; }
    setCourses(courses => courses.map(c => {
      if (c.id !== videoCtx.courseId) return c;
      return {
        ...c, modules: c.modules.map(m => {
          if (m.id !== videoCtx.moduleId) return m;
          return {
            ...m, submodules: m.submodules.map(s => {
              if (s.id !== videoCtx.subId) return s;
              if (videoCtx.videoId) {
                return { ...s, videos: s.videos.map(v => v.id === videoCtx.videoId ? { ...v, ...videoForm } : v) };
              }
              return { ...s, videos: [...s.videos, { id: Date.now().toString(), ...videoForm }] };
            }),
          };
        }),
      };
    }));
    toast.success(videoCtx.videoId ? 'Video updated' : 'Video added');
    setShowVideoModal(false);
  };
  const deleteVideo = (courseId: string, moduleId: string, subId: string, videoId: string) => {
    setCourses(c => c.map(x => x.id === courseId ? {
      ...x, modules: x.modules.map(m => m.id === moduleId ? {
        ...m, submodules: m.submodules.map(s => s.id === subId ? { ...s, videos: s.videos.filter(v => v.id !== videoId) } : s)
      } : m)
    } : x));
    toast.info('Video deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Course Management
          </h1>
          <p className="text-gray-500 text-sm">Manage courses, modules, submodules, and videos</p>
        </div>
        <button onClick={() => openCourseModal()}
          className="text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2"
          style={{ background: '#F5820A' }}>
          <Plus size={17} /> Add Course
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {(['courses', 'modules'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 font-medium text-sm capitalize transition-colors border-b-2 ${activeTab === tab ? 'border-amber-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            style={activeTab === tab ? { color: '#F5820A' } : {}}>
            {tab === 'courses' ? `Courses (${courses.length})` : 'All Modules'}
          </button>
        ))}
      </div>

      {activeTab === 'courses' && (
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Course header */}
              <div className="flex items-stretch">
                <div className="w-40 h-28 shrink-0">
                  <img src={course.thumbnail || 'https://via.placeholder.com/200x150'} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{course.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {course.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Play size={12} /> {course.modules.length} Modules</span>
                        <span className="flex items-center gap-1"><FileText size={12} /> {course.modules.reduce((s, m) => s + m.submodules.length, 0)} Submodules</span>
                        <span className="flex items-center gap-1"><Video size={12} /> {course.modules.reduce((s, m) => s + m.submodules.reduce((ss, sub) => ss + sub.videos.length, 0), 0)} Videos</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openCourseModal(course)} className="p-2 hover:bg-gray-100 rounded-lg"><Edit size={15} className="text-gray-500" /></button>
                      <button onClick={() => deleteCourse(course.id)} className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 size={15} className="text-red-400" /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modules accordion */}
              <div className="border-t border-gray-100">
                <button onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 text-sm font-medium">
                  <span>Modules ({course.modules.length})</span>
                  <ChevronDown size={17} className={`text-gray-400 transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`} />
                </button>

                {expandedCourse === course.id && (
                  <div className="px-5 pb-4 space-y-3">
                    <button onClick={() => openModuleModal(course.id)}
                      className="text-sm font-medium flex items-center gap-1 hover:underline" style={{ color: '#F5820A' }}>
                      <Plus size={14} /> Add Module
                    </button>
                    {course.modules.map((mod, idx) => (
                      <div key={mod.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        {/* Module row */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                          <div className="flex items-center gap-2">
                            <GripVertical size={14} className="text-gray-300" />
                            <span className="font-medium text-sm">Module {idx + 1}: {mod.title}</span>
                            {mod.isFree
                              ? <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"><Play size={10} /> Free</span>
                              : <span className="flex items-center gap-1 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded"><Lock size={10} /> Locked</span>
                            }
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                              className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 rounded flex items-center gap-1">
                              <ChevronDown size={13} className={`transition-transform ${expandedModule === mod.id ? 'rotate-180' : ''}`} />
                              {mod.submodules.length} submodules
                            </button>
                            <button onClick={() => openModuleModal(course.id, mod)} className="p-1 hover:bg-gray-200 rounded"><Edit size={13} className="text-gray-500" /></button>
                            <button onClick={() => deleteModule(course.id, mod.id)} className="p-1 hover:bg-gray-200 rounded"><Trash2 size={13} className="text-red-400" /></button>
                          </div>
                        </div>

                        {/* Submodules */}
                        {expandedModule === mod.id && (
                          <div className="p-3 bg-white space-y-2">
                            <button onClick={() => openSubModal(course.id, mod.id)}
                              className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: '#F5820A' }}>
                              <Plus size={12} /> Add Submodule
                            </button>
                            {mod.submodules.map((sub, sIdx) => (
                              <div key={sub.id} className="border border-gray-100 rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50/60">
                                  <div>
                                    <p className="text-xs font-semibold text-gray-700">Submodule {sIdx + 1}: {sub.title}</p>
                                    <p className="text-xs text-gray-400">{sub.description}</p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => setExpandedSub(expandedSub === sub.id ? null : sub.id)}
                                      className="px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-200 rounded flex items-center gap-1">
                                      <Video size={11} /> {sub.videos.length} videos
                                    </button>
                                    <button onClick={() => openSubModal(course.id, mod.id, sub)} className="p-1 hover:bg-gray-200 rounded"><Edit size={12} className="text-gray-500" /></button>
                                    <button onClick={() => deleteSub(course.id, mod.id, sub.id)} className="p-1 hover:bg-gray-200 rounded"><Trash2 size={12} className="text-red-400" /></button>
                                  </div>
                                </div>

                                {/* Videos */}
                                {expandedSub === sub.id && (
                                  <div className="px-3 py-2 space-y-1.5">
                                    <button onClick={() => openVideoModal(course.id, mod.id, sub.id)}
                                      className="text-xs font-medium flex items-center gap-1 hover:underline" style={{ color: '#F5820A' }}>
                                      <Plus size={11} /> Add Video
                                    </button>
                                    {sub.videos.map(video => (
                                      <div key={video.id} className="flex items-center gap-3 p-2 rounded-lg bg-white border border-gray-100">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(245,130,10,0.1)' }}>
                                          <Play size={12} style={{ color: '#F5820A' }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs font-medium text-gray-800 truncate">{video.title}</p>
                                          <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-gray-400 flex items-center gap-0.5"><Clock size={10} /> {formatDuration(video.duration)}</span>
                                            {video.videoUrl && <span className="text-xs text-blue-500 flex items-center gap-0.5"><LinkIcon size={10} /> URL set</span>}
                                          </div>
                                        </div>
                                        <div className="flex gap-1">
                                          <button onClick={() => openVideoModal(course.id, mod.id, sub.id, video)} className="p-1 hover:bg-gray-100 rounded"><Edit size={12} className="text-gray-500" /></button>
                                          <button onClick={() => deleteVideo(course.id, mod.id, sub.id, video.id)} className="p-1 hover:bg-gray-100 rounded"><Trash2 size={12} className="text-red-400" /></button>
                                        </div>
                                      </div>
                                    ))}
                                    {sub.videos.length === 0 && <p className="text-xs text-gray-400 italic py-1">No videos yet.</p>}
                                  </div>
                                )}
                              </div>
                            ))}
                            {mod.submodules.length === 0 && <p className="text-xs text-gray-400 italic">No submodules yet.</p>}
                          </div>
                        )}
                      </div>
                    ))}
                    {course.modules.length === 0 && <p className="text-sm text-gray-400 italic">No modules yet.</p>}
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
                {['Course', 'Module', 'Access', 'Submodules', 'Videos', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.flatMap(c => c.modules.map(m => ({ course: c, module: m }))).map(({ course, module }) => (
                <tr key={module.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-gray-500 text-sm">{course.title}</td>
                  <td className="px-5 py-4 font-medium text-sm">{module.title}</td>
                  <td className="px-5 py-4">
                    {module.isFree
                      ? <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit"><Play size={11} /> Free</span>
                      : <span className="flex items-center gap-1 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded w-fit"><Lock size={11} /> Locked</span>
                    }
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{module.submodules.length}</td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{module.submodules.reduce((s, sub) => s + sub.videos.length, 0)}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => openModuleModal(course.id, module)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit size={14} className="text-gray-500" /></button>
                      <button onClick={() => deleteModule(course.id, module.id)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Trash2 size={14} className="text-red-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Course modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">{editingCourse ? 'Edit Course' : 'Create Course'}</h3>
              <button onClick={() => setShowCourseModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm" placeholder="Course title..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm resize-none" rows={3} placeholder="Course description..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail URL</label>
                <div className="flex gap-2">
                  <input value={courseForm.thumbnail} onChange={e => setCourseForm({ ...courseForm, thumbnail: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm" placeholder="https://..." />
                  {courseForm.thumbnail && <img src={courseForm.thumbnail} alt="Preview" className="w-14 h-14 object-cover rounded-lg" />}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select value={courseForm.status} onChange={e => setCourseForm({ ...courseForm, status: e.target.value as 'published' | 'draft' })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowCourseModal(false)} className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={saveCourse} className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: '#F5820A' }}>
                <Save size={15} /> Save Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Module modal */}
      {showModuleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">{moduleCtx.moduleId ? 'Edit Module' : 'Add Module'}</h3>
              <button onClick={() => setShowModuleModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Module Title</label>
                <input value={moduleForm.title} onChange={e => setModuleForm({ ...moduleForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm" placeholder="e.g., Module 1: Introduction" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={moduleForm.isFree} onChange={e => setModuleForm({ ...moduleForm, isFree: e.target.checked })} className="w-4 h-4 rounded accent-amber-500" />
                <span className="text-sm font-medium text-gray-700">Free module (available during trial)</span>
              </label>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowModuleModal(false)} className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={saveModule} className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: '#F5820A' }}>
                <Save size={15} /> Save Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submodule modal */}
      {showSubModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">{subCtx.subId ? 'Edit Submodule' : 'Add Submodule'}</h3>
              <button onClick={() => setShowSubModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input value={subForm.title} onChange={e => setSubForm({ ...subForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm" placeholder="e.g., What is Online Income?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={subForm.description} onChange={e => setSubForm({ ...subForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm resize-none" rows={3} placeholder="Brief description..." />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowSubModal(false)} className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={saveSub} className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: '#F5820A' }}>
                <Save size={15} /> Save Submodule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">{videoCtx.videoId ? 'Edit Video' : 'Add Video'}</h3>
              <button onClick={() => setShowVideoModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Video Title</label>
                <input value={videoForm.title} onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm" placeholder="e.g., Introduction Video" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Video URL (YouTube / Cloudflare)</label>
                <input value={videoForm.videoUrl} onChange={e => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono" placeholder="https://youtu.be/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (seconds)</label>
                <input type="number" value={videoForm.duration} onChange={e => setVideoForm({ ...videoForm, duration: parseInt(e.target.value) || 0 })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm" placeholder="e.g., 300 for 5:00" />
                {videoForm.duration > 0 && (
                  <p className="text-xs text-gray-400 mt-1">= {formatDuration(videoForm.duration)}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowVideoModal(false)} className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={saveVideo} className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: '#F5820A' }}>
                <Save size={15} /> Save Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
