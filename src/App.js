import './App.css';
import { Link } from 'react-router-dom';
import { AiFillFire, AiOutlinePlus } from 'react-icons/ai';
import { BsStars } from "react-icons/bs";
function App() {

  const milestoneProgress = 30; // Example milestone progress (60%)
  // Determine the color of the progress bar based on the percentage
  const progressBarColor = milestoneProgress <= 20
    ? 'bg-red-500'
    : milestoneProgress <= 40
      ? 'bg-orange-500'
      : milestoneProgress <= 60
        ? 'bg-yellow-500'
        : milestoneProgress <= 80
          ? 'bg-blue-500'
          : 'bg-green-500';
  return (
    <div className=" bg-gray-50">
      <div className="ease-soft-in-out  relative h-full max-h-screen bg-gray-50 transition-all duration-200 m-6">
        <nav className="absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2  text-white transition-all shadow-none duration-250 ease-soft-in lg:flex-nowrap lg:justify-start" >
          <div className="flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit">

            <nav>
              {/* <!-- breadcrumb --> */}
              <ol class="flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li class="leading-normal text-sm">
                  <a class="opacity-50" >Pages</a>
                </li>
                <li class="text-sm pl-2 capitalize leading-normal before:float-left before:pr-2 before:content-['/']" aria-current="page">Profile</li>
              </ol>
              <Link to="/second"><h6 class="mb-2 ml-2 font-bold text-white capitalize">SecondPage</h6></Link>
            </nav>

            <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <div class="flex items-center md:ml-auto md:pr-4">
                <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                  <span class="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input type="text" class="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Type here..." />
                </div>
              </div>
            </div>

          </div>
        </nav>

        <div class="w-full px-6 mx-auto">
          {/* /* header quotes */}

          <div class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl" style={{ backgroundImage: "url('../assets/img/curved-images/curved0.jpg')", backgroundPositionY: "50%", }}>
            <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
            <div class="flex-none w-auto max-w-full px-3 py-3 my-auto">
              <div class="h-full flex px-6">
                <h1 class="mb-1 py-2 px-2 text-6xl">
                  <span class="text-rose-700">N</span>ext
                </h1>
                <h1 class="mb-1 py-2 px-2 text-6xl">
                  <span class="text-rose-700">S</span>tep
                </h1>
              </div>

            </div>
            {/* //add a div there that shall apear on bootom right with pink 500 and h3 tag saying we help u acheive dreams */}
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
                  <h5 class="mb-1 text-fuchsia-800">Sana Rahman</h5>

                </div>
              </div>
              {/* streak and milestone on nav bar*/}
              <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                <div class="relative right-0">
                  <ul class="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl" nav-pills role="tablist">
                    {/* streak */}
                    <li class="z-30 flex-auto text-center">
                      <a class="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700" nav-link active href="javascript:;" role="tab" aria-selected="true">
                        <span class="ml-1">Streak 5</span>
                      </a>
                    </li>
                    {/* MileStone */}
                    <li class="z-30 flex-auto text-center">
                      <a class="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700" nav-link href="javascript:;" role="tab" aria-selected="false">
                        <span class="ml-1">MileStone</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>



        {/* /* habits Section */}

        <div class="flex-none w-1/8 max-w-full px-3 mt-6 m-5">
          <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-lg rounded-2xl bg-clip-border">
            <div class="p-4 pb-0 mb-0 bg-white rounded-t-2xl flex items-center">
              <h3 class="pl-8 text-fuchsia-800">Habits</h3>
              <BsStars className="text-yellow-500 ml-2" size={40} />
            </div>

            <div class="w-full p-8 mx-auto">
              <div class="flex flex-wrap -mx-3">

                { /* Add loop here to show habits */}

                <div class="w-full max-w-full px-6 py-3 lg-max:mt-6 xl:w-3/10">
                  <div class="relative flex flex-col px-4 h-full min-w-0 break-words bg-white border-0 shadow-md rounded-2xl bg-clip-border">

                    <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                      <div class="flex flex-wrap -mx-3">
                        <div class="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                          <h4 class="mb-0 text-slate-700">Reading a Book</h4>
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
                          <div><AiFillFire className="h-5 w-5 text-yellow-500" /><span class="ml-1 text-sm text-gray-600 font-bold">5</span> </div>
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

                {/* end loop here */}

                {/* Add new project */}
                <div class="w-full max-w-full px-6 py-3 lg-max:mt-6 xl:w-3/10">
                  <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-md rounded-2xl bg-clip-border">
                    <div class="flex flex-col justify-center flex-auto p-6 text-center">
                      <a href="/">
                        <h4 class="mb-0 text-fuchsia-800">New Habit</h4>
                        <AiOutlinePlus className="mb-4 text-fuchsia-800 opacity-70" size={48} />
                      </a>
                    </div>
                  </div>
                </div>
      
              </div>
              <div class="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-md rounded-2xl bg-clip-border">
  <div class="flex flex-col justify-center flex-auto p-6 text-center">
  <img src="./assets/emojis/party.png" alt="Cartoon" className="absolute bottom-0 right-0 w-16 h-16 m-4" />
   
  </div>
</div>
            </div>
          </div>
        </div>

        {/* end of habits */}


      </div>
    </div>
  );
}

export default App;
