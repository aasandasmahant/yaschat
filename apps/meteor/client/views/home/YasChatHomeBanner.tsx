import React, { useState } from 'react';

type HubCategory = 'All' | 'Rooms' | 'Explore' | 'Account';

const CARDS: { title: string; desc: string; route: string; category: Exclude<HubCategory, 'All'> }[] = [
  { title: 'Chats', desc: 'Direct messages & live rooms', route: '/chat', category: 'Rooms' },
  { title: 'Community', desc: 'Channels & group spaces', route: '/directory/channels', category: 'Rooms' },
  { title: 'Discover', desc: 'Explore members & topics', route: '/directory/users', category: 'Explore' },
  { title: 'Profile', desc: 'Account & preferences', route: '/account/profile', category: 'Account' },
];

const CATEGORIES: HubCategory[] = ['All', 'Rooms', 'Explore', 'Account'];

export const YasChatHomeBanner: React.FC = () => {
  const [filter, setFilter] = useState<HubCategory>('All');

  const goTo = (route: string) => {
    if (typeof window !== 'undefined' && window.location) {
      window.history.pushState({}, '', route);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const visibleCards = filter === 'All' ? CARDS : CARDS.filter((c) => c.category === filter);

  return (
    <section aria-label="YAS CHAT Quick Hub" style={{ margin: '12px 16px', padding: '16px', borderRadius: '12px', background: '#0b1120', color: '#f8fafc', border: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/images/logo/logo.svg" alt="YAS CHAT" style={{ height: '32px', width: 'auto' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '16px' }}>Welcome to YAS CHAT</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Fast rooms, community spaces & discovery</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button key={cat} type="button" onClick={() => setFilter(cat)} style={{ padding: '4px 10px', borderRadius: '999px', border: '1px solid #334155', background: active ? '#0284c7' : '#111827', color: '#f8fafc', fontSize: '12px', cursor: 'pointer', fontWeight: active ? 700 : 500 }}>
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        {visibleCards.map((c) => (
          <button key={c.title} type="button" onClick={() => goTo(c.route)} style={{ textAlign: 'left', padding: '12px', borderRadius: '10px', border: '1px solid #334155', background: '#111827', color: '#f8fafc', cursor: 'pointer' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{c.title}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{c.desc}</div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default YasChatHomeBanner;
