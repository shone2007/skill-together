import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Shield, Star, Coins, Flame, Trophy, Zap, Edit2, Settings, Share2, Plus, X } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import PageHeader from '../components/common/PageHeader';
import StatsCard from '../components/common/StatsCard';
import SkillBadge from '../components/common/SkillBadge';
import { updateProfileSkills } from '../services/authService';

export default function ProfilePage() {
  const { user, login } = useApp();
  const [isAddingTeach, setIsAddingTeach] = useState(false);
  const [isAddingLearn, setIsAddingLearn] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSkill = async (type: 'teach' | 'learn') => {
    if (!newSkill.trim()) {
      type === 'teach' ? setIsAddingTeach(false) : setIsAddingLearn(false);
      return;
    }
    setLoading(true);
    try {
      const updatedData = {
        skillsToTeach: type === 'teach' ? [...user.skillsToTeach, newSkill] : user.skillsToTeach,
        skillsToLearn: type === 'learn' ? [...user.skillsToLearn, newSkill] : user.skillsToLearn
      };

      const newAuthUser = await updateProfileSkills(updatedData);
      login(newAuthUser); // Update context

      setNewSkill('');
      setIsAddingTeach(false);
      setIsAddingLearn(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const removeSkill = async (skill: string, type: 'teach' | 'learn') => {
    setLoading(true);
    try {
      const updatedData = {
        skillsToTeach: type === 'teach' ? user.skillsToTeach.filter(s => s !== skill) : user.skillsToTeach,
        skillsToLearn: type === 'learn' ? user.skillsToLearn.filter(s => s !== skill) : user.skillsToLearn
      };
      const newAuthUser = await updateProfileSkills(updatedData);
      login(newAuthUser);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        icon={User}
        title="Adventurer Profile"
        subtitle="Manage your skills, track your progress, and build your exchange portfolio"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="duo-card p-8 text-center shadow-[0_8px_0_var(--border-color)]">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl border-4 border-duo-blue p-1 shadow-[0_6px_0_#1899d6] bg-white mx-auto">
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl bg-quest-card" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-duo-blue text-white w-10 h-10 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                <Shield className="w-5 h-5" />
              </div>
            </div>

            <h2 className="text-2xl font-black mb-1">{user.name}</h2>
            <p className="text-sm font-black text-quest-muted uppercase tracking-widest mb-6">{user.rank}</p>

            <div className="flex gap-2 justify-center mb-8">
              <button className="flex-1 duo-button duo-button-blue py-3 text-xs flex items-center justify-center gap-2">
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button className="p-3 duo-card hover:bg-quest-border transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-3 duo-card hover:bg-quest-border transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span className="text-quest-muted">Level {user.level} Progress</span>
                  <span className="text-duo-blue">{user.xp}/{user.maxXp} XP</span>
                </div>
                <div className="xp-bar-container h-3">
                  <div className="xp-bar-fill" style={{ width: `${(user.xp / user.maxXp) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="duo-card p-6 shadow-[0_4px_0_var(--border-color)]">
            <h3 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <Star className="text-duo-blue w-5 h-5" /> Rating & Reputation
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-duo-blue flex items-center gap-2">
                  {user.rating} <Star className="w-5 h-5 fill-duo-blue" />
                </div>
                <div className="text-[10px] font-black text-quest-muted uppercase">Student Rating</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-duo-blue">98%</div>
                <div className="text-[10px] font-black text-quest-muted uppercase">Exchange Success</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatsCard icon={Flame} value={`${user.streak} Days`} label="Current Streak" />
            <StatsCard icon={Coins} value={user.coins.toLocaleString()} label="Coin Balance" color="text-duo-blue" />
            <StatsCard icon={Zap} value={user.xp.toLocaleString()} label="Lifetime XP" />
            <StatsCard icon={Trophy} value="12" label="Trophies Earned" />
          </div>

          <div className="duo-card p-8 shadow-[0_4px_0_var(--border-color)]">
            <h3 className="text-xl font-black mb-8">Skills to Teach</h3>
            <div className="flex flex-wrap gap-3 mb-12 items-center">
              {user.skillsToTeach?.map(skill => (
                <div key={skill} className="relative group">
                  <SkillBadge skill={skill} variant="teach" />
                  <button onClick={() => removeSkill(skill, 'teach')} disabled={loading} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {isAddingTeach ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    placeholder="E.g. React.js"
                    className="px-3 py-1 bg-white/10 border-2 border-duo-blue rounded-xl text-sm focus:outline-none"
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && handleAddSkill('teach')}
                  />
                  <button onClick={() => handleAddSkill('teach')} disabled={loading} className="p-2 bg-duo-blue text-white rounded-xl hover:bg-sky-400">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsAddingTeach(false)} className="p-2 bg-gray-600 text-white rounded-xl">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingTeach(true)}
                  disabled={loading}
                  className="px-4 py-2 border-2 border-dashed border-quest-border rounded-xl text-xs font-black text-quest-muted hover:border-duo-blue hover:text-duo-blue transition-all"
                >
                  + Add Skill
                </button>
              )}
            </div>

            <h3 className="text-xl font-black mb-8">Skills to Learn</h3>
            <div className="flex flex-wrap gap-3 items-center">
              {user.skillsToLearn?.map(skill => (
                <div key={skill} className="relative group">
                  <SkillBadge skill={skill} variant="learn" />
                  <button onClick={() => removeSkill(skill, 'learn')} disabled={loading} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {isAddingLearn ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    placeholder="E.g. Piano"
                    className="px-3 py-1 bg-white/10 border-2 border-green-500 rounded-xl text-sm focus:outline-none"
                    autoFocus
                    onKeyDown={e => e.key === 'Enter' && handleAddSkill('learn')}
                  />
                  <button onClick={() => handleAddSkill('learn')} disabled={loading} className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-400">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsAddingLearn(false)} className="p-2 bg-gray-600 text-white rounded-xl">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingLearn(true)}
                  disabled={loading}
                  className="px-4 py-2 border-2 border-dashed border-quest-border rounded-xl text-xs font-black text-quest-muted hover:border-green-500 hover:text-green-500 transition-all"
                >
                  + Add Skill
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
