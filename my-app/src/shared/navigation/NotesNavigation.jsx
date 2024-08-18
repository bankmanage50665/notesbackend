import React from "react";
import { NavLink } from "react-router-dom";
function NotesNavigation() {


    return (

        <div className=" p-4 rounded-lg shadow-md">
            <nav className="overflow-x-auto">
                <ul className="flex space-x-4 min-w-max">
                    {['1 professional', '2 professional', 'final year'].map((year) => (
                        <li key={year}>
                            <NavLink
                                to={`/notes/${year.replace(' ', '-')}`}
                                className={({ isActive }) =>
                                    `px-6 py-3 rounded-full font-semibold transition-all duration-200 whitespace-nowrap ${isActive
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-600"
                                    }`
                                }
                            >
                                {year}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default NotesNavigation;
