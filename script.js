document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("dateTime").value = new Date().toLocaleString();
  const formData = new FormData(this);

  fetch("https://script.google.com/macros/s/AKfycbyXoMlmkZdGSCHxzXT3AmvtWMa8HT6ZiYT8M3sWOWYejrvIT262kX48OuLCpd-A28d1/exec", {
    method: "POST",
    body: formData, // No manual headers!
  })
    .then((res) => res.json())
    .then((response) => {
      document.getElementById("responseArea").innerHTML = `
        <strong>Enquiry submitted!</strong><br>
        Your Enquiry ID: <code>${response.enquiryId}</code><br>
        Save this ID to check admin remarks later.
      `;
      document.getElementById("enquiryForm").reset();
    })
    .catch((err) => {
      document.getElementById("responseArea").textContent = "Error submitting enquiry.";
      console.error(err);
    });
});

function checkRemarks() {
  const id = document.getElementById("checkId").value.trim();
  if (!id) return alert("Please enter your Enquiry ID.");

  fetch(`https://script.google.com/macros/s/AKfycbyXoMlmkZdGSCHxzXT3AmvtWMa8HT6ZiYT8M3sWOWYejrvIT262kX48OuLCpd-A28d1/exec?enquiryId=${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("adminResponse").textContent = "No remarks found.";
      } else {
        document.getElementById("adminResponse").innerHTML = `<strong>Admin Remarks:</strong> ${data.adminRemarks}`;
      }
    })
    .catch(() => {
      document.getElementById("adminResponse").textContent = "Error fetching remarks.";
    });
}
