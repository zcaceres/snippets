function readNYT() {
    copy(window.__preloadedData.initialData.data.article.sprinkledBody.content.filter(content => content.__typename === 'ParagraphBlock').map(block => block.content).map(content => content.map(c => c.text).join(' ')).join('\n\n'))
}

readNYT()
console.log("Now paste into your text editor!")
