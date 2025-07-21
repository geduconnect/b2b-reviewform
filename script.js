document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Set date/time
  document.getElementById("dateTime").value = new Date().toLocaleString();

  const formData = new FormData(this);

  fetch("https://script.google.com/macros/s/AKfycbyXoMlmkZdGSCHxzXT3AmvtWMa8HT6ZiYT8M3sWOWYejrvIT262kX48OuLCpd-A28d1/exec", {
    method: "POST",
    body: formData  // NO headers
  })
    .then((res) => res.json())
    .then((response) => {
      document.getElementById("responseArea").innerHTML = `
        <strong>Submitted!</strong><br>
        Enquiry ID: <code>${response.enquiryId}</code>
      `;
      this.reset();
    })
    .catch((err) => {
      document.getElementById("responseArea").textContent = "Error submitting form.";
      console.error(err);
    });
});
