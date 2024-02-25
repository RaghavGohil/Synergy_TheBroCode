const mongoose = require('mongoose');
const Projects = require('../models/projectsModel');

const databaseUrl = 'mongodb+srv://raghavgohil2004:hw5nch4c1m%40mongo@synergy.qimy4o3.mongodb.net/test';

// connect to mongodb
mongoose.connect(databaseUrl)
.then(() => {console.log('projects connected to MongoDB.')})

module.exports.projectsGet = async (req, res) => {
    const projects = await Projects.find({}).lean();
    res.render('projects', {data: 'Projects page' , projects: projects});
}