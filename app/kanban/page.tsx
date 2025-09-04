'use client';

import { useState } from 'react';

interface Card {
  id: string;
  content: string;
  priority: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  cards: Card[];
}

const Page = () => {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-red-100 border-red-200',
      cards: [
        { id: '1', content: 'Design user interface mockups', priority: 'high' },
        {
          id: '2',
          content: 'Research competitor analysis',
          priority: 'medium',
        },
        { id: '3', content: 'Set up development environment', priority: 'low' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-yellow-100 border-yellow-200',
      cards: [
        {
          id: '4',
          content: 'Implement authentication system',
          priority: 'high',
        },
        { id: '5', content: 'Create database schema', priority: 'medium' },
      ],
    },

    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-100 border-green-200',
      cards: [
        {
          id: '7',
          content: 'Project planning and requirements',
          priority: 'high',
        },
        { id: '8', content: 'Team onboarding documentation', priority: 'low' },
      ],
    },
  ]);
  const [draggedCard, setDraggedCard] = useState<{
    card: Card;
    sourceColumnId: string;
  } | null>(null);

  const handleDragStart = (e: React.DragEvent, card: Card, id: string) => {
    setDraggedCard({ card, sourceColumnId: id });
  };
  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (!draggedCard) return;
    const { card, sourceColumnId } = draggedCard;
    if (sourceColumnId === columnId) {
      setDraggedCard(null);
      return;
    }
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            cards: column.cards.filter((c) => c.id !== card.id),
          };
        }
        if (column.id === columnId) {
          return {
            ...column,
            cards: [...column.cards, card],
          };
        }
        return column;
      });
      return newColumns;
    });

    setDraggedCard(null);
  };
  const handlerDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const deleteHandler = (card: Card, column: Column) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === column.id) {
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== card.id),
          };
        }
        return col;
      })
    );
  };

  return (
    <div className="h-screen w-screen">
      <div className="max-w-5xl  h-full mx-auto flex flex-col gap-5 items-center">
        <h1 className="text-4xl font-bold">Kanban Board</h1>
        <div className="flex flex-row gap-5  justify-center">
          {columns.map((column) => (
            <div
              className="border border-black flex flex-col gap-2"
              key={column.id}
              onDragOver={handlerDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="border border-black flex flex-row justify-between"
                  draggable
                  onDragStart={(e) => handleDragStart(e, card, column.id)}
                >
                  {card.content}
                  <button
                    className="bg-red-400"
                    onClick={() => deleteHandler(card, column)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
