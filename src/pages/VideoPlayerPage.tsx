import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, PlayCircle, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { COURSES } from '../data/courses';

export default function VideoPlayerPage() {
    const { id } = useParams<{ id: string }>();
    const course = COURSES.find(c => c.id === id);

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center p-16 space-y-4 w-full h-full">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <h2 className="text-2xl font-black">Course not found</h2>
                <Link to="/learn" className="duo-button text-quest-muted hover:bg-quest-border transition-colors px-6 py-2 rounded-xl border-2 font-black uppercase text-sm shadow-none bg-quest-card">
                    Back to Topics
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12 w-full">
            <div className="flex items-center gap-4">
                <Link
                    to="/learn"
                    className="p-3 duo-card hover:bg-duo-blue hover:text-white transition-colors group flex items-center justify-center"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black flex items-center gap-3">
                        {course.title}
                        <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-full border-2 tracking-wider ${course.level === 'Beginner' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            course.level === 'Intermediate' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                            {course.level}
                        </span>
                    </h1>
                </div>
            </div>

            <div className="w-full bg-black rounded-3xl overflow-hidden border-4 border-quest-border shadow-[0_8px_0_var(--border-color)] aspect-video relative">
                <iframe
                    key={course.videoUrl}
                    className="w-full h-full border-0"
                    src={course.videoUrl}
                    title={course.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="duo-card p-8 shadow-[0_4px_0_var(--border-color)] space-y-6">
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-quest-muted font-bold text-sm">
                        <Clock className="w-5 h-5 text-duo-blue" />
                        {course.duration} length
                    </div>
                    <div className="flex items-center gap-2 text-quest-muted font-bold text-sm">
                        <BookOpen className="w-5 h-5 text-duo-blue" />
                        Subject: Coding
                    </div>
                    <div className="flex items-center gap-2 text-quest-muted font-bold text-sm">
                        <PlayCircle className="w-5 h-5 text-duo-blue" />
                        Video Format
                    </div>
                </div>

                <div className="border-t-2 border-quest-border pt-6">
                    <h3 className="font-black text-lg mb-3">About this Lesson</h3>
                    <p className="text-quest-muted font-bold leading-relaxed">{course.description}</p>
                </div>

                <button className="w-full sm:w-auto duo-button duo-button-blue px-8 py-4 text-sm mt-4 shadow-[0_4px_0_#1899d6]">
                    Complete Lesson
                </button>
            </div>
        </div>
    );
}
