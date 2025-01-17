import React from 'react';
import { AiFillFire } from 'react-icons/ai';

const Header = () => {
  return (
    <div class="w-full px-6 mx-auto">
      <div class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-60 rounded-2xl" style={{ backgroundImage: "url('../assets/img/curved-images/curved0.jpg')", backgroundPositionY: "50%", }}>
        <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
        <div class="flex-none w-auto max-w-full px-3  my-auto">
          <div class="h-full flex items-center px-6">
            <span><img src="./assets/emojis/flower.png" alt="Cartoon" className="mb-4 w-30 h-30 opacity-200" /></span>

            <h1 class="  px-2 text-6xl">
              <span class="text-rose-700">N</span>ext
            </h1>
            <h1 class="px-2 text-6xl">
              <span class="text-rose-700">S</span>tep.
            </h1>
          </div>
        </div>

        <div class="absolute bottom-20 right-0 p-2 bg-pink-500 rounded-tl-xl rounded-bl-2xl opacity-90">
          <h5 class="text-white">We help you achieve your dreams</h5>
        </div>

      </div>

      {/* Bottom name and streak */}
      <div class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
        <div class="flex flex-wrap -mx-3">

          <div class="flex-none w-auto max-w-full px-3 my-auto">
            <div class="h-full">
              <p class="mb-0 font-semibold leading-normal  text-slate-600 ">Welcome</p>
              <h5 class="mb-1 text-fuchsia-800">UserName</h5>

            </div>
          </div>
          {/* streak and milestone on nav bar*/}
          <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
            <div class="relative right-0">
              <ul class="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl" nav-pills role="tablist">
                {/* streak */}
                <li class=" ml-80 flex justify-between ">
                  {/* <a class="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700" nav-link active href="javascript:;" role="tab" aria-selected="true"> */}
                  <strong className="text-slate-700 mr-1">Streak</strong>
                  <div>
                    <AiFillFire className="h-5 w-5 text-orange-500" />
                    <span className="ml-3 align-center text-md text-gray-600 font-bold">5</span>
                  </div>
                  {/* </a> */}
                </li>
                {/* <li className="relative flex justify-between items-center block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                                              <strong className="text-slate-700">Streak</strong>
                                              <div>
                                                <AiFillFire className="h-5 w-5 text-orange-500" />
                                                <span className="ml-1 text-sm text-gray-600 font-bold">{habit.streak}</span>
                                              </div>
                                            </li> */}
                {/* MileStone */}
                {/* <li class="z-30 flex-auto text-center">
                  <a class="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700" nav-link href="javascript:;" role="tab" aria-selected="false">
                    <span class="ml-1">MileStone</span>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;