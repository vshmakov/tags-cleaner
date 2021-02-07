import {getDownloadButton, readFile} from "./files.js"

new class {
    constructor() {
        this.download = document.getElementById("download")
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
            const text = await readFile(file)
            const button = getDownloadButton(file.name, this.getCleanedText(text))
            div.append(button)
            this.download.append(div)
        }
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
