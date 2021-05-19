const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const itemModel = mongoose.model('item');

router.route('/items').get((req, res, next) => {
    if (req.isAuthenticated()) {
        itemModel.find({}, (err, items) => {
            if (err) return res.status(500).send('DB hiba');
            res.status(200).send(items);
        })
    } else {
        return res.status(403).send('Nem volt bejelentkezve');
    }
}).post((req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.accessLevel == "admin") {
        if (req.body.id && req.body.name && req.body.price) {
            itemModel.findOne({ id: req.body.id }, (err, item) => {
                if (err) return res.status(500).send('DB hiba');
                if (item) {
                    return res.status(400).send('már van ilyen id');
                } else {
                    const item = new itemModel({ id: req.body.id, name: req.body.name, desc: req.body.desc || '', price: req.body.price });
                    item.save((error) => {
                        if (error) return res.status(500).send('A mentés során hiba történt');
                        return res.status(200).send('Sikeres mentes tortent');
                    })
                }
            })
        } else {
            return res.status(400).send('Nem volt id vagy price');
        }
    } else {
        return res.status(403).send('Nem volt bejelentkezve');
    }
}).put((req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.accessLevel == "admin") {
        if (req.body.id && req.body.price) {
            itemModel.findOne({ id: req.body.id }, (err, item) => {
                if (err) return res.status(500).send('DB hiba');
                if (item) {
                    item.name = req.body.name;
                    item.desc = req.body.desc || '';
                    item.price = req.body.price;
                    item.save((error) => {
                        if (error) return res.status(500).send('A mentés során hiba történt');
                        return res.status(200).send('Sikeres mentes tortent');
                    })
                } else {
                    return res.status(400).send('Nincs ilyen id az adatbázisban');
                }
            })
        } else {
            return res.status(400).send('Nem volt id vagy price');
        }
    } else {
        return res.status(403).send('Nem volt bejelentkezve');
    }
}).delete((req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.accessLevel == "admin") {
        if (req.body.id) {
            itemModel.findOne({ id: req.body.id }, (err, item) => {
                if (err) return res.status(500).send('DB hiba');
                if (item) {
                    item.delete((error) => {
                        if (error) return res.status(500).send('A mentés során hiba történt');
                        return res.status(200).send('Sikeres torles tortent');
                    })
                } else {
                    return res.status(400).send('Nincs ilyen id az adatbázisban');
                }
            })
        } else {
            return res.status(400).send('Nem volt id');
        }
    } else {
        return res.status(403).send('Nem volt bejelentkezve');
    }
})

router.route('/item/:id').get((req, res, next) => {
    if (req.isAuthenticated()) {
        itemModel.findOne({ id: req.params.id }, (err, item) => {
            if (err) return res.status(500).send('DB hiba');
            res.status(200).send(item);
        })
    } else {
        return res.status(403).send('Nem volt bejelentkezve');
    }
})


module.exports = router;