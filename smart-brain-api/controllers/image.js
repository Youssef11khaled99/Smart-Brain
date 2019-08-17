const clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'a5731e15cb6349c2b12b4ddf400a7a2a'
   });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}


const handleImagePut = (req, res, db) => {
    const { id }  = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
    handleImagePut,
    handleApiCall
}