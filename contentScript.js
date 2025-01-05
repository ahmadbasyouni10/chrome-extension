// to add a button to the youtube dom and add bookmarks to the extension we need content script to interact with context of the page
(()=>{
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = null;
    // run time message listener to receive the video id from the background script
    chrome.runtime.onMessage.addListener((messageobj, sender, response) => {
        // message object is received from the background script we defined in the background.js
        if (messageobj.type === 'NEW'){
            currentVideo = messageobj.videoId
            console.log(currentVideo)
            // to be implemented later, will add a button to the youtube player and allow add bookmarks
            newVideoLoaded()
    }})
    
    function newVideoLoaded(){
        const bookmarkButtonExists = document.getElementsByClassName('bookmark-button').length > 0;

        if (!bookmarkButtonExists) {
            const bookmarkButton = document.createElement('img')
            bookmarkButton.src = chrome.runtime.getURL("/assets/save.png");
            console.log(bookmarkButton.src)

            bookmarkButton.title = "Bookmark current timestamp";
            bookmarkButton.className = "bookmark-button";

            bookmarkButton.style.width = "25px";
            bookmarkButton.style.height = "25px";
            bookmarkButton.style.margin = "10px 10px";
            bookmarkButton.style.alignItems = "center";
            bookmarkButton.style.cursor = "pointer";
            // query selector returns first element that matches the selector
            // the player of the video is stored in the video-stream class
            youtubePlayer = document.querySelector('.video-stream');
            youtubeLeftControls = document.querySelector('.ytp-right-controls');

            if (youtubeLeftControls) {
                youtubeLeftControls.insertBefore(bookmarkButton, youtubeLeftControls.firstChild);
            }
        }
        

        
    }
})() // IIFE to avoid polluting the global scope