import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <nav className="absolute z-20 flex flex-wrap items-center justify-between w-full px-6 py-2 text-white transition-all shadow-none duration-250 ease-soft-in lg:flex-nowrap lg:justify-start">
            <div className="flex items-center justify-between w-full px-6 py-1 mx-auto flex-wrap-inherit">
                <ol className="flex flex-wrap pt-1 pl-2 pr-4 mr-12 bg-transparent rounded-lg sm:mr-16">
                    <li className="leading-normal text-sm">
                        <a className="opacity-50">Pages</a>
                    </li>
                    <li className="text-sm pl-2 capitalize leading-normal before:float-left before:pr-2 before:content-['/']" aria-current="page">Profile</li>
                </ol>
                <Link to="/second">
                    <h6 className="mb-2 ml-2 font-bold text-white capitalize">SecondPage</h6>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;