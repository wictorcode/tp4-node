document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let shouldRequestBackend = true

    if (!email || !password) {
        alert("L'un des champs n'a pas été renseigné!")
        shouldRequestBackend = false
    }

    const signupData = { email, password };

    if (!shouldRequestBackend) { return }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Connexion réussie !");
        console.log("Réponse du serveur :", data);
        // rediriger ou afficher autre chose ici jsp, faudra renvoyer vers la page de gestion des comptes 
        location.href = '/pages/signup';
      } else {
        alert(`Erreur lors de la connexion : ${data.message}`);
      }
    } catch (err) {
      alert(`Erreur réseau : ${err.message}`);
    }
  });
});
