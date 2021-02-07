export function readFile(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsText(file);
    })
}


export function getDownloadButton(filename, text) {
    const button = document.createElement('a')
    button.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    button.setAttribute('download', filename)
    button.innerHTML = filename
    button.setAttribute('role', 'button')

    return button
}
