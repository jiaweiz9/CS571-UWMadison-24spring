function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    jobs = document.getElementsByName('job');
    for (let job of jobs) {
        if (job.checked) {
            alert("Thank you for applying the " + job.value + " position!");
        }
    }
}

document.getElementById("apply-job").addEventListener("submit", (e) => submitApplication(e));
