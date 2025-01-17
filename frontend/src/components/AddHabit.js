
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function AddHabit() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    return (
        <div>
            <main class="m-5 mt-0 transition-all duration-200 ease-soft-in-out pb-3 ">
                <section class="mb-8 ">

                    {/* main dev */}
                    <div class="relative flex items-start pt-12 pb-12 m-4 overflow-hidden bg-center bg-cover  rounded-xl" >



                        <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-30"></span>
                        <div class="absolute top-8 left-12">
                            <h3 class="text-fuchsia-800">New Habit</h3>
                        </div>
                        {/* <div class="absolute bottom-0 left-10">
                        <img src="./assets/emojis/butterfly.png" alt="Cartoon" className=" w-50 h-50 m-4 transform rotate-12" />
                        </div> */}
                        <div class="container">
                            <div class="flex flex-wrap -mx-3 ">
                                <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                                    <div class="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                        <div class="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                                            <h5>Start Today</h5>
                                        </div>

                                        <div class="flex-auto p-6">
                                            <form role="form">
                                                <label class="mb-2 ml-1 font-bold text-sm text-slate-700">Habit Name</label>
                                                <div class="mb-4">
                                                    <input type="text" class="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Example Exercise ..." />
                                                </div>
                                                <label class="mb-2 ml-1 font-bold text-sm text-slate-700">Description</label>
                                                <div class="mb-4">
                                                    <input type="text" class="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="10 pushups a day ....." />
                                                </div>
                                                <label class="mb-2 ml-1 font-bold text-sm text-slate-700">Set Goal</label>
                                                <div id="date-range-picker" className="mb-4 flex items-center">
                                                    <div className="relative">
                                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>

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

                                                <div class="text-center">
                                                    <button type="button" class="text-white bg-gradient-to-r from-purple-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-100 dark:focus:ring-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-60">Add Habit</button>
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
    )
}
export default AddHabit;