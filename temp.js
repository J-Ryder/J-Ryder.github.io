const attachmenturl = 'Descriptions/attachment.txt';

function flipCard(card) {
    card.classList.toggle('flipped');
    const keyword = card.id.replace('Card', '');  // This will be 'Cheeta', 'Groza', etc.
    displayattachment(keyword);
}

async function displayattachment(keyword) {
    try {
        const attachmentresponse = await fetch(attachmenturl);
        if (!attachmentresponse.ok) {
            throw new Error('HTTP error');
        }

        const attachmenttext = await attachmentresponse.text();
        const lines = attachmenttext.split("\n");
        let result = "";
        let characterFound = false;
        let characterClass = '';
        let profileImage = '';
        let classImage = '';

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('character:' + keyword)) {
                // Once we find the character line, we search for the attachment and other details
                characterFound = true;
                
                // Extract class, profile image, and class image
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].trim().startsWith('class:')) {
                        characterClass = lines[j].trim().replace('class:', '').trim();
                        break;
                    }
                }

                // Define profile image and class image paths based on character
                profileImage = `Icons/${keyword}.png`; // Assuming each character's profile image is named after the character (e.g., Cheeta.png)
                classImage = `Icons/${characterClass}.png`; // Assuming class images are named after the class (e.g., Support.png)

                // Now extract the attachment
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].trim().startsWith('attachment:')) {
                        result = lines[j].trim().replace('attachment:', '').trim();
                        break;
                    }
                }

                break;
            }
        }

        // If the character is found, update the profile and class images, and display the attachment
        if (characterFound) {
            const outputElement = document.getElementById(keyword + 'Output');
            outputElement.textContent = result || "No attachment found";

            // Update profile image and class image based on character and class
            const profileImgElement = document.querySelector(`#${keyword}Card .profile-image`);
            const classImgElement = document.querySelector(`#${keyword}Card .class-image`);
            profileImgElement.src = profileImage;
            classImgElement.src = classImage;
        } else {
            // If the character is not found, display an error
            const outputElement = document.getElementById(keyword + 'Output');
            outputElement.textContent = "Character not found";
        }

    } catch (error) {
        const outputElement = document.getElementById(keyword + 'Output');
        outputElement.textContent = `Error: ${error.message}`;
    }
}


let characterData = [
    { name: "Cheeta", class: "Support", attachment: "Phase Strike" },
    { name: "Groza", class: "Bulwark", attachment: "Allay Support" },
    // more characters
  ];