import { useState } from "react"
import { json, useNavigate, Link, useLocation, useLoaderData } from "react-router-dom"
import { getToken, userId } from "../../middleware/getToken"



export default function NotesList() {
    const [isDeleting, setIsDeleting] = useState(false)
    const data = useLoaderData()
    const note = data.note
    const navigate = useNavigate()
    const location = useLocation()
    const isBack = location.state && location.state.sp
    const isYear = location.state && location.state.year
    const token = getToken()
    const userid = userId()


    async function handleDeleteNotes(id) {
        setIsDeleting(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const resData = await response.json()
            if (!response.ok) {
                throw new Error(resData.message)
            }
        } catch (err) {
            setIsDeleting(false)
            throw json({ message: "Field to delete notes, Please try again later" }, { status: 500 })
        }
        setIsDeleting(false)
        navigate(`/notes`)

    }




    return <>


        <Link
            to={isBack && isYear ? `/notes/${isYear}/?sub=${isBack}` : ".."}


            className="inline-flex items-center mt-4 mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                />
            </svg>
            Back
        </Link>
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {note.subject.toUpperCase()}
                    </span>
                    <h3 className="text-gray-600 text-sm mt-2">
                        Chapter: {note.chapter}
                    </h3>
                </div>
                {token && userid === note.creator && <div className="flex space-x-2">
                    {<Link
                        to="edit"
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </Link>}
                    <button
                        onClick={() => handleDeleteNotes(note.id)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>}
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {note.title}
            </h1>

            <p className="text-gray-600  leading-relaxed mb-6 whitespace-pre-wrap">
                {note.description}
            </p>

            {isDeleting && (
                <div className="text-sm text-gray-500 italic">
                    Deleting...
                </div>
            )}
        </div>


    </>
}

export async function loader({ req, params }) {
    const notesId = params.id
    console.log(notesId)
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${notesId}`)
        const resData = await response.json()

        if (!response.ok) {
            throw new Error(resData.message)
        }
        return resData

    } catch (err) {
        throw json({ message: "Field to find notes with id." }, { status: 500 })
    }

}