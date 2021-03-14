const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {

    console.log('Connected correctly to the server');

    // Making a change here that allows us to instantiate a campsite document model
    // Old method:
    // const newCampsite = new Campsite({
    //     name: 'React Lake Campground',
    //     description: 'Just testing decription'
    // }); 
    // ! rest of code continues the same way...
    // newCampsite.save()
    // .then(campsite => {
    //     console.log(campsite);
    //     return Campsite.find();
    // })
    
    Campsite.create({
        name: 'React Lake Campground',
        description: 'Just testing description'
    })
    // newCampsite.save()
    // save() method is no longer needed
    .then(campsite => {
        console.log(campsite);
        return Campsite.find();
    })
    .then(campsites => {
        console.log(campsites);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});