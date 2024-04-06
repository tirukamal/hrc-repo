
// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Welcome to the Dashboard Page!</h1>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css'; // Importing CSS file
 
function Dashboard() {
    const [checkinTime, setCheckinTime] = useState(null);
    const [checkoutTime, setCheckoutTime] = useState(null);
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    const checkIn = () => {
        setCheckinTime(new Date());
        updateUI();
    }

    const checkOut = () => {
        const checkout = new Date();
        setCheckoutTime(checkout);
        const calculatedWorkHours = calculateWorkHours(checkinTime, checkout);
        addToAttendanceTable(checkinTime, checkout, calculatedWorkHours);
        setCheckinTime(null);
        updateUI();
    }

    const calculateWorkHours = (checkin, checkout) => {
        const diff = checkout - checkin;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return { hours, minutes };
    }

    const addToAttendanceTable = (checkin, checkout, workHours) => {
        const newRecord = {
            date: formatDate(checkin),
            checkinTime: formatTimePart(checkin),
            checkoutTime: formatTimePart(checkout),
            workHours: formatTime(workHours)
        };
        setAttendanceRecords([newRecord, ...attendanceRecords]);
    }

    const updateUI = () => {
        // Update UI here
    }

    const formatTimePart = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const formatDate = (date) => {
        return date.toLocaleDateString();
    }

    const formatTime = ({ hours, minutes }) => {
        return `${hours} hours ${minutes} minutes`;
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        // Navigate to SignIn page
        navigate('/');
    };

    return (
        <div className="container">
            <header>
                <h1>Intern Dashboard</h1>
                <button id="logoutBtn" onClick={handleLogout} style={{ fontSize: '1.2em' }}>Logout</button>

            </header>
            <div className="sections-container">
    <section className="check-in-out">
        <h2>Check-In/Check-Out</h2>
        <button id="checkInBtn" onClick={checkIn}>Check-In</button> <br />
        <button id="checkOutBtn" onClick={checkOut}>Check-Out</button>
    </section>
    <section className="leave-applications">
        <h2 id='leave-dash'>Leave Applications</h2>
        <input id="leaveInput" type="text" placeholder="Enter your leave request..." rows="4" cols="50"></input>
        <button id="applyLeaveBtn">Apply for Leave</button>
        <div id="leaveStatus" style={{ color: 'green', display: 'none' }}>Leave successfully submitted!</div>
    </section>
</div>

            <div className="display">
                <p id="checkinTime">Check-in Time: {checkinTime ? formatTimePart(checkinTime) : '---'}</p>
                <p id="checkoutTime">Check-out Time: {checkoutTime ? formatTimePart(checkoutTime) : '---'}</p>
            </div>
            <table id="attendanceRecords">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Check-in Time</th>
                        <th>Check-out Time</th>
                        <th>Work Hours</th>
                    </tr>
                </thead>
                <tbody id="data">
                    {attendanceRecords.map((record, index) => (
                        <tr key={index}>
                            <td>{record.date}</td>
                            <td>{record.checkinTime}</td>
                            <td>{record.checkoutTime}</td>
                            <td>{record.workHours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
