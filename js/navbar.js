let n = document.querySelector("nav");
n.setAttribute("class", "hidden");

document.querySelector("#menu").addEventListener("click", () => {
    if (n.getAttribute("class") === "hidden") {
        n.setAttribute("class", "visible");
    } else {
        n.setAttribute("class", "hidden");
    }
});