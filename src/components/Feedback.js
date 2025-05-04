import React, { useState } from "react";
import axios from "axios";
import './Feedback.css'; // Feedback styling

const Feedback = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !name || !text) {
            setMessage("All fields are required!");
            return;
        }

        const feedbackData = {
            email: email,
            name: name,
            text: text,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/feedback", feedbackData);
            if (response.status === 200) {
                setMessage("Thank you for your feedback!");
                setEmail("");
                setName("");
                setText("");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            setMessage("Failed to submit feedback. Please try again later.");
        }
    };

    return (
        <div className="feedback-container">
            <h2>Feedback Form</h2>
            {message && <p className="feedback-message">{message}</p>}
            <form className="feedback-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                />
                <label htmlFor="text">Feedback</label>
                <textarea
                    id="text"
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your feedback here"
                    rows="4"
                />
                <button type="submit" className="submit-button">
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default Feedback;
