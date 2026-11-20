import React from 'react';

const CARDS = [
  { title: 'Chats', desc: 'Direct messages & live rooms', route: '/chat' },
  { title: 'Community', desc: 'Channels & group spaces', route: '/directory/channels' },
  { title: 'Discover', desc: 'Explore members & topics', route: '/directory/users' },
  { title: 'Profile', desc: 'Account & preferences', route: '/account/profile' },
];

export const YasChatHomeBanner: React.FC = () => {
  const goTo = (route: string) => {
    if (typeof window !== 'undefined' && window.location) {
      window.history.pushState({}, '', route);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section aria-label="YAS CHAT Quick Hub" style={{ margin: '12px 16px', padding: '16px', borderRadius: '12px', background: '#0b1120', color: '#f8fafc', border: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/images/logo/logo.svg" alt="YAS CHAT" style={{ height: '32px', width: 'auto' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '16px' }}>Welcome to YAS CHAT</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Fast rooms, community spaces & discovery</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        {CARDS.map((c) => (
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
