  function downloadPDF(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// ===== DATA =====
let roll = document.getElementById("roll").value.toUpperCase();
let branch = document.getElementById("branch").value;

let student = students[roll];

if(!student){
    alert("No Data Found");
    return;
}

let total = student.marks.reduce((a,b)=>a+b,0);
let percent = total;
let result = (percent >= 40) ? "PASS" : "FAIL";

// ===== HEADER =====
doc.setFont("helvetica", "bold");
doc.setFontSize(18);
doc.text("XYZ UNIVERSITY OF TECHNOLOGY", 105, 15, {align:"center"});

doc.setFontSize(12);
doc.text("Examination Department - Mid Semester Examination 2026", 105, 23, {align:"center"});

doc.line(10, 28, 200, 28);

// ===== STUDENT INFO =====
doc.setFontSize(11);
doc.setFont("helvetica", "normal");

doc.text("Roll Number: " + roll, 15, 40);
doc.text("Name: " + student.name, 15, 48);
doc.text("Branch: " + student.branch, 15, 56);
doc.text("Semester: 3", 150, 40);

// ===== TABLE HEADER =====
doc.setFont("helvetica", "bold");
doc.text("Subject", 20, 75);
doc.text("Max Marks", 80, 75);
doc.text("Obtained", 140, 75);

doc.line(15, 78, 195, 78);

// ===== SUBJECT ROWS =====
doc.setFont("helvetica", "normal");

let y = 88;

for(let i=0;i<5;i++){

doc.text("Subject " + (i+1), 20, y);
doc.text("20", 85, y);
doc.text(String(student.marks[i]), 145, y);

y += 10;
}

// ===== TOTAL =====
doc.line(15, y, 195, y);

doc.setFont("bold");
doc.text("Total", 20, y+10);
doc.text("100", 85, y+10);
doc.text(String(total), 145, y+10);

// ===== RESULT =====
doc.setFontSize(12);
doc.setTextColor(0, 0, 255);
doc.text("Percentage: " + percent.toFixed(2) + "%", 20, y+25);

if(result === "PASS"){
    doc.setTextColor(0, 150, 0);
}else{
    doc.setTextColor(200, 0, 0);
}

doc.text("Result: " + result, 150, y+25);

// ===== FOOTER =====
doc.setTextColor(0,0,0);
doc.setFontSize(10);

doc.text("Controller of Examination", 20, 270);
doc.text("Principal Signature", 150, 270);

doc.line(15, 265, 80, 265);
doc.line(130, 265, 190, 265);

// ===== SAVE =====
doc.save(roll + "_University_Marksheet.pdf");

}
