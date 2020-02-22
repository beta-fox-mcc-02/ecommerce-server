const { Person } = require('../models/index')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')

class Controller {
    static register(req, res, next) {
        let newPerson = {
            email: req.body.email,
            password: req.body.password,
            user_role: req.body.user_role
        };
        Person.create(newPerson)
            .then(newPerson => {
                let payload = {
                    id: newPerson.id,
                    email: newPerson.email,
                    user_role: newPerson.user_role
                };
                let token = generateToken(payload);
                res.status(201).json({
                    token: token,
                    id: newPerson.id,
                    email: newPerson.email,
                    user_role: newPerson.user_role
                });
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next) {
        Person.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(person => {
                if (person) {
                    if (comparePass(req.body.password, person.password)) {
                        let payload = {
                            id: person.id,
                            email: person.email,
                            user_role: person.user_role
                        };
                        let token = generateToken(payload);
                        res.status(200).json({
                            token: token,
                            id: person.id,
                            email: person.email,
                            user_role: person.user_role
                        });
                    } else {
                        next({
                            message: 'Email/Password Wrong',
                            status: 401
                        });
                    }
                } else {
                    next({
                        message: 'Email/Password Wrong',
                        status: 401
                    });
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static findPersonById(req, res, next) {
        Person.findOne({
            where: {
                id: req.params.id,
            },
        })
            .then(person => {
                if (person) {
                    res.status(200).json({
                        id: person.id,
                        email: person.email,
                        user_role: person.user_role,
                    });
                } else {
                    next({
                        message: 'User not found',
                        status: 404
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static findAllPerson(req, res, next) {
        Person.findAll({
            where: {
                user_role: req.query.role,
            },
            order: [['id', 'ASC']],
        })
            .then(people => {
                res.status(200).json(people)
            })
            .catch(err => {
                next(err)
            })
    }

    static deletePerson(req, res, next) {
        Person.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then(deleted => {
                if (deleted) {
                    res.status(200).json({
                        delete: deleted,
                        message: 'Successfully delete'
                    });
                } else {
                    next({
                        message: 'User not found',
                        status: 404
                    })
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = Controller;
