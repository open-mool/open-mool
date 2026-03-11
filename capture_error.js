fetch("http://localhost:8787/api/media/search?q=test")
    .then(r => r.text())
    .then(console.log)
    .catch(console.error);
