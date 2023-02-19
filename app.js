const form = document.querySelector("#search");

/*-------------------SEARCHED WORD-------------------*/
const overviewContentMain = document.querySelector(".overview-content-main");
const overviewContentPronunciation = document.querySelector(".overview-content-pronunciation");
const overviewButton = document.querySelector("overview-button");

/*------------------------NOUN------------------------*/
const nounSynonym = document.querySelector(".explenation-synonyms");

/*------------------------VERB------------------------*/
const nounMeaningList = document.querySelector("#noun-list")
const verbMeaningList = document.querySelector("#verb-list")
const nounQuotation = document.querySelector(".explenation-quotation");

/*------------------------SOURCE------------------------*/
const sourceLink = document.querySelector(".source-link");


form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const searchTerm = form.elements.query.value;
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
    
    console.log(response.data);

    const listOfExplanationVerb = response.data[0].meanings[0].definitions;
    for (let i = 0; i < 3 ; i++) {
        const newLi = document.createElement("li");
        newLi.append(listOfExplanationVerb[i].definition);
        nounMeaningList.append(newLi);
    }

    const listOfExplanationNoun = response.data[0].meanings[1].definitions;
    for (let i = 0; i < 1 ; i++) {
        const newLi = document.createElement("li");
        newLi.append(listOfExplanationVerb[i].definition);
        verbMeaningList.append(newLi);
    }

    pronunciationData = response.data[0].phonetic;
    synonymData = response.data[0].meanings[0].synonyms[3];
    quotationData = response.data[0].meanings[0].definitions[1].definition;
    sourceData = response.data[0].sourceUrls[0];

    overviewContentMain.append(searchTerm);
    overviewContentPronunciation.append(pronunciationData);
    nounSynonym.append(synonymData);
    nounQuotation.append(`"${quotationData}"`);
    sourceLink.href = sourceData;
    sourceLink.append(sourceData);

})