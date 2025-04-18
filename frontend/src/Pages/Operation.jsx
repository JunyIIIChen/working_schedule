import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import "./CSS/Operation.css";

export const Operation = () => {
    const [rows, setRows] = useState([
        {day: 'Monday', startTime: '09:00', endTime: '17:00', workers: 1, dayOff: false},
        {day: 'Tuesday', startTime: '09:00', endTime: '17:00', workers: 1, dayOff: false},
        {day: 'Wednesday', startTime: '09:00', endTime: '17:00', workers: 1, dayOff: false},
        {day: 'Thursday', startTime: '09:00', endTime: '17:00', workers: 1, dayOff: false},
        {day: 'Friday', startTime: '09:00', endTime: '17:00', workers: 1, dayOff: false},
        {day: 'Saturday', startTime: '09:00', endTime: '17:00', workers: 1, dayOff: false},
        {day: 'Sunday', startTime: '09:00', endTime: '17:00', workers: 1, dayOff: false}
    ]);

    // Generate time options (every 30 minutes)
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                options.push(<option key={timeString} value={timeString}>{timeString}</option>);
            }
        }
        return options;
    };

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = field === 'dayOff' ? !updatedRows[index][field] : value;
        setRows(updatedRows);
    };

    const addNewRow = () => {
        setRows([...rows, {day: '', startTime: '09:00', endTime: '17:00', workers: 1, dayOff: false}]);
    };

    const copyRow = (index) => {
        const rowToCopy = rows[index];
        setRows([...rows, {...rowToCopy}]);
    };

    const deleteRow = (index) => {
        if (rows.length > 1) {
            const updatedRows = rows.filter((_, i) => i !== index);
            setRows(updatedRows);
        }
    };

    const saveToSQL = (index) => {

    };

    return (
        <div className={'settingsbasic'}>
            <div className="navbar-settings">
                <div className="nav-links">
                    <NavLink
                        to="/settings"
                        className={({isActive}) =>
                            isActive ? 'quicklink active' : 'quicklink'
                        }
                    >
                        Basic Information
                    </NavLink>

                    <NavLink
                        to="/operation"
                        className={({isActive}) =>
                            isActive ? 'quicklink active' : 'quicklink'
                        }
                    >
                        Operation Information
                    </NavLink>
                </div>

                <button onClick={saveToSQL} className="save-btn">
                    Save
                </button>
            </div>
            <div>
                <div>
                    <div className="schedule-container">
                        <h3>Shift Schedule</h3>
                        <table className="schedule-table">
                            <thead>
                            <tr>
                                <th>Day</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Workers Needed</th>
                                <th>Day Off</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        <select
                                            value={row.day}
                                            onChange={(e) => handleInputChange(index, 'day', e.target.value)}
                                            className="day-select"
                                        >
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                            <option value="Saturday">Saturday</option>
                                            <option value="Sunday">Sunday</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            value={row.startTime}
                                            onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
                                            className="time-select"
                                        >
                                            {generateTimeOptions()}
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            value={row.endTime}
                                            onChange={(e) => handleInputChange(index, 'endTime', e.target.value)}
                                            className="time-select"
                                        >
                                            {generateTimeOptions()}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={row.workers}
                                            onChange={(e) => handleInputChange(index, 'workers', parseInt(e.target.value))}
                                            className="workers-input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={row.dayOff}
                                            onChange={() => handleInputChange(index, 'dayOff')}
                                            className="day-off-checkbox"
                                        />
                                    </td>
                                    <td className="action-buttons">
                                        <button onClick={() => copyRow(index)} className="copy-btn">
                                            Copy
                                        </button>
                                        <button onClick={() => deleteRow(index)} className="delete-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button onClick={addNewRow} className="add-row-btn">
                            Add New Schedule
                        </button>
                    </div>

                </div>
            </div>


        </div>
    )

}

export default Operation