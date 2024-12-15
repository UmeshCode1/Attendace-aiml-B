import React, { useState } from "react";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  attendance: boolean;
}

const AttendanceApp = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "John Doe", rollNo: "10", attendance: false },
    { id: 2, name: "Jane Doe", rollNo: "102", attendance: false },
    { id: 3, name: "Bob Smith", rollNo: "103", attendance: false },
    { id: 4, name: "Alice Johnson", rollNo: "104", attendance: false },
  ]);

  const [date, setDate] = useState("2024-01-01");
  const [subject, setSubject] = useState("AI");
  const [extraPresentStudents, setExtraPresentStudents] = useState<string[]>(
    []
  );

  const handleAttendanceChange = (id: number) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, attendance: !student.attendance }
          : student
      )
    );
  };

  const addExtraPresentStudent = () => {
    const name = prompt("Enter student name");
    if (name) {
      setExtraPresentStudents([...extraPresentStudents, name]);
    }
  };

  const removeExtraPresentStudent = (index: number) => {
    setExtraPresentStudents(extraPresentStudents.filter((_, i) => i !== index));
  };

  const exportData = () => {
    const csvContent = `Name,Roll No,Attendance\n${students
      .map(
        (student) =>
          `${student.name},${student.rollNo},${
            student.attendance ? "Present" : "Absent"
          }`
      )
      .join("\n")}\n${extraPresentStudents
      .map((name) => `${name},,Present`)
      .join("\n")}`;
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AIML-B_${date}_${subject}.csv`);
    link.click();
  };

  const presentCount =
    students.filter((student) => student.attendance).length +
    extraPresentStudents.length;
  const absentCount =
    students.length - students.filter((student) => student.attendance).length;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-4xl font-bold text-blue-500">AIML-B Attendance</h1>
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          onClick={exportData}
        >
          Export Data
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <label className="text-lg mr-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200"
          />
        </div>
        <div className="flex items-center">
          <label className="text-lg mr-2">Subject:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200"
          >
            <option value="AI">AI</option>
            <option value="OOPS">OOPS</option>
            <option value="DSA">DSA</option>
            <option value="IPS">IPS</option>
            <option value="TC">TC</option>
            <option value="AI LAB">AI LAB</option>
            <option value="DSA LAB">DSA LAB</option>
            <option value="PYTHON LAB">PYTHON LAB</option>
            <option value="OOPS LAB">OOPS LAB</option>
          </select>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">Student Attendance</h2>
      <ul>
        {students.map((student) => (
          <li
            key={student.id}
            className="flex items-center justify-between p-2 border-b border-gray-200"
          >
            <div className="flex items-center">
              <span className="text-lg">{student.name}</span>
              <span className="text-lg font-bold ml-2">({student.rollNo})</span>
            </div>
            <button
              className={`px-4 py-2 rounded-lg ${
                student.attendance
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
              onClick={() => handleAttendanceChange(student.id)}
            >
              {student.attendance ? "Present" : "Absent"}
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-3xl font-bold mb-4">Extra Present Students</h2>
      <ul>
        {extraPresentStudents.map((name, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border-b border-gray-200"
          >
            <span className="text-lg">{name}</span>
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white"
              onClick={() => removeExtraPresentStudent(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        className="px-4 py-2 rounded-lg bg-green-500 text-white"
        onClick={addExtraPresentStudent}
      >
        Add Extra Present Student
      </button>
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <span className="text-lg font-bold">Present:</span>
          <span className="text-lg ml-2">{presentCount}</span>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold">Absent:</span>
          <span className="text-lg ml-2">{absentCount}</span>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-lg ml-2">
            {students.length + extraPresentStudents.length}
          </span>
        </div>
      </div>
      <p className="text-lg text-gray-500 mt-4 text-center font-bold">
        Developed by{" "}
        <a href="https://github.com/UmeshCode1" target="_blank">
          UmeshCode1
        </a>
      </p>
    </div>
  );
};

export default AttendanceApp;
