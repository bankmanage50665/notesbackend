import "../Admin/style.css";

import { json, useLoaderData, useNavigation, Link } from "react-router-dom";


export default function NotesList() {
    const data = useLoaderData();
    const notes = data.notes;

    


    const navigation = useNavigation();

    const isLoading = navigation.state === "loading";

    return (
        <>
            {isLoading ? (
                <h1 className="items-center justify-center">Loading...</h1>
            ) : (
                <div className=" min-h-screen p-8">

                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
                        { notes && notes.length >= 1 ? <header className=" py-6 px-8">
                            <h1 className="text-3xl font-serif text-gray-800">
                                All Notes
                            </h1>
                        </header> : <p className=" text-center">Notes not find, Please add some</p>}
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {notes &&
                                    notes.map((item, index) => (
                                        <div
                                            key={item._id}
                                            className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-100"
                                                } p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
                                        >
                                            <Link to={`/notes/${item._id}`}>
                                                <h2
                                                    className={`text-2xl font-semibold ${index % 2 === 0 ? "text-black" : "text-blue"
                                                        } mb-3`}
                                                >
                                                    {item.title}
                                                </h2>

                                                <div className="mt-4 text-sm text-gray-800">

                                                    {item.year && <p>Year: {item.year}</p>}
                                                    {item.subject && <p>Subject: {item.subject}</p>}
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export async function loader() {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/allNotes`);
        const resData = await response.json();

        if (!response.ok) {
            throw new Error(resData.message);
        }

    
        return resData;
    } catch (err) {
        throw json(
            { message: "Field to fetch notes, Please try again later" },
            { status: 500 }
        );
    }
}
