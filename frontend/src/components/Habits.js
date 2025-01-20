import React, { useState, useEffect } from 'react';
import { AiFillFire } from 'react-icons/ai';

const Habits = ({setHabits, habits}) => {


    function getMilestonePercentage(habit) {
      console.log(habit.streak,habit.goal);
         return Math.min((habit.streak / habit.goal) * 100,100);
         
         
        };

        return (
            <>
              {habits.map((habit) => {
                const milestonePercentage = getMilestonePercentage(habit);
  
                return (
                  milestonePercentage === 100 ? (
                    <div key={habit.id} className="  w-full max-w-full px-6 py-3 lg-max:mt-4 xl:w-3/10">
                      <div className="  relative flex flex-col p-5 px-6 h-full min-w-0 break-words bg-white border-0 shadow-md rounded-2xl bg-clip-border">
                        <div className="pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                          <div className="flex flex-wrap -mx-3">
                            <div className=" flex items-center w-full max-w-full px-8 shrink-0 md:w-8/12 md:flex-none">
                              <h3 className="mb-0 text-slate-700 italic">CONGRATULATIONS</h3>
                            </div>
                           
                          </div>
                        </div>
          
                        <div className="flex-auto">
                          <strong className="px-6 py-2 text-slate-700 text-semibold">
                            You successfully completed
                          </strong>
          
                          <ul className="mt-8 ml-10 flex flex-col pl-0 mb-0 rounded-lg">
                            <li className="relative flex justify-between items-center block px-8 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                              <h4 className="text-slate-700 text-semibold">{habit.name}</h4>
          
                              <img src="./assets/emojis/party.png" alt="img" className="h-20 w-20 absolute -top-6 right-0" />
                            </li>
                            <li className="mr-16 relative flex justify-between items-center block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                              <p className="leading-normal text-sm text-gray-600 italic font-bold">
                                {habit.description}
                              </p>
                            </li>
                            <li className="relative flex justify-start items-center block pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                              <div className="flex-1 flex justify-start items-center">
                                <div className="h-2 w-1/2 bg-gray-200 rounded-full">
                                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "100%" }}></div>
                                </div>
                                <span className="ml-2 text-sm font-bold text-gray-600">100%</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={habit.id} className="w-full max-w-full px-6 py-3 lg-max:mt-4 xl:w-3/10">
                      <div className="relative flex flex-col p-5 px-6 h-full min-w-0 break-words bg-white border-0 shadow-md rounded-2xl bg-clip-border">
                        <div className="pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                          <div className="flex flex-wrap -mx-3">
                            <div className="flex items-center w-full max-w-full px-8 shrink-0 md:w-8/12 md:flex-none">
                              <h4 className="mb-0 text-slate-700">{habit.name}</h4>
                            </div>
                            <div className="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none"></div>
                          </div>
                        </div>
          
                        <div className="flex-auto p-5">
                          <p className="leading-normal text-sm text-gray-600 italic font-bold">
                            {habit.description}
                          </p>
          
                          <hr className="h-px my-3 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent" />
                          <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                            <li className="relative flex justify-between items-center block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                              <strong className="text-slate-700">Streak</strong>
                              <div>
                                <AiFillFire className="h-5 w-5 text-orange-500" />
                                <span className="ml-1 text-sm text-gray-600 font-bold">{habit.streak}</span>
                              </div>
                            </li>
                            <li className="mb-2 mt-2 relative flex justify-between items-center block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                              <strong className="text-slate-700">Acheive Till</strong>
                              <div>
                               
                                
                                <span className="ml-1 text-sm text-gray-600 font-bold">{new Date(habit.enddate).toLocaleDateString()}</span>
                              </div>
                            </li>
                            <li className="relative flex justify-between items-center block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                              <strong className="text-slate-700">Milestone</strong>
                              <div className="flex-1 ml-4 flex justify-end items-center">
                                <div className="h-2 w-1/2 bg-gray-200 rounded-full">
                                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${milestonePercentage}%` }}></div>
                                </div>
                                <span className="ml-2 text-sm font-bold text-gray-600">{milestonePercentage.toFixed(0)}%</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </>
          );
          
    
};

export default Habits;
