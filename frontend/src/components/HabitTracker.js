import React, { useState } from "react";


// Utility to get the number of days in a month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const HabitTracker = ({ onAddHabitClick }) => {
  // State to manage the selected month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Mock habit data
  const habits = [
    { name: "Exercise", goal: 20, achieved: 15 },
    { name: "Walking", goal: 15, achieved: 12 },
  ];

  // Get the number of days in the current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // Handle month switching
  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <div class=" flex max-w-full min-h-[50vh] px-3  m-5 mt-16 ">
      <div class=" min-w-0 mb-6 break-words bg-white border-0 shadow-lg rounded-2xl bg-clip-border">
        {/* Heading */}
        <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl flex items-center justify-between">
          <h3 className="pl-8 p-5 text-fuchsia-800">Habit Tracker</h3>
          {/* Add Habit Button positioned at the top right */}
          <button onClick={onAddHabitClick} className="text-white bg-gradient-to-r from-purple-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-100 dark:focus:ring-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-60 mr-10">
            + Add Habit
          </button>
        </div>

        {/* Navigation (Month & Yearly Button) */}
        <div className="flex justify-center items-center mb-4 w-full text-center">
          <button
            onClick={() => handleMonthChange("prev")}
            className="mb-1 ml-1 font-bold  text-slate-600 hover:text-slate-700"
          >
            &lt; Previous
          </button>
          <span className="ml-40 mr-40 mb-1 font-bold  text-slate-700 italic">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => handleMonthChange("next")}
            className=" mb-1 ml-1 font-bold  text-slate-600 hover:text-slate-700"
          >
            Next &gt;
          </button>
        </div >
        {/* Responsive Table */}
        <div className=" overflow-hidden items-center w-full max-w-full rounded-lg pl-12 pr-12 rounded-lg" style={{ paddingBottom: "50px" }}>
          <table className="table-auto w-full text-left text-xs rounded-lg " >
            {/* Table Header */}
            <thead className="bg-purple-100 text-purple-900 rounded-lg " >
              <tr className="pb-2" >
                <th className="px-2 m-3 rounded-lg " style={{ fontSize: "14px" }}>Habits</th>
                {[...Array(daysInMonth)].map((_, i) => (
                  <th
                    key={i}
                    className=" border border-gray-200 text-center hidden md:table-cell w-10 h-8 rounded-lg"
                    rounded-lg style={{ border: "2px solid white" }}
                  >
                    {i + 1}
                  </th>
                ))}
                <th className="px-3 py-1 border border-gray-200 rounded-lg " style={{ fontSize: "14px", border: "2px solid white" }}>Goal</th>
                <th className="px-3 py-1 border border-gray-200 rounded-lg" style={{ fontSize: "14px", border: "2px solid white" }}>Achieved</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody >
              {habits.map((habit, index) => (
                <tr key={index}>
                  <td className="text-center text-slate-700 font-bold" style={{ fontSize: "13px" }}>{habit.name}</td>
                  {[...Array(daysInMonth)].map((_, day) => (
                    <td
                      key={day}
                      className={`w-8 h-1/2 text-center rounded-lg ${ // Apply 5% rounded corners
                        day === 16
                          ? "bg-purple-700 text-white opacity-50"
                          : "bg-slate-100"
                        }`}
                      style={{ width: "20px", height: "30px", border: "2px solid white" }}// Added margin for spacing between cells
                    >
                      {day === 16 ? "✓" : ""}
                    </td>
                  ))}
                  <td className="text-center text-slate-700 text-md font-bold">{habit.goal}</td>
                  <td className="text-center text-slate-700 text-md font-bold">{habit.achieved}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default HabitTracker;
