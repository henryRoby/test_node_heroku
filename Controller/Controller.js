const Profil = require('../Modele/Profil.modele');


exports.getProfil = (req, res) => {

    Profil.find()
        .then(prof => {

            res.send(prof);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.postProfil = (req, res) => {
    // Validate request
    console.log(req.body.nom);
    

    Profil.find()
        .then(prof => {
            var id2;
            if (prof.length == 0) {
                id2 = 0
            }
            else {

                id2 = parseInt(prof[prof.length - 1].id) + 1
            }
            
           
            const prf = new Profil({
                _id: id2,
                nom: req.body.nom || "Untitled Note",
                email: req.body.email
                
            }); 

            if( req.body.nom && req.body.email){

                prf.save().then((data)=>{
                 prof.push(prf)
                res.send(prof)})
            }
        })
    }




exports.put = (req, res) => {

    // Find note and update it with the request body
    Profil.findByIdAndUpdate(req.body._id, {
        nom: req.body.nom || "Untitled Note",
        email: req.body.email
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};

exports.deleteProfil = (req, res) => {
    Profil.findByIdAndRemove(req.params._id)
        .then(prof => {
            if (!prof) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params._id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.body._id
            });
        });
};
exports.findOne = (req, res) => {
    const tab = []
    
    Profil.findById(req.params._id)
        .then(eleve => {
            if (!eleve) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }

            Profil.find()
                .then(prof => {
                    tab.push(eleve)
                   


                    res.send(tab)
                }
                )
            })

        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.body._id
            });
        });
};

