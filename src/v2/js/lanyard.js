let userId = '589800051447037962';
let name = document.getElementById('discord-name');
let pfp = document.getElementById('discord-pfp');
let status = document.getElementById('discord-status');
let statusIndicator = document.getElementById('status-indicator');
let songTitle = document.getElementById('song-title');
let songArtist = document.getElementById('song-artist');
let songImage = document.getElementById('song-image');
let songImageLink = document.getElementById('song-image-link');

const lanyardUrl = `https://api.lanyard.rest/v1/users/${userId}`;
fetch(lanyardUrl)
    .then(response => response.json())
    .then(data => {
        const user = data.data.discord_user;
        const avatarId = user.avatar;
        pfp.src = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;
        let userActivity;
        let userStatus;
        let foundActivityFlag = false;
        name.innerText = user.display_name;
        const activities = data.data.activities;

        if(activities.length > 0) {
            let index = 0;
            while(index < activities.length) {
                if(!(activities[index].name == "Spotify" || activities[index].name == "Feishin")) {
                    if(activities[index].id == "custom") {
                        let statusEmoji = activities[index].emoji ? activities[index].emoji.name : "";
                        let statusText = activites[index].state ? activities[index].state : "";
                        userStatus = (statusEmoji + " " + statusText).trim();
                    }

                    else {
                        if(!foundActivityFlag) {
                            userActivity = "Playing " + activities[index].name;
                            foundActivityFlag = true;
                        }
                    }
                }
                index++;
            }

            if(userActivity && userStatus) {
                status.innerText = userActivity + " - " + userStatus;
            } 
            else if(userActivity && !userStatus) {
                status.innerText = userActivity;
            }
            else if(!userActivity && userStatus) {
                status.innerText = userStatus;
            }
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