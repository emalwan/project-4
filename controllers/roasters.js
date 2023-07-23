const Roaster = require('../models/Roaster')

exports.roaster_create_get = (req, res) => {
    res.render('roaster/add')
}

exports.roaster_create_post = async (req, res) => {
    try{
        console.log(req.body)
        const roaster = new Roaster(req.body)

        await roaster.save()

    } catch (error){
        console.log(error.message)
    }
}

exports.roaster_index_get = async (req, res) => {
    try {
        const roasters = await Roaster.find()
        res.render('roaster/index', {roasters})
    } catch (error){
        console.log(error.message)
    }
}