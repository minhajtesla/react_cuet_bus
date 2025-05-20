import React,{useState} from 'react';
import './StudentRegisterPage.css';
import { useNavigate } from 'react-router-dom';


function StudentRegistrationPanel({onClose})
{
    const navigate = useNavigate();

    const [student,setStudent]= useState({
        studentId: '',
        name: '',
        department: '',
        batch: '',
        gender: '',
        hall: '',
        bloodGroup: '',
        contactNo: '',
        email: '',
        password: '',
    })
    const [isHuman, setIsHuman] = useState(false); // State for checkbox

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value,
        });
    };

    const handleCheckboxChange = () => {
        setIsHuman(!isHuman); // Toggle checkbox state
    };

    // The handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isHuman) {
            alert("Please confirm that you are not a robot.");
            return;
        }

        const studentData = {
            studentId: student.studentId,
            name: student.name,
            department: student.department,
            batch: student.batch,
            gender: student.gender,
            // hall: student.hall,
            // bloodGroup: student.bloodGroup,
            contactNo: student.contactNo,
            email: student.email,
            password: student.password,
        };

        console.log("Registering student:", studentData); // Log data to console

        try {
            const response = await fetch("http://localhost:8080/api/students/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });
            
            if (response.ok) {
                console.log('Student registered successfully!');
                //navigate('/student-profile');  // Redirect to the student profile page
                navigate('/student-login');  // Redirect to the student login page
            } else {
                console.log('Failed to register student.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

return (
    <div className="register-page">


            <form className="register-form" onSubmit={handleSubmit}>
            <h3 style={{ color: 'white' }}>Student Register</h3>
                <input 
                    type="text" 
                    name="studentId" 
                    placeholder="Student ID" 
                    value={student.studentId} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={student.name} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="department" 
                    placeholder="Department" 
                    value={student.department} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="batch" 
                    placeholder="Batch" 
                    value={student.batch} 
                    onChange={handleInputChange} 
                    required 
                />
                <select name="gender" value={student.gender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {/* <input 
                    type="text" 
                    name="hall" 
                    placeholder="Hall Name" 
                    value={student.hall} 
                    onChange={handleInputChange} 
                    required 
                /> */}
                {/* <input 
                    type="text" 
                    name="bloodGroup" 
                    placeholder="Blood Group" 
                    value={student.bloodGroup} 
                    onChange={handleInputChange} 
                    required 
                /> */}
                <input 
                    type="text" 
                    name="contactNo" 
                    placeholder="Contact No" 
                    value={student.contactNo} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={student.email} 
                    onChange={handleInputChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={student.password} 
                    onChange={handleInputChange} 
                    required 
                />
                
                {/* "I'm not a robot" Checkbox */}
                <div className="captcha-section">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={isHuman} 
                            onChange={handleCheckboxChange} 
                        />
                        I'm not a robot
                    </label>
                </div>

                <button type="submit">Register</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );



}
export default StudentRegistrationPanel;    