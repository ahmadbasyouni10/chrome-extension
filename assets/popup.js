// async for the function to wait for the promises from chrome.tabs.query and chrome.scripting.executeScript to resolve
async function changeBackgroundColor() {
    try {
        const colorPicker = document.getElementById('colorPicker');
        const selectedColor = colorPicker.value;
    
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: (color) => {
            document.body.style.backgroundColor = color;
            console.log('Color changed to ' + color);
        },
        args: [selectedColor]
    });
}   catch (error) {
        console.error('Failed to change the background color: ' + error);
    }
}

document.getElementById('myButton').addEventListener('click', changeBackgroundColor);