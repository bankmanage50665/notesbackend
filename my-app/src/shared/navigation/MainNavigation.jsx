import React from "react";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";



function MainNavigation() {
  const token = useRouteLoaderData("token-id")

  console.log(token)



  return (


    <nav className=" bg-blue-600 rounded-md shadow-md px-4">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center"></div>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold px-4 py-2 bg-white rounded-md shadow-md"
                  : "text-black hover:text-black hover:bg-white hover:rounded-md transition duration-200"
              }
            >
              Notes
            </NavLink>
          </li>
          {!token && <li>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold px-4 py-2 bg-white rounded-md shadow-md"
                  : "text-black hover:text-black hover:bg-white hover:rounded-md transition duration-200"
              }
            >
              Signup
            </NavLink>
          </li>}
          {!token && <li>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold px-4 py-2 bg-white rounded-md shadow-md"
                  : "text-black hover:text-black   hover:bg-white hover:rounded-md transition duration-200"
              }
            >
              Login
            </NavLink>
          </li>}
          {token && <li>
            <NavLink
              to="add"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold px-4 py-2 bg-white rounded-md shadow-md"
                  : "text-black hover:text-black   hover:bg-white hover:rounded-md transition duration-200"
              }
            >
              Add notes
            </NavLink>
          </li>}

          {token && <li>
            <Form action="/logout" method="post">
              <button>Logout </button>
            </Form>
          </li>}

        </ul>
      </div>
    </nav>
  );
}

export default MainNavigation;
