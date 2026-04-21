export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
}

// @ts-ignore
import yt1 from '../images/yt_1.jpg';
// @ts-ignore
import yt2 from '../images/yt_2.jpg';
// @ts-ignore
import yt3 from '../images/yt_3.jpg';
// @ts-ignore
import yt4 from '../images/yt_4.jpg';

export const COURSES: Course[] = [
    {
        id: 'intro-react',
        title: 'Introduction to React',
        description: 'Learn the fundamentals of building user interfaces with React, including components, props, and state.',
        thumbnail: yt1,
        videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
        duration: '10:00',
        level: 'Beginner',
    },
    {
        id: 'python-basics',
        title: 'Python for Beginners',
        description: 'Discover the power of Python programming. Start writing scripts, variables, and loops from scratch.',
        thumbnail: yt2,
        videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
        duration: '11:00',
        level: 'Beginner',
    },
    {
        id: 'data-structures-intro',
        title: 'Data Structures & Algorithms',
        description: 'A deep dive into essential data structures like Arrays, Linked Lists, Stacks, and Trees.',
        thumbnail: yt3,
        videoUrl: 'https://www.youtube.com/embed/RBSGKlAvoiM',
        duration: '12:00',
        level: 'Intermediate',
    },
    {
        id: 'advanced-js',
        title: 'Advanced JavaScript Concepts',
        description: 'Master closures, promises, async/await, and the event loop to become a JavaScript expert.',
        thumbnail: yt4,
        videoUrl: 'https://www.youtube.com/embed/ZvwXZq5jtTg',
        duration: '14:00',
        level: 'Advanced',
    }
];
