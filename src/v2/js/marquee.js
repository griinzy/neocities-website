let messages = [];
let index = 0;

const marqueeText = document.getElementsByClassName("marquee-text")[0];

async function loadMessages() {
    const response = await fetch("texts.txt");
    const text = await response.text();

    // Split into message/link pairs
    messages = text.split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
        .map(line => {
            const [msg, url] = line.split('|');
            return { msg, url: url || null };
        });

    showNextMessage();
    setInterval(showNextMessage, 12000);
}

function showNextMessage() {
    const { msg, url } = messages[index];

    // Clear old content
    marqueeText.innerHTML = '';

    if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.textContent = msg;
        a.target = '_blank'; // Optional: open in new tab
        marqueeText.appendChild(a);
    } else {
        marqueeText.textContent = msg;
    }

    // Restart animation
    marqueeText.style.animation = "none";
    void marqueeText.offsetWidth;
    marqueeText.style.animation = "slideLeft 10s linear forwards";

    index = (index + 1) % messages.length;
}

loadMessages();