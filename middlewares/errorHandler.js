module.exports = (err, req, res, next) => {
    console.log(err.message, 'INI ERROR ===========================')
    // if(err){
    //     if(err.name === 'SequelizeValidationError'){
    //         let errorValidation = []
    //             err.errors.forEach(element => {
    //                 errorValidation.push(element.message)
    //             });
    //             res.status(400).json({
    //                 errors : errorValidation,
    //                 msg: 'Validation Error'
    //             })
    //             next()
    //     } else {
    //         if(err.name){
    //             res.status(err.status).json({
    //                 error : err.name
    //             })
    //         } else {
    //             res.status(500).json({
    //                 error: `Internal Server Error`
    //             })
    //         }
           
    //     }
    // }
    res.status(500).json({
                        error: `Internal Server Error`
                    })
}