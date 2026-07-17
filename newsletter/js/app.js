// =========================================
// AI Executive Brief
// TELYON
// Newsletter Subscription
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("newsletterForm");

    if (!form) return;

    const submitButton = form.querySelector("button");

    //==========================================
    // CONFIGURACIÓN
    //==========================================

    const WEBHOOK_URL = "https://n8n-1sjl.srv1612224.hstgr.cloud/webhook-test/9c26e2dd-b6db-40f6-a2ea-303635f5b97d";

    //==========================================
    // Crear contenedor de mensajes
    //==========================================

    const messageBox = document.createElement("div");

    messageBox.style.marginTop = "20px";
    messageBox.style.padding = "15px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.display = "none";
    messageBox.style.fontWeight = "600";
    messageBox.style.textAlign = "center";

    form.appendChild(messageBox);

    //==========================================
    // Mostrar mensaje
    //==========================================

    function showMessage(text, success = true) {

        messageBox.style.display = "block";

        if (success) {

            messageBox.style.background = "#ECFDF5";
            messageBox.style.color = "#065F46";
            messageBox.style.border = "1px solid #10B981";

        } else {

            messageBox.style.background = "#FEF2F2";
            messageBox.style.color = "#991B1B";
            messageBox.style.border = "1px solid #EF4444";

        }

        messageBox.innerHTML = text;

    }

    //==========================================
    // Validación simple
    //==========================================

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

    //==========================================
    // Evento Submit
    //==========================================

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        messageBox.style.display = "none";

        const data = {

            nombre: form.nombre.value.trim(),

            cargo: form.cargo.value.trim(),

            empresa: form.empresa.value.trim(),

            correo: form.correo.value.trim(),

            pais: form.pais.value.trim()

        };

        //======================================
        // Validaciones
        //======================================

        if (

            !data.nombre ||

            !data.cargo ||

            !data.empresa ||

            !data.correo ||

            !data.pais

        ) {

            showMessage("Completa todos los campos.", false);

            return;

        }

        if (!validateEmail(data.correo)) {

            showMessage("El correo electrónico no es válido.", false);

            return;

        }

        //======================================
        // Cambiar botón
        //======================================

        submitButton.disabled = true;

        const originalText = submitButton.innerText;

        submitButton.innerText = "Enviando...";

        try {

            const response = await fetch(WEBHOOK_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(data)

            });

            if (!response.ok) {

                throw new Error("Error del servidor");

            }

            showMessage(
                "✅ Gracias por suscribirte.<br><br>Muy pronto comenzarás a recibir el AI Executive Brief en tu correo."
            );

            form.reset();

        } catch (error) {

            console.error(error);

            showMessage(
                "Ocurrió un problema al registrar la suscripción. Inténtalo nuevamente.",
                false
            );

        } finally {

            submitButton.disabled = false;

            submitButton.innerText = originalText;

        }

    });

});
