

import { useSearchParams, useRouteLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import "./year.css";

export default function SecondYear() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedSubject, setSelectedSubject] = useState(searchParams.get("sub") || "");

    const subjects = ['Dravyaguna', 'Roga Nidana', 'Rasashastra', 'Agadtantra', 'Swasthavritta'];
    const data = useRouteLoaderData("notes")

    const notes = data.notes
    const isType = searchParams.get("sub");

    const filteredNotes = notes && notes.filter((note) => note.subject.toLowerCase() === isType);

    const handleSubjectChange = (event) => {
        const value = event.target.value;
        setSelectedSubject(value);
        setSearchParams((prev) => {
            if (value) {
                prev.set("sub", value.toLowerCase());
            } else {
                prev.delete("sub");
            }
            return prev;
        });
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
            <div className="w-full max-w-xs mb-6">
                <select
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    className="block w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                        <option key={subject} value={subject.toLowerCase()}>
                            {subject}
                        </option>
                    ))}
                </select>
            </div>

            {/* Content Area */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                    <div
                        key={note.id}
                        className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    >
                        <div className="text-sm font-medium text-gray-600 mb-2">
                            {note.subject}
                        </div>
                        <Link to={`/notes/${note.id}`} state={{ sp: selectedSubject, year: "2-professional" }}>
                            <div className="text-lg font-semibold text-gray-800 mb-2">
                                {note.title}
                            </div>
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
}
