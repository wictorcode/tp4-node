document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.querySelector(".button");

  signupButton.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let shouldRequestBackend = true

    if (!username || !email || !password) {
        alert("L'un des champs n'a pas été renseigné!")
        shouldRequestBackend = false
    }

    if (password.length < 8) {
        alert("Le mot de passe n'est pas assez long (au moins 8 caractères)")
        shouldRequestBackend = false
    }

    const signupData = { name: username, email, password };

    if (!shouldRequestBackend) {
        return
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inscription réussie !");
        console.log("Réponse du serveur :", data);
        // rediriger ou afficher autre chose ici jsp, faudra renvoyer vers 
      } else {
        alert(`Erreur lors de l'inscription : ${data.message}`);
      }
    } catch (err) {
      alert(`Erreur réseau : ${err.message}`);
    }
  });
});
