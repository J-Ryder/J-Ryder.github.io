const characterFiles = [
    'data/Cheeta.json',
    // 'data/Groza.json',
    // 'data/Colphne.json',
    // 'data/Daiyan.json',
    // 'data/Krolik.json',
    // 'data/Ksenia.json',
    // 'data/Littara.json',
    // 'data/Lotta.json',
    // 'data/Makiatto.json',
    // 'data/Mosin-Nagant.json',
    // 'data/Nagant.json',
    // 'data/Nemesis.json',
    // 'data/Papasha.json',
    // 'data/Peritya.json',
    // 'data/Qiongjiu.json',
    // 'data/Sabrina.json',
    // 'data/Sharkry.json',
    // 'data/Suomi.json',
    // 'data/Tololo.json',
    // 'data/Ullrid.json',
    // 'data/Vepley.json'
]

let characterData = [];

async function loadCharacterFiles() {
    try {
        const characterPromises = characterFiles.map(async (filePath) => {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch character file: ${filePath}`);
            }
            return await response.json();
        });

        // Wait for all files to load
        const characters = await Promise.all(characterPromises);
        characterData = characters.map((character) => character.character); // Assuming each JSON has a "character" key

        console.log("All character data loaded:", characterData);
    } catch (error) {
        console.error("Error loading character files:", error);
    }
}

async function initializeCharacters() {
    console.log("Initializing characters...");
    if (characterData.length === 0) {
        await loadCharacterFiles();
    }

    characterData.forEach((character) => {
        createCharacterCard(character);
    });
}

function createCharacterCard(character) {
    const container = document.querySelector('.container');

    const card = document.createElement('div');
    card.className = 'card',
    card.id = '${character.character}Card';
    card.onclick = () => flipCard(card);

    const inner = document.createElement('div');
    inner.className = 'inner';

    const front = document.createElement('div');
    front.className = 'front';

    const characterName = document.createElement('h');
    characterName.id = 'CharacterTitle';
    characterName.className = 'character-name';
    characterName.textContent = character.character;

    const gunName = document.createElement('p');
    gunName.id = 'Gun';
    gunName.className = 'gun-name';
    gunName.textContent = character.mainweapon;

    const profileImage = document.createElement('img');
    profileImage.src = `Icons/${character.character}.PNG`;
    profileImage.className = 'profile-image';
    profileImage.alt = `${character.character} Profile`;

    const classImage = document.createElement('img');
    classImage.src = `Icons/${character.class}.PNG`;
    classImage.className = 'class-image';
    classImage.alt = `${character.class} Class`;

    const back = document.createElement('div');
    back.className = 'back';

    const backTitle = document.createElement('h1');
    backTitle.textContent = 'Temp';

    front.append(characterName, gunName, profileImage, classImage);
    back.append(backTitle);
    inner.append(front, back);
    card.append(inner);
    container.append(card);
}

function flipCard(card) {
    card.classList.toggle('flipped');
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadCharacterFiles();
    initializeCharacters();
});