/**
 * Created by muhammadkh4n on 9/20/16.
 */

var nowPlaying = document.getElementById('now-playing');

if (nowPlaying) {
    var meta = nowPlaying.getElementsByClassName('meta-wrap')[0];
    var a = document.createElement('a');
    a.setAttribute('id', 'download-song');
    a.setAttribute('class', 'btn x-small green');
    a.style.display = 'inline';
    a.textContent = 'Download Song';
    meta.appendChild(a);
    console.log('playing');

    var script = document.createElement('script');
    script.textContent = ''
        + 'document.getElementById("download-song").addEventListener("click", function() {'
        +   'window.postMessage({'
        +     'url: Player.currentSongUrl,'
        +     'song: Player.getCurrentSong()'
        +   '}, "*");'
        + '}, false);';
    document.body.appendChild(script);
}

window.addEventListener("message", function (event) {
    if (event.source != window)
        return;

    if (event.data.url && event.data.song) {
        console.log(event.data.url, event.data.song);
        var title = event.data.song.title.replace(/\/\\*/, "&");
        var album = event.data.song.album.replace(/\/\\*/, "&");
        console.log(title, album);
        var options = {
            url: event.data.url,
            filename: title + " - " + album + ".mp3"
        };
        chrome.runtime.sendMessage({download: options}, function (res) {
            console.log(res.msg);
        });
    }
});