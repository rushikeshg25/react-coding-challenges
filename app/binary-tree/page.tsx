'use client';

const TREE = {
  root: {
    value: 1,
    left: {
      value: 2,
      left: {
        value: 4,
        left: {
          value: 8,
        },
        right: {
          value: 9,
        },
      },
      right: {
        value: 5,
        left: {
          value: 10,
        },
        right: {
          value: 11,
        },
      },
    },
    right: {
      value: 3,
      left: {
        value: 6,
        left: {
          value: 12,
        },
        right: {
          value: 13,
        },
      },
      right: {
        value: 7,
        left: {
          value: 14,
        },
        right: {
          value: 15,
        },
      },
    },
  },
};

interface Node {
  value: number;
  left?: Node;
  right?: Node;
}
const page = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center">
      <Level {...TREE.root} />
    </div>
  );
};
export default page;

const Level = ({ value, left, right }: Node) => {
  return (
    <div className="flex flex-col gap-1">
      {value}
      <div className="flex flex-row gap-5">
        <div className="">
          {left && (
            <Level value={left.value} left={left.left} right={left.right} />
          )}
        </div>
        <div>
          {right && (
            <Level value={right.value} left={right.left} right={right.right} />
          )}
        </div>
      </div>
    </div>
  );
};
