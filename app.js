/*-----------------------HEADER-----------------------*/
const bodyColor = document.querySelector("body");
const darkModeButton = document.querySelector(".dark-mode-slider-dot");
const errorImg = document.querySelector("#error-img");

darkModeButton.addEventListener("click", () => {
    darkModeButton.classList.toggle("dark-mode-slider-dot-left");
    bodyColor.classList.toggle("body-dark");
    errorImg.classList.toggle("error-img-iverted");
})
/*-------------------SEARCHED WORD-------------------*/
const form = document.querySelector("#search");
const overviewContentMain = document.querySelector(".overview-content-main");
const overviewContentPronunciation = document.querySelector(".overview-content-pronunciation");
const overviewButton = document.querySelector(".overview-button");
/*------------------------NOUN------------------------*/
const nounSynonym = document.querySelector(".explenation-synonyms");
/*------------------------VERB------------------------*/
const nounMeaningList = document.querySelector("#noun-list")
const verbMeaningList = document.querySelector("#verb-list")
const nounQuotation = document.querySelector(".explenation-quotation");
/*------------------------SOURCE------------------------*/
const sourceLink = document.querySelector(".source-link");
/*-----------------WHOLE CONTENT CONTAINER--------------*/
const mainContainer = document.querySelector("#main-container")
const errorContainer = document.querySelector("#error-container")
let audioData = new Audio();

let listOfElements = [
    overviewContentMain,
    overviewContentPronunciation,
    overviewButton,
    nounSynonym,
    nounMeaningList,
    verbMeaningList,
    nounQuotation,
    sourceLink,
]

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const searchTerm = form.elements.query.value;
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        errorContainer.classList.add("non-displaying");
        /*Clearing out previously appended data*/
        for (let el of listOfElements) {
            el.innerHTML = "";
        }
        /*Getting data from JSON*/
        const pronunciationData = response.data[0].phonetic;
        let audioLink = response.data[0].phonetics[0].audio;
        audioData.src = audioLink;
        const listOfExplanationVerb = response.data[0].meanings[0].definitions;
        const synonymData = response.data[0].meanings[0].synonyms[3];
        const listOfExplanationNoun = response.data[0].meanings[1].definitions;
        const quotationData = response.data[0].meanings[0].definitions[1].definition;
        const sourceData = response.data[0].sourceUrls[0];
        /*Appending data to elements*/
        overviewContentMain.append(searchTerm.toLowerCase());
        overviewContentPronunciation.append(pronunciationData);
        for (let i = 0; i < 3 ; i++) {
            const newLi = document.createElement("li");
            newLi.append(listOfExplanationVerb[i].definition);
            nounMeaningList.append(newLi);
        }
        nounSynonym.append(synonymData);
        for (let i = 0; i < 1 ; i++) {
            const newLi = document.createElement("li");
            newLi.append(listOfExplanationNoun[i].definition);
            verbMeaningList.append(newLi);
        }
        nounQuotation.append(`"${quotationData}"`);
        sourceLink.href = sourceData;
        sourceLink.append(sourceData);
        /*Sound player*/
        overviewButton.addEventListener("click", () => {
            audioData.play();
        })
        /*Making whole container appear*/
        mainContainer.classList.remove("non-displaying");
    } catch (e) {
        console.log(e);
        mainContainer.classList.add("non-displaying");
        errorContainer.classList.remove("non-displaying");
    }
})
