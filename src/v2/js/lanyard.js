const userId = '589800051447037962';
const name = document.getElementById('discord-name');
const pfp = document.getElementById('discord-pfp');
const status = document.getElementById('discord-status');
const statusIndicator = document.getElementById('status-indicator');

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
                        let statusText = activities[index].state ? activities[index].state : "";
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
    });