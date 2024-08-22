import { useState } from 'react';
import { useNavigate, Form, json } from 'react-router-dom';
import "./style.css"
import { getToken } from "../../middleware/getToken"

function AddNotes() {


    const [image, setImage] = useState(null);
    const [isSubmiting, setIsSubmiting] = useState(false)
    const token = getToken()

    const navigate = useNavigate()


    const [selectedYear, setSelectedYear] = useState('');

    const subjectsByYear = {
        '1': [
            "Physiology",
            "Anatomy",
            "Sanskrit",
            "Padartha Vigyana",
            "Samhita Adhyyan",
        ],
        '2': [
            'Dravyaguna',
            'Roga Nidana',
            'Rasashastra',
            'Agadtantra',
            'Swasthavritta'
        ],
        '5': [
            "Panchakarma",
            "Kayachikitsa",
            "Kumarbhritya",
            "Shalya Tantra",
            "Gynaecology",
            "Pediatrics"
        ]
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleSubmit = async (e) => {

        const formData = new FormData()
        const formElements = e.target.elements

        e.preventDefault();
        const notesData = {

            title: formElements.title.value,
            description: formElements.description.value,
            chapter: formElements.chapter.value,
            subject: formElements.subject.value,
            year: formElements.year.value,

        }



        try {
            setIsSubmiting(true)

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/add`, {
                method: 'POST',
                body: JSON.stringify(notesData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const resData = await response.json()

            if (!response.ok) {
                throw json({ message: resData.message })
            }
        } catch (err) {
            setIsSubmiting(false)
            throw new Error("Field to create notes, Please try again lter")
        }

        navigate("/notes")
        setIsSubmiting(false)


    };







    return (



        <div className="container mx-auto px-4 py-12 bg-gray-300 min-h-screen flex items-center justify-center">
            <div className="bg-mauve-600 rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-black mb-6 text-center">Add Notes</h2>
                <Form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor='title' className="block text-sm font-medium text-black">Heading</label>
                        <input
                            type="text"
                            placeholder="Enter title"
                            name='title'
                            id='title'
                            className="w-full px-3 py-2 border border-gold-300 rounded-md shadow-sm placeholder-gold-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor='description' className="block text-sm font-medium text-black">Description</label>
                        <textarea
                            placeholder="Enter description"
                            name='description'
                            id='description'
                            rows="4"
                            className="w-full whitespace-pre-wrap px-3 py-2 border border-gold-300 rounded-md shadow-sm placeholder-gold-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor='chapter' className="block text-sm font-medium text-black">Chapter</label>
                        <input
                            type="text"
                            placeholder="Enter chapter"
                            name='chapter'
                            id='chapter'
                            className="w-full px-3 py-2 border border-gold-300 rounded-md shadow-sm placeholder-gold-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="year" className="block text-sm font-medium text-black">Select year</label>
                        <select
                            id="year"
                            name="year"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="w-full px-3 py-2 border border-black rounded-md shadow-sm bg-white text-black-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out"
                        >
                            <option value="">Choose a year</option>
                            <option value="1">1 Professional</option>
                            <option value="2">2 Professional</option>
                            <option value="5">Final year</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor='subject' className="block text-sm font-medium text-black">Subject</label>
                        <select
                            name='subject'
                            id='subject'
                            className="w-full px-3 py-2 border border-gold-300 rounded-md shadow-sm placeholder-gold-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                        >
                            <option value="">Choose a subject</option>
                            {selectedYear && subjectsByYear[selectedYear].map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        disabled={isSubmiting}
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-black to-mauve-600 hover:from-black-700 hover:to-mauve-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
                    >
                        {isSubmiting ? 'Submiting...' : "Add Notes"}
                    </button>
                </Form>
            </div>
        </div>

    );
}

export default AddNotes;
