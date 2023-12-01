const express = require('express');
const path = require('path') 
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const Members = require('./models/members')

// Setting up EJS
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs')
const MONGODB_URI = 'mongodb+srv://manueledosa:FBGE4palLf9IlbWL@manny.idthc3z.mongodb.net/?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {});

// Add middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}))

// Set up Base route
app.get('/', (req, res) => {
  	// Render view and pass a variable to it 
    res.render('index', { 
		heading: 'USW DS BACKEND',
		showText: true
    }) 
});

//List all members in view
app.get('/list-members', async (req, res) => {
	// Get All Members
	const members = await Members.find({});
	// Render view and pass a variable to it 
	res.render('listMembers', { 
		members: members
	}) 
});

//Get all Members
app.get('/members', async (req, res) => {
	// Get All Members
	const members = await Members.find({});
	// Resturn data as response
	console.log(members)
	return res.json({ message: 'success', data: members })
});

//Add members through view
app.get('/add-members',  (req, res) => {
	// Render view and pass a variable to it 
	res.render('addMember', { 
			redirectUrl: '/add-members'
	}) 
});

//create members
app.post('/add-members', async (req, res) => {
	// Create a new member and insert into database
	const member = await Members.create({
		title: req.body.title,
		name: req.body.name,
		description: req.body.description
	});
	// redirect to members list page
	res.redirect(req.baseUrl + '/list-members');
   
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});