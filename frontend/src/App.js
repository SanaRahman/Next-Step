import './App.css';
import { BsStars } from "react-icons/bs";
import Habits from './components/Habits';
import NewHabit from './components/NewHabit';
import Header from './components/Header';
import HabitTracker from './components/HabitTracker';
import AddHabit from './components/AddHabit';
import React, { useRef } from 'react';
function App() {
  const addHabitRef = useRef(null);
  const scrollToAddHabit = () => {
    if (addHabitRef.current) {
      addHabitRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className=" bg-gray-50 h-full max-h-screen mb-6">
      <div className="ease-soft-in-out  relative h-full max-h-screen bg-gray-50 transition-all duration-200 m-6">
        <nav className="absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2  text-white transition-all shadow-none duration-250 ease-soft-in lg:flex-nowrap lg:justify-start" >
          <div className="flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit">
          </div>
        </nav>

        {/* --------------------------------Header */}
        <Header />
        {/* --------------------------------End Header */}

        <HabitTracker onAddHabitClick={scrollToAddHabit} />


        {/* --------------------------------- habits Section */}

        <div class="flex-none w-1/8 max-w-full px-3 mt-6 m-5 relative">
          <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-lg rounded-2xl bg-clip-border">
            <div class="p-4 pb-0 mb-0 bg-white rounded-t-2xl flex items-center">
              <h3 class="pl-8 text-fuchsia-800">Habits</h3>
              <BsStars className="text-yellow-500 ml-2" size={40} />
            </div>
            <div class="w-full px-8 pb-6 mx-auto">
              <div class="flex flex-wrap mx-3">
                <Habits />
                <NewHabit onNewHabitClick={scrollToAddHabit} />
              </div>
            </div>

            <img src="./assets/emojis/butterfly.png" alt="Cartoon" className="absolute bottom-0 right-0 w-24 h-24 m-4 transform -rotate-12" />
          </div>
        </div>

        {/* ----------------------------------------end of habits */}

        <div ref={addHabitRef}>
          <AddHabit />
        </div>
      </div>
    </div>
  );
}

export default App;
