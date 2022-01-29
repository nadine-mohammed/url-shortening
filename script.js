const shortenBtn = document.getElementById("shortenBtn");
const shortenInp = document.getElementById("inp");
const error = document.getElementById("error");
const allSuggest = document.getElementById("allSuggest");
const menuIco = document.getElementById("menu-ico");
const menuOptions = document.getElementById("menu-options");
//
let userUrl = "";
let resultUrl = "";
let count = 0;
shortenBtn.addEventListener("click", function () {
  let userTxt = shortenInp.value;
  if (userTxt.length === 0) {
    error.innerText = "Please add your link";
    error.style.display = "block";
    shortenInp.classList.add("inpError");
  } else {
    error.style.display = "none";
    shortenInp.classList.remove("inpError");
    shortenInp.value = "";
    userUrl = userTxt;
    count++;
    getShortenLinks();
  }
});
async function getShortenLinks() {
  let isValid = validURL(userUrl);
  if (isValid) {
    let data = await fetch(`https://api.shrtco.de/v2/shorten?url=${userUrl}`);
    let response = await data.json();
    //
    resultUrl = response.result.full_short_link;
    let resultCont = document.createElement("div");
    resultCont.classList.add("alert");
    resultCont.classList.add("alert-light");
    resultCont.classList.add("custom-suggest-mob");
    //
    // console.log(resultUrl);
    //
    resultCont.innerHTML = `
      <div class="suggestItemBody">
        <div class="originalLink">${userUrl}</div>
        <div class="suggest-line-mob"></div>
        <div class="resultLink-copyBtn-cont">
            <a href=${resultUrl} target="_blank" class="resultLink"
              >${resultUrl}</a
            >
            <!-- change text to copied and add class copied if user clicked -->
            <div class="copyBtn" id="copyBtn_${count}" onClick="onCopyTxt('${resultUrl}',${count})">Copy</div>
          </div>
      </div>
  `;
    allSuggest.append(resultCont);
  } else {
    error.innerText = "Please add a valid link";
    error.style.display = "block";
    shortenInp.classList.add("inpError");
  }
}
function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}
function onCopyTxt(resUrl, btnNum) {
  let copyBtn = document.getElementById(`copyBtn_${btnNum}`);
  copyBtn.classList.add("copied");
  copyBtn.innerText = "Copied";
  navigator.clipboard.writeText(resUrl);
}
menuIco.addEventListener("click", () => {
  menuOptions.style.display =
    menuOptions.style.display === "none" ? "block" : "none";
});
