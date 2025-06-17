const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songImage = document.getElementById('song-image');
const songImageLink = document.getElementById('song-image-link');
const songStatus = document.getElementById('song-status');

const lastfmUrl = `https://api.gunjicordia.xyz/lastfm/recent-tracks`;

fetch(lastfmUrl)
    .then(response => response.json())
    .then(data => {
        const song = data.recenttracks.track[0];

        songTitle.innerText = song.name;
        songTitle.href = song.url;

        songArtist.innerText = song.artist['#text'];
        songArtist.href = song.url.split('/_/')[0];

        if(song['@attr']?.nowplaying == 'true') {
            songStatus.innerText = 'currently listening to:';
        }
        else {
            songStatus.innerText = 'last listened to:';
        }

        songImage.src = song.image[2]['#text'];
        songImage.title = `Album: ${song.album['#text']}`;
    })