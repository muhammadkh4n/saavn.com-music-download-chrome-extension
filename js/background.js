/**
 * Created by muhammadkh4n on 9/20/16.
 */

chrome.runtime.onMessage.addListener(
    function (req, sender, sendRes) {
        //console.log(sender.tab ? "from a content script: " + sender.tab.url : "from the extension");
        if (req.download) {
            chrome.downloads.download(req.download);
            sendRes({
                msg: 'Downloading...'
            });
        }
    });