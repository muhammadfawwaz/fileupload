'use strict'

//dont forget this
const Helpers = use('Helpers')

class UploadFileController {
    async index({ view }) {
        return view.render('upload.index')
    }

    async upload({ request, response, session }) {
        const pict = request.file('pict', {
            types: ['jpeg'],
            size: '1mb'
        })
        
        await pict.move(Helpers.tmpPath('images'), {
            name: `${new Date().getTime()}.${pict.subtype}`
        })

        var sukses = ''
        var error = ''

        if(!pict.moved()) {
            error = pict.error().message
        }
        else {
            sukses = 'File has been uploaded'
        }

        session.flash({
            sukses: sukses,
            error: error
        })

        return response.redirect('/')
    }
}

module.exports = UploadFileController
