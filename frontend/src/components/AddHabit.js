import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Import axios for API calls

function AddHabit({ addNewHabit }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const calculateDaysInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDifference = end - start-1;
        return timeDifference / (1000 * 3600 * 24); // returns days
      };


    const handleAddHabit = async () => {
        // Validate inputs
        if (!name || !description || !startDate || !endDate) {
            setMessage("All fields are required.");
            return;
        }
       
        // API call to create a habit
        try {
            // console.log(startDate);
            let startdate=startDate.toUTCString()
            let enddate=endDate.toUTCString()
           
            let goal =calculateDaysInRange(startdate, enddate).toFixed(0);
            let streak=0;
            const response = await axios.post('http://127.0.0.1:5000/habits', {
                name,
                description,
                startdate: startDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                enddate: endDate.toISOString().split('T')[0],
                goal: goal,
            });
            setMessage(response.data.message || "Habit added successfully!");
            // Clear form after successful submission
            setName('');
            setDescription('');
            setStartDate(null);
            setEndDate(null);

            addNewHabit({ name, description, startdate, enddate, goal,streak });
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <main className="m-5 transition-all duration-200 ease-soft-in-out pb-3 mt-16">
                <section>
                    <div className="relative flex items-start pt-12 pb-12 m-4 overflow-hidden bg-center bg-cover rounded-xl">
                        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-30"></span>
                        <div className="absolute top-8 left-12">
                            <h3 className="text-fuchsia-800">New Habit</h3>
                        </div>
                    
                        <div className="container">
                            <div className="flex flex-wrap -mx-3">
                                <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                        <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                                            <h5>Start Today</h5>
                                        </div>
                                        <div className="text-center bg-white border-b-0 rounded-t-2xl">
                                        {message && <h3 className="text-sm text-rose-300 ">{message}</h3>}
                                        </div>
                                
                                        <div className="flex-auto p-6">
                                            <form role="form" onSubmit={(e) => e.preventDefault()}>
                                                <label className="mb-2 ml-1 font-bold text-sm text-slate-700">Habit Name</label>
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                        placeholder="Example Exercise ..."
                                                    />
                                                </div>
                                                <label className="mb-2 ml-1 font-bold text-sm text-slate-700">Description</label>
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                        placeholder="10 pushups a day ....."
                                                    />
                                                </div>
                                                <label className="mb-2 ml-1 font-bold text-sm text-slate-700">Set Goal</label>
                                                <div id="date-range-picker" className="mb-4 flex items-center">
                                                    <div className="relative">
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                            selectsStart
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            placeholderText="Select start date"
                                                            className="ps-10 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                        />
                                                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span className="mx-4 text-gray-500">to</span>
                                                    <div className="relative">
                                                        <DatePicker
                                                            selected={endDate}
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}
                                                            placeholderText="Select end date"
                                                            className="ps-10 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                                        />
                                                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                               

                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={handleAddHabit}
                                                        className="text-white bg-gradient-to-r from-purple-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-100 dark:focus:ring-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-60"
                                                    >
                                                        Add Habit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AddHabit;
