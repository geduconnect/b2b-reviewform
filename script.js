document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Add current date/time
  document.getElementById("dateTime").value = new Date().toLocaleString();

  const formData = new FormData(this);

  fetch("https://script.google.com/macros/s/AKfycbyXoMlmkZdGSCHxzXT3AmvtWMa8HT6ZiYT8M3sWOWYejrvIT262kX48OuLCpd-A28d1/exec", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(response => {
      document.getElementById("responseArea").innerHTML = `
        <strong>Enquiry submitted!</strong><br>
        Your Enquiry ID: <code>${response.enquiryId}</code><br>
        Please save this ID to check admin remarks later.
      `;
      this.reset();
    })
    .catch(error => {
      document.getElementById("responseArea").textContent = "Submission failed.";
      console.error("Error!", error.message);
    });
});

function checkRemarks() {
  const id = document.getElementById("checkId").value.trim();
  if (!id) {
    alert("Please enter your Enquiry ID.");
    return;
  }

  fetch(`https://script.google.com/macros/s/AKfycbyXoMlmkZdGSCHxzXT3AmvtWMa8HT6ZiYT8M3sWOWYejrvIT262kX48OuLCpd-A28d1/exec?enquiryId=${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("adminResponse").textContent = "No remarks found for this ID.";
      } else {
        document.getElementById("adminResponse").innerHTML = `<strong>Admin Remarks:</strong> ${data.adminRemarks}`;
      }
    })
    .catch(() => {
      document.getElementById("adminResponse").textContent = "Error fetching remarks.";
    });
}
