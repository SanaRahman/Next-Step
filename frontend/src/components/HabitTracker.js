import React, { useState, useEffect } from "react";
import axios from "axios";

// Utility to calculate the number of days between two dates
const calculateDaysInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start;
  return timeDifference / (1000 * 3600 * 24); // returns days
};

const HabitTracker = ({ habits, setHabits, onAddHabitClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // State to track checked days for each habit (a map of habit id to an array of checked days)
  const [checkedDays, setCheckedDays] = useState({});

  // Fetch habits from the API
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/habits")
      .then((response) => {
        setHabits(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching habits:", error);
      });
  }, []);

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

  useEffect(() => {
    const fetchCheckedDays = async () => {
      try {
        // Loop through all habits and fetch their checked days
        for (let habit of habits) {
          const response = await axios.get('http://127.0.0.1:5000/habit_entries/check', {
            params: { habit_id: habit.id }, // Send habit_id as a query parameter
          });
  
          const { entries } = response.data;
  
          // Convert dates into YYYY-MM-DD format before saving to checkedDays
          const habitDates = entries
            .filter((entry) => entry.checked)
            .map((entry) => {
              const date = new Date(entry.date);
              // Convert to YYYY-MM-DD format
              const formattedDate = date.toISOString().split('T')[0];
              return formattedDate;
            });
  
          setCheckedDays((prev) => ({
            ...prev,
            [habit.id]: habitDates, // Store checked days for this habitId
          }));
        }
      } catch (error) {
        console.error('Error fetching habit entries:', error.response?.data || error.message);
      }
    };
  
    if (habits && habits.length) {
      // fetchCheckedDays();
    }
  }, []);
  

  const toggleCheckmark = (habitId, day) => {
    const currentDate = new Date(currentYear, currentMonth, day);
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    setCheckedDays((prev) => {
      const habitDates = prev[habitId] || [];
      const dateIndex = habitDates.indexOf(formattedDate);
  
      if (dateIndex === -1) {
        // Add the date if not already present
        // sendToDatabase(habitId, formattedDate, true);
        return {
          ...prev,
          [habitId]: [...habitDates, formattedDate],
        };
      } else {
        // Remove the date if it's already present
        // sendToDatabase(habitId, formattedDate, false);
        return {
          ...prev,
          [habitId]: habitDates.filter((date) => date !== formattedDate),
        };
      }
    });

  };
  const sendToDatabase = async (habitId, date, isChecked) => {
    try {
      // Send a POST request to the backend
      const response = await axios.post('http://127.0.0.1:5000/habit_entries', {
        habit_id: habitId,
        date: date, // Pass the date as a string in YYYY-MM-DD format
        checked: isChecked, // Boolean: true or false
      });
  
      // Log success message from the backend
      console.log(response.data.message);
    } catch (error) {
      // Log any errors that occur
      if (error.response) {
        console.error('Error:', error.response.data.error || error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };
  // Calculate the number of checked days for a habit
  const getAchievedCount = (habitId) => {
    return checkedDays[habitId] ? checkedDays[habitId].length : 0;

  };
  const updateHabitStreak = () => {
    const updatedHabits = habits.map((habit) => {
      const streak = checkedDays[habit.id] ? checkedDays[habit.id].length : 0; // Streak is simply the count of checked days
      return { ...habit, streak }; // Update the habit with the new streak count
    });
  
    setHabits(updatedHabits); // Update the state with the new streak values
  };
  
  // Example usage to update the streak when checked days change
  useEffect(() => {
    updateHabitStreak(); // Recalculate streak when checkedDays or habits change
  }, [checkedDays]);

  return (
    <div className="flex max-w-full min-h-[50vh] px-3 m-5 mt-16">
      <div className="min-w-0 mb-6 break-words bg-white border-0 shadow-lg rounded-2xl bg-clip-border">
        {/* Heading */}
        <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl flex items-center justify-between">
          <h3 className="pl-8 p-5 text-fuchsia-800">Habit Tracker</h3>
          <button
            onClick={onAddHabitClick}
            className="text-white bg-gradient-to-r from-purple-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-100 dark:focus:ring-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-60 mr-10"
          >
            + Add Habit
          </button>
        </div>

        {/* Navigation (Month & Yearly Button) */}
        <div className="flex justify-center items-center mb-4 w-full text-center">
          <button
            onClick={() => handleMonthChange("prev")}
            className="mb-1 ml-1 font-bold text-slate-600 hover:text-slate-700"
          >
            &lt; Previous
          </button>
          <span className="ml-40 mr-40 mb-1 font-bold text-slate-700 italic">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => handleMonthChange("next")}
            className="mb-1 ml-1 font-bold text-slate-600 hover:text-slate-700"
          >
            Next &gt;
          </button>
        </div>

        {/* Habit Table */}
        <div className="overflow-hidden items-center w-full max-w-full rounded-lg pl-12 pr-12 rounded-lg" style={{ paddingBottom: "50px" }}>
          <table className="table-auto w-full text-left text-xs rounded-lg">
            {/* Table Header */}
            <thead className="bg-purple-100 text-purple-900 rounded-lg">
              <tr className="pb-2">
                <th className="px-2 m-3 rounded-lg" style={{ fontSize: "14px" }}>Habits</th>
                {[...Array(31)].map((_, i) => (
                  <th
                    key={i}
                    className="border border-gray-200 text-center hidden md:table-cell w-10 h-8 rounded-lg"
                    style={{ border: "2px solid white" }}
                  >
                    {i + 1}
                  </th>
                ))}
                <th className="px-3 py-1 border border-gray-200 rounded-lg bg-indigo-100" style={{ fontSize: "14px", border: "2px solid white" }}>
                  Goal
                </th>
                <th className="px-3 py-1 border border-gray-200 rounded-lg bg-green-100" style={{ fontSize: "14px", border: "2px solid white" }}>
                  Achieved
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {habits.map((habit) => {
                const habitStartDate = new Date(habit.startdate);
                const habitEndDate = new Date(habit.enddate);
                const daysInRange = calculateDaysInRange(habit.startdate, habit.enddate);
                const currentMonthStart = new Date(currentYear, currentMonth, 1);
                const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);

                return (
                  <tr key={habit.id}>
                    <td className="text-center text-slate-700 font-bold" style={{ fontSize: "13px" }}>{habit.name}</td>

                    {/* Render boxes for each day */}
                    {[...Array(31)].map((_, index) => {
                      const currentDate = new Date(currentYear, currentMonth, index + 1);

                      // If the current date is within the habit's range and in the current month
                      const isWithinRange =
                        currentDate >= habitStartDate &&
                        currentDate <= habitEndDate &&
                        currentDate.getFullYear() === habitStartDate.getFullYear();

                      const isInCurrentMonth =
                        currentDate.getMonth() === currentMonth &&
                        currentDate.getFullYear() === currentYear;

                      const isChecked = checkedDays[habit.id] && checkedDays[habit.id].includes(index + 1);

                      return (
                        <td
                          key={index}
                          onClick={() => {
                            if (isWithinRange && isInCurrentMonth) {
                              toggleCheckmark(habit.id, index + 1);
                            }
                          }}
                          className={`w-8 h-8 text-center rounded-lg ${isInCurrentMonth && isWithinRange
                            ? checkedDays[habit.id]?.includes(
                              new Date(currentYear, currentMonth, index + 1).toISOString().split('T')[0]
                            )
                              ? "bg-gradient-to-b from-rose-400 to-fuchsia-600 text-white cursor-pointer opacity-70"
                              : "bg-gradient-to-b from-rose-400 to-fuchsia-600 text-white opacity-70"
                            : "bg-black opacity-10"
                            }`}
                          style={{ width: "20px", height: "30px", border: "2px solid white" }}
                        >
                          {
                            checkedDays[habit.id]?.includes(
                              new Date(currentYear, currentMonth, index + 1).toISOString().split('T')[0]
                            ) && "✓"
                          }
                        </td>
                      );
                    })}

                    {/* Display the Number of Days */}
                    <td className="text-center text-slate-700 font-bold bg-indigo-100 rounded-lg" style={{ fontSize: "13px", border: "2px solid white" }}>
                      {habit.goal} {/* Include the start date */}
                    </td>

                    {/* Display the Achieved Count */}
                    <td className="text-center text-slate-700 font-bold bg-green-100 rounded-lg" style={{ fontSize: "13px", border: "2px solid white" }}>
                      {habit.streak}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
