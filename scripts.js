const characterURL = 'Descriptions/characterdata.txt';
let characterData = [];


function flipCard(card){
    card.classList.toggle('flipped');
    const keyword = card.id.replace('Card', '');
    displayattachment(keyword);
}

async function loadCharacterFile() {
    try {
        const characterResponse = await fetch(characterURL);

        if (!characterResponse.ok) {
            throw new Error("Failed to fetch the character file");
        }

        const characterText = await characterResponse.text;

        characterData = parseCharacterData(characterText);
        console.log("Character data loaded:", attachmentData);
    }
    catch(error) {
        console.error("Error loading character file:", error);
    }
}

function parseCharacterData(text) {
    const data = [];
    const characters = text.trim().split("\n\n");

    characters.forEach(characterBlock => {
        const clines = characterBlock.split("\n");
        const characterObj = {};

        lines.forEach(line => {
            if (line.startsWith("character:")) {
                characterObj.name = line.replace("character:", "").trim();
            }
            else if (line.startsWith("class:")) {
                characterObj.class = line.replace("class:", "").trim();
            }
            else if (line.startsWith("attachment:")) {
                characterObj.attachment = line.replace("attachment:", "").trim();
            }
        });

        if (characterObj.name && characterObj.class) {
            data.push(characterObj);
        }
    });
    return data;
}

function displayAttachment(characterName) {
    const character = characterData.find(c =>c.name ===characterName);

    if (character) {
        const outputElement = document.getElementById(`${characterName}Output`);
        outputElement.textContent = character.attachment || "No attachment found";
    }
}

loadCharacterFile();