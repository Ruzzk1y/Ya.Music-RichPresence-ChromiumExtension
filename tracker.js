let curInterval; //a variable to write intervals' IDs into.
const intervalTimeout = 5000;
const stopPresence = () => {
    if (!curInterval) return console.warn("There is no presences running. Start it with DiscordPresence.start()");
    else curInterval = clearInterval(curInterval)
}
const startPresence = () => {
    if (curInterval) return console.warn("Presence is already running. Stop it with DiscordPresence.stop()");
    else curInterval = setInterval(sendStatus, intervalTimeout);
}

window.onload = () => {
    try {
        //just in case
        if (!this.externalAPI) throw 'No externalAPI detected.'
        externalAPI.on()
    } catch (err) {
        console.error(err)
    }
    this.DiscordPresence = {}
    this.DiscordPresence.stop = stopPresence
    this.DiscordPresence.start = startPresence
    DiscordPresence.start()
}

const getArtists = (artists) => {
    let arr = [];
    artists.forEach(el => {
        arr.push(el.title);
    });
    return arr;
}

function sendStatus() {
    try {
        let curTrack = externalAPI.getCurrentTrack()
        chrome.runtime.sendMessage("bdbccjihnmipdcecmnepnbaopiopnpbb", { //kphhfggecppaojfkaneoffipofbhckai
            title: curTrack.title,
            album_title: curTrack.album.title,
            artists: getArtists(curTrack.artists),
            playlist_title: externalAPI.getSourceInfo().title,
            progress: externalAPI.getProgress().position,
            isPlaying: externalAPI.isPlaying(),
            __DRP: true
        }, () => { });
    }
    catch (err) { console.log(err); }
}