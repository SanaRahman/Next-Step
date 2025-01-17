import './App.css';
import { BsStars } from "react-icons/bs";
import Habits from './components/Habits';
import NewHabit from './components/NewHabit';
import Header from './components/Header';
import HabitTracker from './components/HabitTracker';
import AddHabit from './components/AddHabit';
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
    <div className=" bg-gray-50 h-full max-h-screen mb-6">
      <div className="ease-soft-in-out  relative h-full max-h-screen bg-gray-50 transition-all duration-200 m-6">
        <nav className="absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2  text-white transition-all shadow-none duration-250 ease-soft-in lg:flex-nowrap lg:justify-start" >
          <div className="flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit">

            {/* <nav>
              <ol class="flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li class="leading-normal text-sm">
                  <a class="opacity-50" >Pages</a>
                </li>
                <li class="text-sm pl-2 capitalize leading-normal before:float-left before:pr-2 before:content-['/']" aria-current="page">Profile</li>
              </ol>
              <Link to="/second"><h6 class="mb-2 ml-2 font-bold text-white capitalize">SecondPage</h6></Link>
            </nav> */}

            {/* <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <div class="flex items-center md:ml-auto md:pr-4">
                <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                  <span class="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input type="text" class="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Type here..." />
                </div>
              </div>
            </div> */}

          </div>
        </nav>

        {/* Header */}
        <Header />
        {/* End Header */}




        {/* /* habits Section */}

        <div class="flex-none w-1/8 max-w-full px-3 mt-6 m-5 relative">
          <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-lg rounded-2xl bg-clip-border">
            <div class="p-4 pb-0 mb-0 bg-white rounded-t-2xl flex items-center">
              <h3 class="pl-8 text-fuchsia-800">Habits</h3>
              <BsStars className="text-yellow-500 ml-2" size={40} />
            </div>

            <div class="w-full px-8 pb-6 mx-auto">
              <div class="flex flex-wrap -mx-3">

                { /* Add loop here to show habits */}
                <Habits title="Reading a Book" streak={5} milestoneProgress={milestoneProgress} progressBarColor={progressBarColor} />
                {/* end loop here */}

                <NewHabit />
              </div>
            </div>
            <img src="./assets/emojis/butterfly.png" alt="Cartoon" className="absolute bottom-0 right-0 w-24 h-24 m-4 transform -rotate-12" />
          </div>
        </div>

        {/* end of habits */}
        <HabitTracker/>
        <AddHabit/>
    


      </div>
    </div>
  );
}

export default App;
