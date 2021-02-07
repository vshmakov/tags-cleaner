import {getDownloadButton, readFile} from "./files.js"

new class {
    constructor() {
        this.download = document.getElementById("download")
        this.files = []
        document.querySelector('input[type=file]')
            .addEventListener("change", this.onChange.bind(this), false)
    }

    onChange(event) {
        this.render(event.target.files)
    }

    async render(files) {
        this.download.innerHTML = ''

        if (0 !== files.length) {
            this.download.innerHTML = '<h1>Скачать файлы</h1>'
        }

        for (const file of files) {
            const div = document.createElement('div')
            const button = getDownloadButton(file.name, await this.getCleanedFileContent(file))
            div.append(button)
            this.download.append(div)
        }
    }

    async getCleanedFileContent(file) {
        const parser = new DOMParser()
        const text = await readFile(file)
        const element = parser.parseFromString(text, "application/xml")

        for (let i = 1; i <= 10; i++) {
            const tags = element.querySelectorAll(`ИнфПолФХЖ3`)
        console.log(tags)
        }

        const serializer = new XMLSerializer()

        return serializer.serializeToString(element)
    }
}
