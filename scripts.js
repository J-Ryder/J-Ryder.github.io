const attachmenturl = 'Descriptions/attachment.txt';

function flipCard(card){
    card.classList.toggle('flipped');
    const keyword = card.id.replace('Card', '');
    displayattachment(keyword);
}

async function displayattachment(keyword) {
    try{
        const attachmentresponse = await fetch(attachmenturl);
        if(!attachmentresponse.ok) {
            throw new Error ('HTTP error');
        }

        const attachmenttext = await attachmentresponse.text();

        const lines = attachmenttext.split("\n");
        let result = "";
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === keyword) {
                result = lines[i + 1].trim(); 
                break;
            }
        }

        const outputElement = document.getElementById(keyword + 'Output');
        outputElement.textContent = result || "No matching paragraphs found";
    }
    catch(error) {
        const outputElement = document.getElementById(keyword + 'Output');
        outputElement.textContent = `Error: ${error.message}`;
    }
};