const dropArea = document.getElementById('drop-area')
const uploadStatus = document.getElementById('upload-status')

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight() {
    dropArea.classList.add('highlight')
}

function unhighlight() {
    dropArea.classList.remove('highlight')
}

function handleDrop(e) {
    handleFile(e.dataTransfer.files[0])
}

function handleFile(file) {
    resetPageState()

    if (file.type !== 'application/pdf') {
        uploadStatus.textContent = 'File non in formato PDF'
        uploadStatus.className = 'upload-status error'
        return
    }

    processFile(file)
    uploadStatus.textContent = `File Caricato`
    uploadStatus.className = 'upload-status'
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});

dropArea.addEventListener('drop', handleDrop, false)

dropArea.addEventListener('click', () => {
    document.getElementById("fileUploader").click()
})

const { PDFDocument, PDFName, PDFDict, PDFRef, PDFSignature} = PDFLib
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.mjs`

//Producer Hack
PDFDocument.prototype.updateInfoDict = function () {

}

let worker

window.onload = function() {
    const colonne = document.querySelectorAll('.colonna-testo, .colonna-icona')
    const array_lunghezze = Array.from(colonne, (x) => x.offsetWidth)
    const larghezzaMassima = Math.max(...array_lunghezze)
    colonne.forEach(colonna => {
        colonna.style.width = `${larghezzaMassima}px`
        colonna.style.minWidth = `${larghezzaMassima}px`
    })
}

function autoresize(textarea) {
    textarea.style.display = "block"
    textarea.style.resize = "vertical"
    textarea.style.height = '0px'
    textarea.style.height = (textarea.scrollHeight+10) + 'px'
}

function setGreenCheck(elem) {
    elem.setAttribute("href","#check")
    elem.style.fill = "#40b0a6"
}
function setRedMark(elem) {
    elem.setAttribute("href","#xmark")
    elem.style.fill = "#dc3220"
}
function setWarning(elem) {
    elem.setAttribute("href","#warning")
    elem.style.fill = "#ffcc00"
}
function setEmpty(elem) {
    elem.setAttribute("href","")
}
function showSaveButton() {
    document.getElementById("btn-save").style.display = "block"
}
function hideSaveButton() {
    document.getElementById("btn-save").style.display = "none"
}

function trigger_input(element) {
    if (document.getElementById(element).value.length === 0) {
        setRedMark(document.getElementById("check-"+element))
        document.getElementById(element+"_warn").style.display = "block"
        hideSaveButton()
    } else {
        setGreenCheck(document.getElementById("check-"+element))
        document.getElementById(element+"_warn").style.display = "none"
        checkAll()
    }
    error_warn()
}

function error_warn()
{
    const tw = document.getElementById("titolo_warn").style.display
    const ow = document.getElementById("oggetto_warn").style.display
    const aw = document.getElementById("autore_warn").style.display
    document.getElementById("error_icon").style.display = "block"
    if(tw==="none" && ow==="none" && aw==="none") {
        document.getElementById("error_icon").style.display = "none"
        warn()
    }
    else {
        document.getElementById("warn_icon").style.display = "none"
        document.getElementById("pdfa_warn").style.display = "none"
        document.getElementById("font_warn").style.display = "none"
        document.getElementById("firme_warn").style.display = "none"
    }
}

function warn() {
    const pw = document.getElementById("pdfa_warn").getAttribute("flag")
    const fow = document.getElementById("font_warn").getAttribute("flag")
    const fw = document.getElementById("firme_warn").getAttribute("flag")
    if( pw==="false" && fow==="false" && fw==="false") document.getElementById("warn_icon").style.display = "none"
    else document.getElementById("warn_icon").style.display = "block"
    if(pw==="false") document.getElementById("pdfa_warn").style.display = "none"
    else document.getElementById("pdfa_warn").style.display = "block"
    if(fow==="false") document.getElementById("font_warn").style.display = "none"
    else document.getElementById("font_warn").style.display = "block"
    if(fw==="false") document.getElementById("firme_warn").style.display = "none"
    else document.getElementById("firme_warn").style.display = "block"
}

document.getElementById("titolo").addEventListener('input', (value) => {
    trigger_input("titolo")
})
document.getElementById("oggetto").addEventListener('input', (value) => {
    trigger_input("oggetto")
})
document.getElementById("autore").addEventListener('input', (value) => {
    trigger_input("autore")
})

function checkAll()
{
    let titolo_ok = false
    let oggetto_ok = false
    let autore_ok = false
    const titolo = document.getElementById("titolo").value
    const oggetto = document.getElementById("oggetto").value
    const autore = document.getElementById("autore").value
    if (titolo !== undefined && titolo !== "") titolo_ok = true
    if (oggetto !== undefined && oggetto !== "") oggetto_ok = true
    if (autore !== undefined && autore !== "") autore_ok = true
    if(titolo_ok && oggetto_ok && autore_ok) showSaveButton()
    else hideSaveButton()
}

async function alert_warn() {
    const pw = document.getElementById("pdfa_warn").getAttribute("flag")
    const fow = document.getElementById("font_warn").getAttribute("flag")
    const fw = document.getElementById("firme_warn").getAttribute("flag")
    let alert_text = ""
    if(pw==="true") alert_text += "<li>Il file non è nel formato PDF/A.</li><li>Ricordarsi di impostare la spunta per i PDF/A nelle opzioni di Word.</li>"
    if(fow==="true") alert_text += "<li>Trovati font non inclusi nel PDF, questi font verrano sostituiti durante la conversione.</li><li>Verificare che il file finale non presenti difetti grafici.</li>"
    if(fw==="true") alert_text += "<li>Le firme digitali verranno rimosse."

    if (alert_text !== "") await Swal.fire({
                title: 'Avviso',
                html: "<ul style=\"text-align:left\">" + alert_text + "</ul>",
                icon: 'warning',
                confirmButtonText: 'OK',
                backdrop: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                customClass: {
                    container: 'my-swal-container',
                    popup: 'my-swal-popup',
                    header: 'my-swal-header',
                    title: 'my-swal-title',
                    content: 'my-swal-content',
                    confirmButton: 'my-swal-confirm-button'
                }
    })
}

async function downloadPDF() {
    const blob64 = await setMetadata()
    var filename = document.getElementById("fileUploader").files[0].name
    filename = filename.slice(0, -4)+"_metadati.pdf"
    const pdfBytes = await loaded_pdf.save({ useObjectStreams : false, addDefaultPage : false})
    const blob = new Blob([pdfBytes], {type: "application/pdf"})
    const url = window.URL.createObjectURL(blob)
    const dataObject = {psDataURL: url, pdfmark:blob64}
    await alert_warn()
    await worker.postMessage({ data: dataObject, target: 'wasm'})
    Swal.fire({
        title: 'Elaborazione in corso',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })
    new Promise((resolve, reject)=>{
        const listener = (e) => {
            resolve(e.data)
            const xhr = new XMLHttpRequest()
            xhr.open("GET", e.data)
            xhr.responseType = "arraybuffer"
            xhr.onload = function () {
                window.URL.revokeObjectURL(e.data)
                const blob = new Blob([xhr.response], {type: "application/pdf"})
                download(blob, filename, "application/pdf")
                const pdfURL = window.URL.createObjectURL(blob)
                const size = xhr.response.byteLength
                resolve({pdfURL, size})
            }
            xhr.send()
            worker.removeEventListener('message', listener)
            setTimeout(()=> worker.terminate(), 0)
        }
        worker.addEventListener('message', listener)
    })
    Swal.close()
}

document.getElementById('btn-save').addEventListener('click', async () => {
    if (loaded_pdf !== undefined) await downloadPDF()
})

function resetPageState()
{
    document.getElementById('titolo').disabled = false
    document.getElementById('oggetto').disabled = false
    document.getElementById('autore').disabled = false
    document.getElementById('titolo').value = ""
    document.getElementById('oggetto').value = ""
    document.getElementById('autore').value = ""
    document.getElementById('pdfa').innerText = "No"
    document.getElementById('firme').innerHTML = "Nessuna"
    document.getElementById('oggetto').value = ""
    document.getElementById('autore').value = ""
    setRedMark(document.getElementById('check-titolo'))
    setRedMark(document.getElementById('check-oggetto'))
    setRedMark(document.getElementById('check-autore'))
    setRedMark(document.getElementById('check-pdfa'))
    setEmpty(document.getElementById('check-firme'))
    document.getElementById("titolo_warn").style.display = "none"
    document.getElementById("oggetto_warn").style.display = "none"
    document.getElementById("autore_warn").style.display = "none"
    document.getElementById("pdfa_warn").style.display = "none"
    document.getElementById("font_warn").style.display = "none"
    document.getElementById("firme_warn").style.display = "none"
    document.getElementById("error_icon").style.display = "none"
    document.getElementById("warn_icon").style.display = "none"
    document.getElementById("pdfa_warn").setAttribute("flag","false")
    document.getElementById("font_warn").setAttribute("flag","false")
    document.getElementById("firme_warn").setAttribute("flag","false")
    document.getElementById('div_icona_pdf').style.display = "block"
    document.getElementById("canvas-preview").width = 0
    document.getElementById("canvas-preview").height = 0
    document.getElementById("canvas-preview").style.width = 0
    document.getElementById("canvas-preview").style.height = 0
    document.getElementById("canvas-div").style.height = 0
    uploadStatus.textContent = ''
    hideSaveButton()
}

let loaded_pdf

function processFile(file) {
    const reader = new FileReader()
    reader.addEventListener('load', async () => {
        worker = new Worker(new URL('./background-worker.js', window.location.href ),{type: 'module'})
        const buffer = reader.result
        const pdf_data = new Uint8Array(buffer)

        loaded_pdf = await PDFDocument.load(pdf_data).catch(error => {
            uploadStatus.textContent = `Errore durante il caricamento del file "${file.name}"`
            console.log(error.message)
            uploadStatus.className = 'upload-status error'
        })

        const titolo = loaded_pdf.getTitle()
        const oggetto = loaded_pdf.getSubject()
        const tags = loaded_pdf.getKeywords()
        const autore = loaded_pdf.getAuthor()

        if (titolo !== undefined && titolo !== "") {
            document.getElementById('titolo').value = titolo
            setGreenCheck(document.getElementById('check-titolo'))
        }
        if (oggetto !== undefined && oggetto !== "") {
            document.getElementById('oggetto').value = oggetto
            setGreenCheck(document.getElementById('check-oggetto'))
        }
        if (autore !== undefined && autore !== "") {
            document.getElementById('autore').value = autore
            setGreenCheck(document.getElementById('check-autore'))
        }
        const pdfa = checkPDFA()
        if (pdfa !== undefined && pdfa.isPDFA) {
            document.getElementById('pdfa').innerText = pdfa.version
            setGreenCheck(document.getElementById('check-pdfa'))
        }
        else document.getElementById("pdfa_warn").setAttribute("flag","true")

        const notEmbeddedFonts = await findNotEmbeddedFonts(loaded_pdf)
        if (notEmbeddedFonts.size >0) document.getElementById("font_warn").setAttribute("flag","true")

        const firme = hasDigitalSignatures()
        if (firme !== undefined && firme.hasSignatures) {
            document.getElementById('firme').innerHTML = firme.fieldNames.join('<br />')
            setWarning(document.getElementById('check-firme'))
            document.getElementById("firme_warn").setAttribute("flag","true")
        }

        trigger_input("titolo")
        trigger_input("oggetto")
        trigger_input("autore")

        await removeSignatures(loaded_pdf)

        autoresize(document.getElementById('titolo'))
        autoresize(document.getElementById('oggetto'))
        autoresize(document.getElementById('autore'))
        document.getElementById('titolo').style.height = document.getElementById('titolo').parentElement.clientHeight + 'px'
        document.getElementById('oggetto').style.height = document.getElementById('oggetto').parentElement.clientHeight + 'px'
        document.getElementById('autore').style.height = document.getElementById('autore').parentElement.clientHeight + 'px'
        document.getElementById('canvas-div').style.display = "block"

        //RENDER PREVIEW
        const pdf = pdfjsLib.getDocument({ data: pdf_data }).promise.then( (pdf) => {
            document.getElementById('div_icona_pdf').style.display = "none"
            pdf.getPage(1).then(function(page) {
                var viewport = page.getViewport({ scale: 1, })
                //var scale = 0.85
                scale = document.getElementById("preview_title").clientWidth / viewport.width
                if (scale > 1) scale = 1
                viewport = page.getViewport({ scale: scale })

                var outputScale = window.devicePixelRatio || 1

                var canvas = document.getElementById('canvas-preview')
                var context = canvas.getContext('2d')

                document.getElementById("canvas-div").style.height = "auto"
                canvas.width = Math.floor(viewport.width * outputScale)
                canvas.height = Math.floor(viewport.height * outputScale)
                canvas.style.width = Math.floor(viewport.width) + "px"
                canvas.style.height =  Math.floor(viewport.height) + "px"

                var transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null

                var renderContext = {
                    canvasContext: context,
                    transform: transform,
                    viewport: viewport
                }
                page.render(renderContext)
            }) 
        })
        dropArea.scrollIntoView({
            behavior: 'smooth'
        })

    })

    reader.readAsArrayBuffer(file)
}

document.getElementById('fileUploader').addEventListener('change', ({target}) => {
    handleFile(target.files[0])
})

function checkPDFAFromAttributes(xml)
{
    let pdfaidPart
    let pdfaidConformance
    for (let i = 0; i < xml.children.length; i++) {
        let res = loopElements(xml.children[i], pdfaidPart, pdfaidConformance)
        if(res.part !== undefined) pdfaidPart = res.part
        if(res.conformance !== undefined) pdfaidConformance = res.conformance
    }
    if (pdfaidPart !== undefined && pdfaidConformance !== undefined) return `PDF/A-${pdfaidPart}${pdfaidConformance}`
    return ""
}

function loopElements(xml, part, conformance)
{
    if(xml.hasAttributes()) {
        for (let i = 0; i < xml.attributes.length; i++) {
            let attr = xml.attributes[i]
            if(attr.name === "pdfaid:part") part = attr.value
            if(attr.name === "pdfaid:conformance") conformance = attr.value
        }
    }
    for (let i = 0; i < xml.children.length; i++) {
        let res = loopElements(xml.children[i], part, conformance)
        if(res.part !== undefined) part = res.part
        if(res.conformance !== undefined) conformance = res.conformance
    }
    return {part:part,conformance:conformance}
}

function checkPDFAFromTags(xml)
{
    let pdfaidPart
    let pdfaidConformance
    const pdfaidPartTag = xml.getElementsByTagName("pdfaid:part")
    const pdfaidConformanceTag = xml.getElementsByTagName("pdfaid:conformance")
    if (pdfaidPartTag.length > 0 && pdfaidConformanceTag.length > 0) {
        pdfaidPart = pdfaidPartTag[0].textContent
        pdfaidConformance = pdfaidConformanceTag[0].textContent
        return `PDF/A-${pdfaidPart}${pdfaidConformance}`
    }
    return ""
}


function checkPDFA() {
    try {
        let pdfaVersion = ""
        const pdfMetadata = loaded_pdf.catalog.get(PDFName.of('Metadata'))
        if (pdfMetadata) {
            const metadataContents = loaded_pdf.context.lookup(pdfMetadata).contents
            const metadataString = new TextDecoder().decode(metadataContents)
            const parser = new DOMParser()
            const doc = parser.parseFromString(metadataString, "application/xml")

            pdfaVersion = checkPDFAFromTags(doc)
            if(pdfaVersion === "") pdfaVersion = checkPDFAFromAttributes(doc)
            if(pdfaVersion !== "") {
                console.log(`Il PDF sembra essere conforme allo standard: ${pdfaVersion}`)
                return { isPDFA: true, version: pdfaVersion}
            } 
        }
        console.log(`Il PDF non sembra essere conforme allo standard PDF/A`)
        return { isPDFA: false, version: pdfaVersion}
    } catch (error) {
        console.error('Errore durante la verifica della versione PDF/A:', error)
        return { isPDFA: false, version: pdfaVersion}
    }
}

function hasDigitalSignatures() {
    try {
        let hasSignatures = false
        let signatureFieldsCount = 0
        const signatureFieldNames = []

        const acroFormRef = loaded_pdf.catalog.get(PDFName.of('AcroForm'))
        const acroForm = loaded_pdf.context.lookup(acroFormRef)
        if (acroForm && acroForm.has(PDFName.of('Fields'))) {
            const fieldsRef = acroForm.get(PDFName.of('Fields'))
            const fieldsArray = loaded_pdf.context.lookup(fieldsRef)

            if (fieldsArray && fieldsArray.array) {
                for (const fieldRef of fieldsArray.array) {
                    if (fieldRef instanceof PDFRef) {
                        const fieldDict = loaded_pdf.context.lookup(fieldRef)
                        const fieldType = fieldDict.get(PDFName.of('FT'))
                        if (fieldType && fieldType === PDFName.of('Sig')) {
                            hasSignatures = true
                            signatureFieldsCount++

                            const fieldSignRef = fieldDict.get(PDFName.of('V'))
                            const fieldSignDict = loaded_pdf.context.lookup(fieldSignRef)
                            const name = fieldSignDict.get(PDFName.of('Name')).decodeText()
                            signatureFieldNames.push(name)
                        }
                    }
                }
            }
        }
        if (hasSignatures) {
            console.log(`Il PDF contiene firme digitali`)
            console.log(`Numero di firme trovate: ${signatureFieldsCount}`)
            if (signatureFieldNames.length > 0) {
                console.log(`Nominativi delle firme: ${signatureFieldNames.join(', ')}`)
            }
            return { hasSignatures: true, count: signatureFieldsCount, fieldNames: signatureFieldNames }
        } else {
            console.log('Il PDF non contiene firme digitali rilevabili.')
            return { hasSignatures: false, count: 0, fieldNames: [] }
        }
    } catch (error) {
        console.error('Errore durante la verifica delle firme:', error)
        return { hasSignatures: false, error: error.message }
    }
}

async function removeSignatures(pdf) {
    const docForm = pdf.getForm()
    const docFormFields = docForm.getFields()
    if (docFormFields.length > 0) {
        for (const field of docFormFields) {
            if (field instanceof PDFSignature) docForm.removeField(field)
        }
    }
}

async function findNotEmbeddedFonts(pdf) {
    const allFonts = new Set()
    const embeddedFonts = new Set()
    const objs = pdf.context.enumerateIndirectObjects()
    for (const obj of objs){
        if(obj[1] instanceof PDFDict) {
            if(obj[1].get(PDFName.of("Type")) === PDFName.of("Font")) {
                allFonts.add(obj[1].get(PDFName.of("BaseFont")).decodeText())
            }
            if(obj[1].get(PDFName.of("Type")) === PDFName.of("FontDescriptor")) {
                const fontFile = obj[1].get(PDFName.of('FontFile')) ||
                                 obj[1].get(PDFName.of('FontFile2')) ||
                                 obj[1].get(PDFName.of('FontFile3'))

                if (fontFile !== undefined) {
                    embeddedFonts.add(obj[1].get(PDFName.of("FontName")).decodeText())
                }
            }
        }
    }
    //console.log(allFonts)
    //console.log(embeddedFonts)
    const notEmbeddedFonts = allFonts.difference(embeddedFonts)
    if(notEmbeddedFonts.size > 0) {
        console.log("Trovati font non inclusi nel file")
        console.log(notEmbeddedFonts)
    }
    return notEmbeddedFonts
}

async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

async function setMetadata() {
    loaded_pdf.setTitle(document.getElementById('titolo').value)
    loaded_pdf.setAuthor(document.getElementById('autore').value)
    loaded_pdf.setSubject(document.getElementById('oggetto').value)
    loaded_pdf.setProducer("Regione Puglia")
    loaded_pdf.setCreator("Regione Puglia")
    if (loaded_pdf.getCreationDate() !== undefined) loaded_pdf.setCreationDate(new Date())
    if (loaded_pdf.getModificationDate() !== undefined) loaded_pdf.setModificationDate(new Date())

    const pdfmark = `[ /Title (${document.getElementById('titolo').value})
    /Author (${document.getElementById('autore').value})
    /Subject (${document.getElementById('oggetto').value})
    /Keywords (${loaded_pdf.getKeywords()})
    /Creator (Regione Puglia)
    /Producer (Regione Puglia - GPL Ghostscript 9.26)
    /DOCINFO pdfmark`

    const pdfmarkBlob = new Blob([pdfmark], {type: "text/plain"})
    let blob64
    await blobToBase64(pdfmarkBlob).then(base64String => {
        blob64 = base64String.split(',')[1]
      })
      .catch(error => {
        console.error("Error converting blob to base64:", error)
      })
      return blob64
}