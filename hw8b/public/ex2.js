document.getElementById("btn").addEventListener("click", async () => {
  const response = await fetch("/api/countries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "John",
      countries: ["USA", "France", "Japan"]
    })
  });

  const data = await response.json();
  document.getElementById("result").textContent = data.message;
});
