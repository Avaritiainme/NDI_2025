// Sélectionne l'élément HTML où afficher le résultat (facultatif)
const keyPressedDisplay = document.getElementById("keyPressed");

// Première étape : attendre la première touche "ArrowUp"
document.addEventListener("keydown", function step1(event) {
    if (event.key === "ArrowUp") {
        console.log("Étape 1 : ArrowUp détecté");
        if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 1 : ArrowUp détecté";

        // Passer à l'étape suivante
        document.addEventListener("keydown", function step2(event) {
            if (event.key === "ArrowUp") {
                console.log("Étape 2 : ArrowUp détecté");
                if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 2 : ArrowUp détecté";

                // Étape suivante
                document.addEventListener("keydown", function step3(event) {
                    if (event.key === "ArrowDown") {
                        console.log("Étape 3 : ArrowDown détecté");
                        if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 3 : ArrowDown détecté";

                        // Étape suivante
                        document.addEventListener("keydown", function step4(event) {
                            if (event.key === "ArrowDown") {
                                console.log("Étape 4 : ArrowDown détecté");
                                if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 4 : ArrowDown détecté";

                                // Étape suivante
                                document.addEventListener("keydown", function step5(event) {
                                    if (event.key === "ArrowLeft") {
                                        console.log("Étape 5 : ArrowLeft détecté");
                                        if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 5 : ArrowLeft détecté";

                                        // Étape suivante
                                        document.addEventListener("keydown", function step6(event) {
                                            if (event.key === "ArrowRight") {
                                                console.log("Étape 6 : ArrowRight détecté");
                                                if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 6 : ArrowRight détecté";

                                                // Étape suivante
                                                document.addEventListener("keydown", function step7(event) {
                                                    if (event.key === "ArrowLeft") {
                                                        console.log("Étape 7 : ArrowLeft détecté");
                                                        if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 7 : ArrowLeft détecté";

                                                        // Étape suivante
                                                        document.addEventListener("keydown", function step8(event) {
                                                            if (event.key === "ArrowRight") {
                                                                console.log("Étape 8 : ArrowRight détecté");
                                                                if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 8 : ArrowRight détecté";

                                                                // Étape suivante
                                                                document.addEventListener("keydown", function step9(event) {
                                                                    if (event.key === "b" || event.key === "B") {
                                                                        console.log("Étape 9 : B détecté");
                                                                        if (keyPressedDisplay) keyPressedDisplay.textContent = "Étape 9 : B détecté";

                                                                        // Étape suivante
                                                                        document.addEventListener("keydown", function step10(event) {
                                                                            if (event.key === "a" || event.key === "A") {
                                                                                console.log("Konami Code activé !");
                                                                                if (keyPressedDisplay) keyPressedDisplay.textContent = "Konami Code activé !";
                                                                            }
                                                                        }, { once: true });
                                                                    }
                                                                }, { once: true });
                                                            }
                                                        }, { once: true });
                                                    }
                                                }, { once: true });
                                            }
                                        }, { once: true });
                                    }
                                }, { once: true });
                            }
                        }, { once: true });
                    }
                }, { once: true });
            }
        }, { once: true });
    }
});

