const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function() {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen 
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}

const selectElement = (selector) => {
    const element  = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Cannot find the element ${selector}`);
}

const form = selectElement('form');
const input = selectElement('input');
const result = selectElement('.result');
const navbar = selectElement('.navbar');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const url = input.value;
    
    shortenUrl(url);
})

async function shortenUrl(url) {
    try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const data = await res.json();
      const newUrl = document.createElement("div");
      newUrl.classList.add("item");
      newUrl.innerHTML = `
     <p class="final-link"> ${data.result.short_link}</p>
     <button class="newUrl-btn" >Copy!</button>
     `;
      result.prepend(newUrl);
      const copyBtn = result.querySelector(".newUrl-btn");
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
      });
      input.value = "";
    } catch (err) {
      console.log(err);
    }
  }

  
