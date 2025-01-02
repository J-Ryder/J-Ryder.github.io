const characterURL = 'Descriptions/characterdata.txt';
let characterData = [];

function flipCard(card){
    card.classList.toggle('flipped');
    const keyword = card.id.replace('Card', '');
    displayAttachment(keyword);
}

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
    if (character) {

        //Character Name
        const characternameElement = document.querySelector(`#${characterName}Card .character-name`);
        if (characternameElement) {
            characternameElement.textContent = `${characterName}`;
            characternameElement.alt = `${characterName} Image`;
            //console.log(`Image source set to: Icons/${characterName}.png`);
        } else {
            console.error("Image element not found for:", characterName);
        }

        //Profile Picture
        const profileimageElement = document.querySelector(`#${characterName}Card .profile-image`);
        if (profileimageElement) {
            profileimageElement.src = `Icons/${characterName}.PNG`;
            profileimageElement.alt = `${characterName} Image`;
            //console.log(`Image source set to: Icons/${characterName}.png`);
        } else {
            console.error("Image element not found for:", characterName);
        }

        //Class Picture
        const classimageElement = document.querySelector(`#${characterName}Card .class-image`);
        if (classimageElement) {
            classimageElement.src = `Icons/${character.class}.PNG`;
            classimageElement.alt = `${character.class} Image`;
            //console.log(`Image source set to: Icons/${characterName}.png`);
        } else {
            console.error("Class image element not found for:", characterName);
        }

        //Gun
        const mainweaponElement = document.querySelector(`#${characterName}Card .gun-name`);
        if (mainweaponElement) {
            mainweaponElement.textContent = `${character.mainweapon}`;
            mainweaponElement.alt = `${characterName} Image`;
            //console.log(`Image source set to: Icons/${characterName}.png`);
        } else {
            console.error("Class image element not found for:", characterName);
        }

    } else {
        console.error("Character not found:", characterName);
    }
}

function displayAttachment(characterName) {
    const character = characterData.find(c => c.name === characterName);
    if (character) {
        const outputElement = document.getElementById(`GunAttachment`);
        if (outputElement) {
            outputElement.textContent = character.attachment || "No attachment found";
        } else {
            console.error("Output element not found for:", characterName);
        }
    } else {
        console.error("Character not found:", characterName);
    }
}

document.addEventListener("DOMContentLoaded", async() => {
    await loadCharacterFile();
    initializeCharacters();
});
