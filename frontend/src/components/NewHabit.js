import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NewHabit = ({onNewHabitClick}) => {
  return (
    <div class="w-full max-w-full px-6 py-3 lg-max:mt-6 xl:w-3/10">
    <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-md rounded-2xl bg-clip-border">
      <div class="flex flex-col justify-center flex-auto p-6 text-center">
         <Link onClick={onNewHabitClick}>
          <h4 className="mb-0 text-fuchsia-800">New Habit</h4>
          <AiOutlinePlus className="mb-4 text-fuchsia-800 opacity-70" size={48} />
        </Link>
      </div>
    </div>
  </div>
  );
};

export default NewHabit;