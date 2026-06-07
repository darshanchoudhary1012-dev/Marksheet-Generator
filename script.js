 // ===== Random Students Data (500 students) =====
let students = {};
let branches = ["CS","IT","EC","ME","CE"];

function randomMarks(){
    return [
        Math.floor(Math.random()*21),
        Math.floor(Math.random()*21),
        Math.floor(Math.random()*21),
        Math.floor(Math.random()*21),
        Math.floor(Math.random()*21)
    ];
}

// Generate 100 students per branch
branches.forEach(branch=>{
    for(let i=1;i<=100;i++){
        let roll = branch + String(i).padStart(3,'0');

        students[roll] = {
            name: branch + " Student " + i,
            branch: branch,
            marks: randomMarks()
        };
    }
});

// ===== RESULT FUNCTION =====
function getResult(){

let roll = document.getElementById("roll").value.toUpperCase();
let branch = document.getElementById("branch").value;

let student = students[roll];

if(!student){
    document.getElementById("error").innerText = "❌ Roll Not Found";
    return;
}

if(branch && student.branch !== branch){
    document.getElementById("error").innerText = "❌ Wrong Branch Selected";
    return;
}

document.getElementById("error").innerText = "";
document.getElementById("resultBox").style.display = "block";

document.getElementById("name").innerText = student.name;
document.getElementById("info").innerText = "Branch: " + student.branch;

let tbody = "";
let total = 0;

for(let i=0;i<5;i++){
    total += student.marks[i];
    tbody += `
        <tr>
            <td>Subject ${i+1}</td>
            <td>${student.marks[i]}</td>
            <td>20</td>
        </tr>`;
}

document.getElementById("tableBody").innerHTML = tbody;

document.getElementById("total").innerText = total;

let percentage = total;

document.getElementById("percent").innerText = percentage.toFixed(2);

// ===== Remark =====
let remark = (percentage >= 40) ? "PASS" : "FAIL";

document.getElementById("remark").innerText = remark;
document.getElementById("remark").className = (percentage >= 40) ? "pass" : "fail";

}
