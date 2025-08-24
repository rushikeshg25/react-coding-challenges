'use client';
import Interests from '@/components/tab-form/interests';
import Profile from '@/components/tab-form/profile';
import Settings from '@/components/tab-form/settings';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const TABS = [
  {
    type: 'profile',
    component: <Profile />,
  },
  {
    type: 'interests',
    component: <Interests />,
  },
  {
    type: 'settings',
    component: <Settings />,
  },
];

const Page = () => {
  const [currentTab, setCurrentTab] = useState<string>('profile');
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        {TABS.map((tab, index) => {
          return (
            <div
              onClick={() => setCurrentTab(tab.type)}
              key={index}
              className={cn(
                'cursor-pointer',
                currentTab === tab.type && 'text-blue-500'
              )}
            >
              {tab.type}
            </div>
          );
        })}
      </div>
      <div>{TABS.find((tab) => tab.type === currentTab)?.component}</div>
    </div>
  );
};

export default Page;
