const express = require('express');
const RegisterRouter = express.Router();
const PersonSchema = require('../models/person.model');
const p1 = BuildPerson();
const globalFile = require('../global');


function BuildPerson() {
    var _person = new PersonSchema();

    function addStep1(tz, email, password) {
        _person.tz = tz;
        _person.email = email;
        _person.password = globalFile.saltHashPassword(password);
    }


    function addStep2(cityid, street, FName, lName, roleId) {
        _person.cityId = cityid;
        _person.street = street;
        _person.firstName = FName;
        _person.lastName = lName;
        _person.roleId = roleId;
    }

    function build() {
        //     console.log('build');
        var p = _person;
        _person = new PersonSchema();
        return p;
    }

    return {
        addStep1: addStep1,
        addStep2: addStep2,
        build: build
    }
}

RegisterRouter.route('/get/:id').get(function (req, res) {
    console.log('get person');
    PersonSchema.find({ name: req.params.name }, function (err, cityD) {
        if (err) {
            console.log('400' + err);
        }
        else {
            console.log('in get cipersonty' + JSON.stringify(cityD, undefined, 2));
            res.json(cityD);
        }
    });
});

//http://webmaster.org.il/forums/message?id=27760
function LegalTz(num) {
    var tot = 0;
    var tz = new String(num);
    for (i = 0; i < 8; i++) {
        x = (((i % 2) + 1) * tz.charAt(i));
        if (x > 9) {
            x = x.toString();
            x = parseInt(x.charAt(0)) + parseInt(x.charAt(1))
        }
        tot += x;
    }
    if ((tot + parseInt(tz.charAt(8))) % 10 == 0) {
        //        alert("תקין");
        return true;
    } else {
        //       alert("לא תקין")
        return false;
    }
}

RegisterRouter.route('/addStep1').post(function (req, res) {
   if (LegalTz(req.body.tz)) {
       PersonSchema.find({ $or: [{ tz: req.body.tz }, { email: req.body.email }] }, function (err, docs) {
            if (docs.length) {
                res.status(499).send("TZ or Email are already exist");
            } else {
                p1.addStep1(req.body.tz,
                    req.body.email,
                    req.body.password);
                res.json('Person step1 passed successfully');
            }
        });
    }
    else {
        res.status(499).send("Inlegal TZ");
    }
});


function savePerson(personD) {
    p1.addStep2(personD.cityId,
        personD.street,
        personD.firstName,
        personD.lastName,
        personD.roleId);
    const PersonData = new PersonSchema(p1.build());
   // console.log('PersonData' + JSON.stringify(PersonData));
    PersonData.save()
        .then(per => {
            return ('Person added successfully');
        })
        .catch(err => {
            return ("unable to save to database")
        });
}

RegisterRouter.route('/addStep2').post(function (req, res) {
    //check there is no other admin
    if (req.body.roleId === '1') {
        PersonSchema.find({ roleId: req.body.roleId }, function (err, docs) {
            if (docs.length) {
                res.status(499).send("An administrator already exists in the system");
            } else
                res.json(savePerson(req.body));
        });
    }
    else
        res.json(savePerson(req.body));
}
);

module.exports = RegisterRouter;