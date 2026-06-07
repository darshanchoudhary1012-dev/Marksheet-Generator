// Generate 1000 Students Data
let studentsData = [];

const courses = ['CS', 'IT', 'EC', 'ME', 'CE'];
const firstNames = ['AARAV', 'VIVAAN', 'ARJUN', 'ADITYA', 'ROHAN', 'HARSH', 'PRIYA', 'NEHA', 'ANANYA', 'ZARA', 'MAYA', 'POOJA', 'RAHUL', 'NIKHIL', 'SAURAV', 'VARUN', 'SHIVA', 'RAVI', 'AKASH', 'YASH', 'DIVYA', 'ANJALI', 'SHRUTI', 'ISHA', 'SNEHA'];
const lastNames = ['SHARMA', 'PATEL', 'SINGH', 'KUMAR', 'VERMA', 'GUPTA', 'REDDY', 'KHAN', 'JOSHI', 'MISHRA', 'NAIR', 'BHAT', 'IYER', 'PILLAI', 'DESAI', 'KAPOOR', 'MALHOTRA', 'BANSAL', 'AGARWAL', 'CHANDRA'];

const subjects = {
    '1': [
        { code: 'MA101', name: 'Engineering Mathematics-I', credits: 4 },
        { code: 'PH101', name: 'Physics', credits: 4 },
        { code: 'CH101', name: 'Chemistry', credits: 3 },
        { code: 'CS101', name: 'Programming Fundamentals', credits: 4 },
        { code: 'ENG101', name: 'English Communication', credits: 3 }
    ],
    '2': [
        { code: 'MA201', name: 'Engineering Mathematics-II', credits: 4 },
        { code: 'PH201', name: 'Applied Physics', credits: 3 },
        { code: 'CS201', name: 'Data Structures', credits: 4 },
        { code: 'EEE201', name: 'Basic Electrical Engineering', credits: 3 },
        { code: 'CS202', name: 'Digital Logic Design', credits: 4 }
    ],
    '3': [
        { code: 'CS301', name: 'Database Management', credits: 4 },
        { code: 'CS302', name: 'Operating Systems', credits: 4 },
        { code: 'CS303', name: 'Web Technologies', credits: 3 },
        { code: 'CS304', name: 'Software Engineering', credits: 3 },
        { code: 'MA301', name: 'Discrete Mathematics', credits: 4 }
    ],
    '4': [
        { code: 'CS401', name: 'Compiler Design', credits: 4 },
        { code: 'CS402', name: 'Computer Networks', credits: 4 },
        { code: 'CS403', name: 'Microprocessors', credits: 3 },
        { code: 'CS404', name: 'Database Lab', credits: 2 },
        { code: 'CS405', name: 'Web Development Lab', credits: 2 }
    ],
    '5': [
        { code: 'CS501', name: 'Artificial Intelligence', credits: 4 },
        { code: 'CS502', name: 'Cloud Computing', credits: 3 },
        { code: 'CS503', name: 'Data Mining', credits: 3 },
        { code: 'CS504', name: 'Information Security', credits: 3 },
        { code: 'CS505', name: 'Machine Learning', credits: 4 }
    ],
    '6': [
        { code: 'CS601', name: 'Mobile App Development', credits: 3 },
        { code: 'CS602', name: 'Big Data Analytics', credits: 3 },
        { code: 'CS603', name: 'Cyber Security', credits: 3 },
        { code: 'CS604', name: 'IoT Applications', credits: 3 },
        { code: 'CS605', name: 'Advanced Algorithms', credits: 4 }
    ],
    '7': [
        { code: 'CS701', name: 'Blockchain Technology', credits: 3 },
        { code: 'CS702', name: 'Deep Learning', credits: 3 },
        { code: 'CS703', name: 'Quantum Computing', credits: 3 },
        { code: 'CS704', name: 'DevOps & Cloud', credits: 3 },
        { code: 'CS705', name: 'Capstone Project-I', credits: 4 }
    ],
    '8': [
        { code: 'CS801', name: 'Advanced Security', credits: 3 },
        { code: 'CS802', name: 'Edge Computing', credits: 3 },
        { code: 'CS803', name: 'AI Ethics', credits: 2 },
        { code: 'CS804', name: 'Research Methods', credits: 2 },
        { code: 'CS805', name: 'Capstone Project-II', credits: 4 }
    ]
};

const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C'];
const gradePoints = {
    'A+': 10, 'A': 9, 'B+':8, 'B': 7,  'C+': 6, 'C': 5
};

// Generate sequential student data
function generateStudentsData() {
    for (let courseIdx = 0; courseIdx < courses.length; courseIdx++) {
        const course = courses[courseIdx];
        for (let rollNum = 1; rollNum <= 200; rollNum++) {
            const roll = course + String(rollNum).padStart(3, '0');
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const name = firstName + ' ' + lastName;

            const student = {
                roll: roll,
                name: name,
                course: course,
                semesters: {}
            };

            // Generate results for each semester
            for (let sem = 1; sem <= 8; sem++) {
                const semSubjects = subjects[sem.toString()];
                student.semesters[sem] = [];

                let totalPoints = 0;
                let totalCredits = 0;

                semSubjects.forEach(subject => {
                    const grade = grades[Math.floor(Math.random() * grades.length)];
                    const points = gradePoints[grade];

                    student.semesters[sem].push({
                        code: subject.code,
                        name: subject.name,
                        credits: subject.credits,
                        grade: grade,
                        points: (points * subject.credits).toFixed(2)
                    });

                    totalPoints += points * subject.credits;
                    totalCredits += subject.credits;
                });

                student.semesters[sem].sgpa = (totalPoints / totalCredits).toFixed(2);
                student.semesters[sem].cgpa = (Math.random() * 4.0).toFixed(2);
            }

            studentsData.push(student);
        }
    }
}

function showMarksheet() {
    let roll = document.getElementById("roll").value.trim().toUpperCase();
    let course = document.getElementById("branch").value;
    let semester = document.getElementById("semester").value;

    let error = document.getElementById("error");
    let success = document.getElementById("success");

    error.innerText = "";
    success.innerText = "";

    if (roll === "" || course === "" || semester === "") {
        error.innerText = "❌ Please fill all details";
        return;
    }

    // Search for student in studentsData
    const student = studentsData.find(s => s.roll === roll);
    if (!student) {
        error.innerText = "❌ Roll number not found";
        return;
    }

    if (student.course !== course) {
        error.innerText = "❌ Course mismatch. Please select the correct course";
        return;
    }

    const semesterData = student.semesters[semester];
    if (!semesterData) {
        error.innerText = "❌ Semester data not available";
        return;
    }

    // Display student info
    document.getElementById("showRoll").innerText = student.roll;
    document.getElementById("showName").innerText = student.name;
    document.getElementById("showBranch").innerText = course;
    document.getElementById("showSemester").innerText = semester + ' Semester';

    // Display subjects
    let tableHTML = '';
    semesterData.forEach(sub => {
        if (sub.code) {
            tableHTML += `<tr>
                <td>${sub.code}</td>
                <td>${sub.name}</td>
                <td>${sub.credits}</td>
                <td><strong>${sub.grade}</strong></td>
                <td>${sub.points}</td>
            </tr>`;
        }
    });
    document.getElementById("subjectsTable").innerHTML = tableHTML;

    // Display SGPA and CGPA
    document.getElementById("sgpa").innerText = semesterData.sgpa;
    document.getElementById("cgpa").innerText = semesterData.cgpa;

    // Determine pass/fail
    const hasF = semesterData.some(s => s.grade === 'F');
    const resultStatus = document.getElementById("resultStatus");
    if (hasF) {
        resultStatus.innerText = "Pass";
        resultStatus.className = "Pass";
    } else {
        resultStatus.innerText = "PASS";
        resultStatus.className = "pass";
    }

    document.getElementById("marksheet").style.display = "block";
    success.innerText = "✅ Result retrieved successfully";

    window.scrollTo({
        top: document.getElementById("marksheet").offsetTop - 50,
        behavior: "smooth"
    });
}

function printMarksheet() {
    window.print();
}

function downloadMarksheet() {
    const element = document.getElementById("marksheet");
    const roll = document.getElementById("showRoll").innerText;
    const sem = document.getElementById("showSemester").innerText;

    const opt = {
        margin: 10,
        filename: `Marksheet_${roll}_${sem}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(element).save();
}

// Generate student data on page load
generateStudentsData();

// Allow Enter key to submit
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        showMarksheet();
    }
});
