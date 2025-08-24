'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const FILES = {
  items: [
    {
      name: 'file1.txt',
      items: [
        {
          name: 'file2.txt',
          items: [
            {
              name: 'file3.txt',
              items: [
                {
                  name: 'folder1',
                  items: [{ name: 'file4.txt' }, { name: 'file5.txt' }],
                },
                {
                  name: 'folder2',
                  items: [{ name: 'file6.txt' }, { name: 'file7.txt' }],
                },
              ],
            },
            { name: 'file4.txt' },
            { name: 'file5.txt' },
          ],
        },
        {
          name: 'file3.txt',
          children: [
            {
              name: 'folder1',
              children: [{ name: 'file4.txt' }, { name: 'file5.txt' }],
            },
          ],
        },
      ],
    },
  ],
};

type LevelT = {
  name: string;
  items?: LevelT[];
};

const Page = () => {
  return (
    <div>
      <Level name="root" items={FILES.items} />
    </div>
  );
};
export default Page;

const Level = ({ name, items }: LevelT) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <button onClick={() => setIsOpen(!isOpen)}>
          {items && (!isOpen ? <ChevronRight /> : <ChevronDown />)}
        </button>
        {name}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 pl-2">
          {items?.map((item, index) => {
            return (
              <div key={index}>
                <Level name={item.name} items={item.items} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
