function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	document.getElementById("num-results").innerText = studs.length;
	const students = document.getElementById("students")
	for(const student of studs) {
		const studentInfo = document.createElement("div");
		studentInfo.className = "col-12 col-md-6 col-lg-4 col-xl-3 student-info";

		// Add student name to studentInfo
		const studentName = document.createElement("h2");
		const name = student.name.first + " " + student.name.last;
		studentName.innerText = name;
		studentInfo.appendChild(studentName);

		// Add student major to studentInfo
		const studentMajor = document.createElement("p");
		studentMajor.innerText = "Major: " + student.major;
		studentInfo.appendChild(studentMajor);

		// Add student credit hours to studentInfo
		const studentCredits = document.createElement("p");
		studentCredits.innerText = "Credit hours: " + student.numCredits;
		studentInfo.appendChild(studentCredits);

		// Add student backroundInfo to studentInfo
		const studentBackground = document.createElement("p");
		studentBackground.innerText = name + " is" + `${student.fromWisconsin ? " " : " not"}` + "from Wisconsin";
		studentInfo.appendChild(studentBackground);

		// Add interests to studentInfo
		const studentInterestsTitle = document.createElement("p");
		studentInterestsTitle.innerText = "Interests:";
		studentInfo.appendChild(studentInterestsTitle);
		const studentInterests = document.createElement("ul");
		for(const interest of student.interests) {
			const interestItem = document.createElement("li");
			interestItem.innerText = interest;
			studentInterests.appendChild(interestItem);
		}
		studentInfo.appendChild(studentInterests);

		// Add studentInfo to students
		students.appendChild(studentInfo);
	}
	
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
	fetch("https://cs571.org/api/s24/hw2/students", {
		headers: {
			"X-CS571-ID": CS571.getBadgerId()
		}
	}).then(res => {
		if (res.status === 200 || res.status === 304) {
			return res.json()
		} else {
			throw new Error();
		}
	}).then(data => {
		console.log(data);
		buildStudents(data);
	}).catch(err => {
		console.log(err);
	})
}

document.getElementById("search-btn").addEventListener("click", handleSearch);