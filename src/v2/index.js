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

let userId = '589800051447037962';
let name = document.getElementById('discord-name');
let pfp = document.getElementById('discord-pfp');
let status = document.getElementById('discord-status');
let statusIndicator = document.getElementById('status-indicator');
let songTitle = document.getElementById('song-title');
let songArtist = document.getElementById('song-artist');
let songImage = document.getElementById('song-image');
let songImageLink = document.getElementById('song-image-link');

const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const user = data.data.discord_user;
        const avatarId = user.avatar;
        pfp.src = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;
        name.innerText = user.display_name;
        const activities = data.data.activities;
        if (activities.length > 0) {
            let statusEmoji = activities[0].emoji ? activities[0].emoji.name : "";
            let statusText = activities[0].state ? activities[0].state : "";
            status.innerText = (statusEmoji + " " + statusText).trim();
        }

        statusIndicator.classList.remove('status-online', 'status-idle', 'status-dnd');
        switch (data.data.discord_status) {
            case 'online':
                statusIndicator.classList.add('status-online');
                statusIndicator.title = "online!!";
                break;
            case 'idle':
                statusIndicator.classList.add('status-idle');
                statusIndicator.title = "gone";
                break;
            case 'dnd':
                statusIndicator.classList.add('status-dnd');
                statusIndicator.title = "not to be disturbed!!!";
                break;
            default:
                break;
        }

        if (activities.length > 1) {
            let index = 0;
            while (index < activities.length) {
                if (activities[index].name == "Spotify" || activities[index].name == "Feishin" || activities[index].name == "Custom Status") {
                    index++;
                }
                else {
                    status.innerText = "Playing " + activities[index].name + " - " + status.innerText;
                    break;
                }
            }
        }

        if(data.data.listening_to_spotify) {
            let spotifyData = data.data.spotify;

            document.getElementsByClassName('song-info')[0].style.display = 'flex';
            songTitle.innerText = spotifyData.song;
            songTitle.href = `spotify:track:${spotifyData.track_id}`;
            songArtist.innerText = spotifyData.artist;
            songImage.src = spotifyData.album_art_url;
            songImage.title = "Album: " + spotifyData.album;
        }
    });