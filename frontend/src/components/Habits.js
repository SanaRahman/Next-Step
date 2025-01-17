import React from 'react';
import { AiFillFire } from 'react-icons/ai';


const Habits = ({ title, streak, milestoneProgress, progressBarColor }) => {
    return (
        <div class="w-full max-w-full px-6 py-3 lg-max:mt-6 xl:w-3/10">
            <div class="relative flex flex-col px-4 h-full min-w-0 break-words bg-white border-0 shadow-md rounded-2xl bg-clip-border">

                <div class="p-2 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                    <div class="flex flex-wrap -mx-3">
                        <div class="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                            <h4 class="mb-0 text-slate-700">{title}</h4>
                        </div>
                        <div class="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                        </div>
                    </div>
                </div>

                <div class="flex-auto p-4">
                    <p class="leading-normal text-sm text-gray-600 italic font-bold">"Success doesn’t come from what you do occasionally; it comes from what you do consistently. Every step forward, no matter how small, brings you closer to your goal."</p>
                    <hr class="h-px my-3 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent" />
                    <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                        <li class="relative flex justify-between items-center block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                            <strong class="text-slate-700">Streak</strong>
                            <div><AiFillFire className="h-5 w-5 text-yellow-500" /><span class="ml-1 text-sm text-gray-600 font-bold">{streak}</span> </div>
                        </li>
                        <li className="relative flex justify-between items-center block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                            <strong className="text-slate-700">MileStone</strong>
                            <div className="flex-1 ml-4 flex justify-end items-center">
                                <div className="h-2 w-1/2 bg-gray-200 rounded-full">
                                    <div
                                        className={`h-2 ${progressBarColor} rounded-full`}
                                        style={{ width: `${milestoneProgress}%` }}
                                    ></div>
                                </div>
                                <span className="ml-2 text-sm font-bold text-gray-600">{milestoneProgress}%</span>
                            </div>
                        </li>
                    </ul>

                    <div class="flex justify-between mt-4">
                        <button type="button" class="inline-block w-1/3 px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500">
                            Edit
                        </button>
                        <button type="button" class="inline-block w-1/3.5 px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500">
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Habits;