const saveButton = document.getElementById("input-btn");
const inputEl = document.getElementById("input-element");
const ulEl = document.getElementById("ul-el");
const deleteButton = document.getElementById("delete-btn");
const tabButton = document.getElementById("tab-btn");

let myLinks = []

const linksLocalStorage = JSON.parse(localStorage.getItem("MyLinks"));

if (linksLocalStorage) {
    myLinks = linksLocalStorage;
    render(myLinks);
}

tabButton.addEventListener("click", function (tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("MyLinks", JSON.stringify(myLinks));
        render(myLinks);
    });
});

function render(leads) {
    let listItems = "";

    for (item of leads) {
        listItems += `
            <li> 
                <a href="${item}" target="_blank">
                    ${item}
                </a>
            </li>`;
    }

    ulEl.innerHTML = listItems;
}

deleteButton.addEventListener("dblclick", function () {
    localStorage.clear();
    myLinks = [];
    render(myLinks);
});

saveButton.addEventListener("click", function () {
    myLinks.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("MyLinks", JSON.stringify(myLinks));
    render(myLinks);
});

