const characterURL = 'Descriptions/characterdata.txt';
let characterData = [];

async function loadCharacterFile() {
    try {
        const characterResponse = await fetch(characterURL);

        if (!characterResponse.ok) {
            throw new Error("Failed to fetch the character file");
        }

        const characterText = await characterResponse.text();

        characterData = parseCharacterData(characterText);
        console.log("Character data loaded:", characterData);
    }
    catch(error) {
        console.error("Error loading character file:", error);
    }
}

function parseCharacterData(text) {
    const data = [];
    const characters = text.trim().replace(/\r/g, '').split("\n\n");

    const propertyMap = {
        "character:": "name",
        "class:": "class",
        "attachment:": "attachment",
        "helix:": "helix",
        "mainweapon:": "mainweapon",
        "desiredweapon": "desiredweapon"
    };

    characters.forEach((characterBlock, index) => {
        const lines = characterBlock.trim().split("\n").filter(line => line.trim() !== "");  // Remove empty lines
        const characterObj = {};

        lines.forEach(line => {
            for (const prefix in propertyMap) {
                if (line.startsWith(prefix)) {
                    const property = propertyMap[prefix];
                    characterObj[property] = line.replace(prefix, "").trim();
                    break;
                }
            }
        });

        if (characterObj.name && characterObj.class) {
            data.push(characterObj);
        }
    });

    return data;
}

async function initializeCharacters() {
    console.log("Initializing characters...");
    if (characterData.length === 0) {
        await loadCharacterFile();
    }
    else {
        characterData.forEach(character => {
            displayCharacter(character.name);
        });
    }
}

function displayCharacter(characterName) {
    console.log('Displaying character:', characterName);
    const character = characterData.find(c => c.name === characterName);
    if (!character) {
        console.error("Character not found:", characterName);
        return;
    }
    // Set the character's name
    setElementContent(`#${characterName}Card .character-name`, 'textContent', characterName, `${characterName} Name`);

    // Set profile image
    setElementContent(`#${characterName}Card .profile-image`, 'src', `Icons/${characterName}.PNG`, `${characterName} Profile`);

    // Set class image
    setElementContent(`#${characterName}Card .class-image`, 'src', `Icons/${character.class}.PNG`, `${character.class} Class`);

    // Set main weapon
    setElementContent(`#${characterName}Card .gun-name`, 'textContent', character.mainweapon, `${characterName} Gun`);

    // Set weapon attachment
    setElementContent(`#${characterName}Card .gunattachment-name`, 'textContent', character.attachment, `${characterName} Attachment`);
}

//function setElementContent(NameCard, class name, type(src, text), alt text)
function setElementContent(selector, property, content, altText='') {
    const element = document.querySelector(selector);
    if (element) {
        element[property] = content;
        if (altText) {
            element.altText = altText;
        }
    }
    else {
        console.error(`${property} element not found for:`, characterName);
    }
}

function flipCard(card){
    card.classList.toggle('flipped');
    const keyword = card.id.replace('Card', '');
}

document.addEventListener("DOMContentLoaded", async() => {
    await loadCharacterFile();
    initializeCharacters();
});
