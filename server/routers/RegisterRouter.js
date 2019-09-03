const express = require('express');
const RegisterRouter = express.Router();
const PersonSchema = require('../models/person.model');
const p1 = BuildPerson();
const globalFile = require('../global');


function BuildPerson() {
    var _person = new PersonSchema();

    function addStep1(tz, email, password){
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
    console.log('req.password ' + req.body.password);
    if (LegalTz(req.body.tz)) {
        //const PersonData = new PersonSchema(req.body);
        console.log('before find');
        PersonSchema.find({$or:[{ tz: req.body.tz} ,{ email:req.body.email}]}, function (err, docs) {
            if (docs.length) {
                res.status(499).send("TZ or Email are already exist");
            } else {
                console.log('before add1');
                p1.addStep1(req.body.tz,
                    req.body.email,
                    req.body.password);
            //    console.log('after add1');
                res.json('Person step1 passed successfully');
            }
        });
    }
    else {
        res.status(499).send("Inlegal TZ");
    }
});

RegisterRouter.route('/addStep2').post(function (req, res) {
    console.log('before add2');
    p1.addStep2(req.body.cityId,
        req.body.street,
        req.body.firstName,
        req.body.lastName,
        req.body.roleId);
  //  console.log('after add2'+JSON.stringify(req.body));
   // p1.build();
  //  console.log( JSON.stringify(p1.build()));
    const PersonData = new PersonSchema(p1.build());
   // console.log(p1.street);
    console.log('PersonData'+JSON.stringify(PersonData));
    PersonData.save()
        .then(per => {
            console.log('in save')
            res.json('Person added successfully');
        })
        .catch(err => {
            console.log('in catch');
            res.status(400).send("unable to save to database");
        });
}
);

module.exports = RegisterRouter;