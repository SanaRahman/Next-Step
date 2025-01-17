import React, { useState } from "react";


// Utility to get the number of days in a month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const HabitTracker = () => {
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
    <div class="flex w-1/8 max-w-full px-3 mt-6 m-5 ">
      <div class=" min-w-0 mb-6 break-words bg-white border-0 shadow-lg rounded-2xl bg-clip-border">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
          Habit Tracker
        </h1>

        {/* Navigation (Month & Yearly Button) */}
        <div className="flex justify-between items-center mb-4 w-full max-w-xl text-center ">
          <button
            onClick={() => handleMonthChange("prev")}
            className="text-purple-800 hover:text-purple-600"
          >
            &lt; Previous
          </button>
          <span className=" text-purple-800">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => handleMonthChange("next")}
            className="text-purple-800 hover:text-purple-600"
          >
            Next &gt;
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-hidden items-center w-full max-w-full rounded-lg shadow-lg">
          <table className="table-auto w-full text-left  border border-gray-200 text-xs md:text-sm">
            {/* Table Header */}
            <thead className="bg-purple-100 text-purple-900">
              <tr>
                <th className="p-2 border border-gray-200">Habits</th>
                {[...Array(daysInMonth)].map((_, i) => (
                  <th
                    key={i}
                    className="p-2 border border-gray-200 text-center hidden md:table-cell w-10 h-10 rounded-lg"
                  >
                    {i + 1}
                  </th>
                ))}
                <th className="p-2 border border-gray-200">Goal</th>
                <th className="p-2 border border-gray-200">Achieved</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {habits.map((habit, index) => (
                <tr key={index} className="even:bg-purple-50">
                  <td className="p-2 text-center font-medium">{habit.name}</td>
                  {[...Array(daysInMonth)].map((_, day) => (
                    <td
                      key={day}
                      className={`w-6 h-1/2 text-center  rounded-md m-7 ${ // Apply 5% rounded corners
                        day === 16
                          ? "bg-purple-400 text-white"
                          : "bg-slate-100"
                        }`}
                      style={{ width: "32px", height: "30px" }}// Added margin for spacing between cells
                    >
                      {day === 16 ? "✓" : ""}
                    </td>
                  ))}
                  <td className="p-2 text-center">{habit.goal}</td>
                  <td className="p-2 text-center">{habit.achieved}</td>
                </tr>
              ))}
            </tbody>





          </table>
        </div>

        {/* Add Habit Button */}
        <div className="mt-4 text-center">
          <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700">
            + Add Habit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
