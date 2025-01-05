// This file is responsible for retrieving the color from the color input element and passing it to the content script
function getUserColor() {
    const colorPicker = document.getElementById('colorPicker');
    const selectedColor = colorPicker.value;
    return selectedColor;
}

async function changeBackgroundColor() {
    try {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
        // target is what allows document.body to be the context of the page not the popup
        target: {tabId: tab.id},
        func: (color) => {
            document.body.style.backgroundColor = color;
            console.log('Color changed to ' + color);
        },
        // args is the argument passed to the function, way the API is designed
        args: [getUserColor()]
    });
}   catch (error) {
        console.error('Failed to change the background color: ' + error);
    }
}

document.getElementById('myButton').addEventListener('click', changeBackgroundColor);