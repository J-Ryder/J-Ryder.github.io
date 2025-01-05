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