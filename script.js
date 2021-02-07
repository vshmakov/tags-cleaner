import {getDownloadLink, readFile, unicodeToWin1251_UrlEncoded} from "./files.js"

const encoding = 'windows-1251';

new class {
    constructor() {
        this.download = document.getElementById("download")
        document.querySelector('input[type=file]')
            .addEventListener("change", this.onChange.bind(this), false)
    }

    async onChange(event) {
        this.download.innerHTML = ''

        for (const file of event.target.files) {
            const text = await readFile(file, encoding)
            this.renderDownloadLink(file.name, text)
        }
    }

    renderDownloadLink(fileName, text) {
        const cleanedText = this.getCleanedText(text)
        const encodedText = unicodeToWin1251_UrlEncoded(cleanedText)
        const link = getDownloadLink(fileName, encodedText, encoding)
        const div = document.createElement('div')
        div.append(link)
        this.download.append(div)
    }

    getCleanedText(text) {
        const parser = new DOMParser()
        const element = parser.parseFromString(text, "application/xml")

        for (let i = 1; i <= 100; i++) {
            const tags = element.querySelectorAll(`ИнфПолФХЖ${i}`)

            for (const tag of tags) {
                tag.remove()
            }
        }

        const serializer = new XMLSerializer()

        return serializer.serializeToString(element)
    }
}
