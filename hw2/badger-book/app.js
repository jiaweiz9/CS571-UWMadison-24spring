function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	document.getElementById("num-results").innerText = studs.length;
	
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