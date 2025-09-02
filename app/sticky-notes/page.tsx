'use client';
const Page = () => {
  const addNote = () => {
    console.log('add note');
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen gap-2">
      <div className=" h-[580px] w-[700px] border border-black">
        <Note data="Note 1" />
      </div>
      <button className="bg-yellow-500 p-2 rounded-xl" onClick={addNote}>
        Add Note
      </button>
    </div>
  );
};

export default Page;

const Note = ({ data }: { data: string }) => {
  return (
    <div className="bg-teal-400 p-2 rounded-xl w-36 h-24 relative">
      <h1 className="text-center text-white">{data}</h1>
      <button className="absolute top-0 right-0 p-1 text-red-500">X</button>
    </div>
  );
};
