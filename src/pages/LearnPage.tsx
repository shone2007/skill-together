import React, { useState } from 'react';
import { Video, Search, PlayCircle, BookOpen } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/courses';

export default function LearnPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCourses = COURSES.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <PageHeader
                icon={BookOpen}
                title="Coding Topics"
                subtitle="Explore our library of programming lessons, click on a topic, and start learning immediately."
            />

            <div className="flex items-center justify-between xl:max-w-2xl">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-quest-muted" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search topics..."
                        className="w-full bg-quest-card border-2 border-quest-border rounded-2xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-duo-blue transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                    <Link
                        to={`/learn/${course.id}`}
                        key={course.id}
                        className="group duo-card shadow-[0_6px_0_var(--border-color)] hover:-translate-y-1 hover:shadow-[0_8px_0_var(--border-color)] transition-all overflow-hidden flex flex-col"
                    >
                        <div className="relative h-40 w-full bg-quest-border overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <PlayCircle className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-black text-white uppercase tracking-wider">
                                {course.duration}
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full border-2 ${course.level === 'Beginner' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                        course.level === 'Intermediate' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                            'bg-red-500/10 text-red-500 border-red-500/20'
                                    }`}>
                                    {course.level}
                                </span>
                            </div>
                            <h3 className="font-black text-lg mb-2 line-clamp-1">{course.title}</h3>
                            <p className="text-xs text-quest-muted font-bold line-clamp-2 mb-4 flex-1">
                                {course.description}
                            </p>

                            <button className="w-full duo-button duo-button-blue py-3 flex items-center justify-center gap-2 text-sm mt-auto">
                                <PlayCircle className="w-4 h-4" /> Watch Lesson
                            </button>
                        </div>
                    </Link>
                ))}
                {filteredCourses.length === 0 && (
                    <div className="col-span-full py-16 text-center text-quest-muted font-bold">
                        No topics found matching "{searchQuery}".
                    </div>
                )}
            </div>
        </div>
    );
}
