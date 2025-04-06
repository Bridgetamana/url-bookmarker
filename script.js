let myUrl = []
// const inputEl = document.getElementById("input-el")
// const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")

let myUrlStorage = JSON.parse(localStorage.getItem("myUrl"))
if (myUrlStorage) {
    myUrl = myUrlStorage
    render(myUrl)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myUrl.push(tabs[0].url)
        localStorage.setItem("myUrl", JSON.stringify(myUrl))
        render(myUrl)
    })
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.removeItem("myUrl")
    myUrl = []
    render(myUrl)
})

function render(url) {
    let listItems = ""
    for (let i = 0; i < url.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${url[i]}'>
                    ${url[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
