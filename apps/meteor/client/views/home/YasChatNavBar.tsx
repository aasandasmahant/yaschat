import React, { useState } from 'react';

export type YasChatTab = 'Home' | 'Chats' | 'Community' | 'Discover' | 'Profile';

const TABS: { key: YasChatTab; label: string; route: string }[] = [
  { key: 'Home', label: 'Home', route: '/home' },
  { key: 'Chats', label: 'Chats', route: '/chat' },
  { key: 'Community', label: 'Community', route: '/directory/channels' },
  { key: 'Discover', label: 'Discover', route: '/directory/users' },
  { key: 'Profile', label: 'Profile', route: '/account/profile' },
];

export const YasChatNavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<YasChatTab>('Home');

  const handleSelect = (tab: YasChatTab, route: string) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined' && window.location) {
      window.history.pushState({}, '', route);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <nav aria-label="YAS CHAT Navigation" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '10px 16px', background: '#0b1120', color: '#f8fafc', borderBottom: '1px solid #1e293b' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
        <img src="/images/logo/logo.svg" alt="YAS CHAT" style={{ height: '28px', width: 'auto' }} />
        <span>YAS CHAT</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {TABS.map((t) => {
          const selected = activeTab === t.key;
          return (
            <button key={t.key} type="button" onClick={() => handleSelect(t.key, t.route)} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #334155', background: selected ? '#0284c7' : '#1e293b', color: '#f8fafc', cursor: 'pointer', fontWeight: selected ? 700 : 500 }}>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default YasChatNavBar;
