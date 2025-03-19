/*Load check*/
console.log ("Main is loaded.");

/*Responsive navigation menu function.*/
function menuFunction() {
    let x = document.getElementById("main-menu");
    if (x.className === "menu") {
        x.className+= "responsive";
    }
    else {
        x.className = "menu";
    }
}

/*Dropdowns for the poems*/
export function dropdownArrow() {
    const poetryItem = document.querySelectorAll(".poetry-item");

    poetryItem.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
}

function init() {
    dropdownArrow();
}

document.addEventListener("DOMContentLoaded", init);


/*Contact Form Functions*/
async function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById("contact-form");
    const formData = new FormData(form);

    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    try {
        const response = await fetch("/submit-form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
        });

        if (!response.ok) {
            throw new Error("Could not connect to the server.");
        }

        const result = await response.json();
        console.log("Success!", result);

        const formMessage = document.getElementById("form-message");
        formMessage.textContent = "Thank you for your message!";
        formMessage.style.color = "green";
    } catch (error) {
        console.error("Error: ", error);

        const formMessage = document.createElement("form-message");
        formMessage.textContent = "Uh-oh! There was an error delivering your message!";
        formMessage.style.color = "red";
    }

    form.reset();
}

const form = document.getElementById("contact-form");
form.addEventListener("submit", submitForm);