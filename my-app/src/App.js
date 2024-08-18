import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "./index.css";

import SignupForm, {
  action as signupAction,
} from "./shared/component/Signup.jsx";
import LoginForm, { action as loginAction } from "./shared/component/Login.jsx";
import { loader as NotesDetailsLoader } from "./components/Questions/NotesDetails.jsx";
import ErrorHandler from "./shared/component/Error.jsx";
import RootLayout from "./shared/navigation/RootLayout.jsx";

import {
  getToken as tokenLoader,
  checkAuthLoader,
} from "./middleware/getToken.js";

const NotesList = lazy(() => import("./components/Questions/NotesList"));
const AddNotes = lazy(() => import("./components/Admin/AddNotes.jsx"));
const FirstYear = lazy(() => import("./components/year/FirstYear.jsx"));
const SecondYear = lazy(() => import("./components/year/SecondYear.jsx"));
const FinalYear = lazy(() => import("./components/year/FinalYear.jsx"));
const NotesDetails = lazy(() =>
  import("./components/Questions/NotesDetails.jsx")
);
const EditNotes = lazy(() => import("./components/Questions/EditNotes.jsx"));
const NotesLayout = lazy(() => import("./shared/navigation/NotesLayout.jsx"));

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    loader: tokenLoader,
    id: "token-id",
    errorElement: <ErrorHandler />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NotesList />
          </Suspense>
        ),
        loader: () =>
          import("./components/Questions/NotesList").then((module) =>
            module.loader()
          ),
      },
      { path: "add", element: <AddNotes />, loader: checkAuthLoader },

      {
        path: "signup",
        element: <SignupForm />,
        action: signupAction,
      },
      {
        path: "login",
        element: <LoginForm />,
        action: loginAction,
      },
      {
        path: "notes",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NotesLayout />
          </Suspense>
        ),
        loader: () =>
          import("./components/Questions/NotesList.jsx").then((module) =>
            module.loader()
          ),
        id: "notes",

        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <NotesList />
              </Suspense>
            ),
            loader: () =>
              import("./components/Questions/NotesList.jsx").then((module) =>
                module.loader()
              ),
          },
          {
            path: "1-professional",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <FirstYear />
              </Suspense>
            ),
            loader: () =>
              import("./components/Questions/NotesList.jsx").then((module) =>
                module.loader()
              ),
          },
          { path: "2-professional", element: <SecondYear /> },

          { path: "final-year", element: <FinalYear /> },
          {
            path: ":id",
            loader: NotesDetailsLoader,
            id: "note-id",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <NotesDetails />
                  </Suspense>
                ),
                loader: NotesDetailsLoader,
              },
              {
                path: "edit",
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <EditNotes />
                  </Suspense>
                ),
                loader: checkAuthLoader,
              },
            ],
          },
        ],
      },
      {
        path: "logout",
        action: () =>
          import("./middleware/logout.js").then((module) => module.action()),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
