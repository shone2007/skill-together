// @ts-ignore
import yt1 from './images/yt_1.jpg';
// @ts-ignore
import yt2 from './images/yt_2.jpg';
// @ts-ignore
import yt3 from './images/yt_3.jpg';
// @ts-ignore
import yt4 from './images/yt_4.jpg';
// @ts-ignore
import yt5 from './images/yt_5.jpg';

export type Page = 'dashboard' | 'quests' | 'skill-tree' | 'tavern' | 'trophies' | 'trials' | 'learn' | 'lesson' | 'stuck' | 'certificates' | 'profile' | 'notifications';

export interface User {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  streak: number;
  rank: string;
  rating: number;
  skillsToTeach: string[];
  skillsToLearn: string[];
}

export interface Notification {
  id: string;
  type: 'quest' | 'session' | 'achievement' | 'system';
  message: string;
  time: string;
  read: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  hourlyRate: number;
  availability: string;
}

export interface Session {
  id: string;
  mentorName: string;
  mentorAvatar: string;
  skill: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Certificate {
  id: string;
  skillPath: string;
  completedDate: string;
  progress: number;
  image: string;
}

export interface Quest {
  id: string;
  title: string;
  guildMaster: string;
  thumbnail: string;
  level: number;
  xp: number;
  category: 'Design' | 'Code' | 'Art' | 'Music' | 'Business';
  isFree?: boolean;
  progress?: number;
  cost: number;
}

export interface GuildMaster {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  level: number;
  apprentices: number;
}

export interface Project {
  id: string;
  title: string;
  studentName: string;
  studentAvatar: string;
  image: string;
  likes: number;
}

export const MOCK_USER: User = {
  name: 'Shadow Weaver',
  avatar: 'https://ui-avatars.com/api/?name=Shadow+Weaver&background=0D8ABC&color=fff',
  level: 5,
  xp: 4250,
  maxXp: 5000,
  coins: 1000,
  streak: 12,
  rank: 'Bronze I',
  rating: 4.8,
  skillsToTeach: ['React Basics', 'CSS Layouts'],
  skillsToLearn: ['Python OOP', 'Guitar Fundamentals']
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'quest', message: 'New quest available: Advanced Framer Motion', time: '2h ago', read: false },
  { id: 'n2', type: 'achievement', message: 'Unlocked: Week Warrior - 7 Day Streak!', time: '1d ago', read: true },
  { id: 'n3', type: 'session', message: 'Session with Aris Thorne starting in 15 mins', time: '15m ago', read: false },
  { id: 'n4', type: 'system', message: 'Your profile is 80% complete. Add your skills to reach 100%.', time: '3d ago', read: true }
];

export const MOCK_MENTORS: Mentor[] = [
  { id: 'm1', name: 'Aris Thorne', avatar: 'https://ui-avatars.com/api/?name=Aris+Thorne', specialty: 'Vector Combat', rating: 4.9, hourlyRate: 50, availability: 'Mon, Wed, Fri' },
  { id: 'm2', name: 'Silas Vane', avatar: 'https://ui-avatars.com/api/?name=Silas+Vane', specialty: 'Fullstack Sorcery', rating: 4.7, hourlyRate: 75, availability: 'Tue, Thu' },
  { id: 'm3', name: 'Elena Frost', avatar: 'https://ui-avatars.com/api/?name=Elena+Frost', specialty: 'UX Alchemy', rating: 4.8, hourlyRate: 60, availability: 'Weekends' }
];

export const MOCK_SESSIONS: Session[] = [
  { id: 's1', mentorName: 'Aris Thorne', mentorAvatar: 'https://ui-avatars.com/api/?name=Aris+Thorne', skill: 'Advanced UI Layouts', date: 'Mar 25, 2026', time: '10:00 AM', duration: '1h', status: 'upcoming' },
  { id: 's2', mentorName: 'Silas Vane', mentorAvatar: 'https://ui-avatars.com/api/?name=Silas+Vane', skill: 'React Design Patterns', date: 'Mar 20, 2026', time: '2:30 PM', duration: '1.5h', status: 'completed' }
];

export const MOCK_CERTIFICATES: Certificate[] = [
  { id: 'c1', skillPath: 'Web Development', completedDate: 'Feb 15, 2026', progress: 100, image: 'https://picsum.photos/seed/cert1/400/300' },
  { id: 'c2', skillPath: 'Digital Art', completedDate: 'Mar 01, 2026', progress: 100, image: 'https://picsum.photos/seed/cert2/400/300' }
];

export const QUESTS: Quest[] = [
  {
    id: '1',
    title: 'Fabric Minecraft Modding Course',
    guildMaster: 'Kaupenjo',
    thumbnail: yt2,
    level: 5,
    xp: 1200,
    category: 'Code',
    progress: 20,
    cost: 0
  },
  {
    id: '2',
    title: 'Complete Python OOPs Oneshot',
    guildMaster: 'BroCode',
    thumbnail: yt3,
    level: 12,
    xp: 2500,
    category: 'Code',
    isFree: true,
    progress: 0,
    cost: 0
  },
  {
    id: '3',
    title: 'Learn Adobe Photoshop',
    guildMaster: 'Bog',
    thumbnail: yt1,
    level: 8,
    xp: 1800,
    category: 'Design',
    progress: 10,
    cost: 500
  },
  {
    id: '4',
    title: 'Learn Basics of Guitar',
    guildMaster: 'Justin Jhonson',
    thumbnail: yt4,
    level: 3,
    xp: 800,
    category: 'Music',
    cost: 200
  },
  {
    id: '5',
    title: 'Learn Complete C Programming in 4 hours',
    guildMaster: 'Free Code Camp',
    thumbnail: yt5,
    level: 2,
    xp: 500,
    category: 'Code',
    isFree: true,
    cost: 0
  }
];

export const GUILD_MASTERS: GuildMaster[] = [
  {
    id: 'gm1',
    name: 'Aris Thorne',
    avatar: 'https://ui-avatars.com/api/?name=Aris+Thorne',
    specialty: 'Vector Combat',
    level: 45,
    apprentices: 12400
  },
  {
    id: 'gm2',
    name: 'Silas Vane',
    avatar: 'https://ui-avatars.com/api/?name=Silas+Vane',
    specialty: 'Fullstack Sorcery',
    level: 52,
    apprentices: 8900
  }
];

export const COMMUNITY_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Cyberpunk Character Concept',
    studentName: 'ZeroOne',
    studentAvatar: 'https://ui-avatars.com/api/?name=Zero+One',
    image: 'https://picsum.photos/seed/cyber/600/400',
    likes: 156
  },
  {
    id: 'p2',
    title: 'Neon City Landscape',
    studentName: 'PixelWiz',
    studentAvatar: 'https://ui-avatars.com/api/?name=Pixel+Wiz',
    image: 'https://picsum.photos/seed/neon/600/400',
    likes: 89
  }
];
