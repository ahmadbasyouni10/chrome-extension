chrome.tabs.onUpdated.addListener(
    // call back function that takes tabId and changeInfo as arguments
    function(tabId, changeInfo, tab){
    console.log(tab.url)
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("youtube.com/watch")) {
        // get the query parameters from the url (uniquq video id)
        const queryParameters = tab.url.split('?')[1];
        // web api to store the query parameters in a URLSearchParams object (like hashmap)
        const urlParams = new URLSearchParams(queryParameters);
        console.log(urlParams)
        
        // send a message from the listener to the content script, tabId is the id of the tab that was updated
        // message will be available in runtime 
        chrome.tabs.sendMessage(tabId, {
            type: 'NEW',
            videoId: urlParams.get('v')
        });
    }
});

// this would be how to show alert when the extension icon is clicked
/* chrome.action.onClicked.addListener((tab) => {
    // send a message to the content script to toggle the display of the bookmarks
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function : () => {
            alert('Hello from the extension')
        }
    });
}) */