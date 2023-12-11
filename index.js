const express = require('express');
const app = express();
// const cors = require('cors');
const fs = require('fs').promises; // Using fs.promises for async file reading

app.use(express.json());
// app.use(cors());

const PORT = process.env.PORT || 3030;

app.get('/', async (req, res) => {
    res.status(200).json({ message: "Success" });
});

app.get('/api/courses/all', async (req, res) => {
    try {
        // Assuming you have a JSON file named 'data.json'
        const filePath = 'data.json';

        // Read the contents of the JSON file asynchronously
        const jsonData = await fs.readFile(filePath, 'utf-8');

        // Send the raw JSON data in the response with a status code of 200
        res.status(200).type('application/json').send(jsonData);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const courseId = parseInt(req.params.id); // Convert the id parameter to an integer

        // Assuming you have a JSON file named 'data.json'
        const filePath = 'data.json';

        // Read the contents of the JSON file asynchronously
        const jsonData = await fs.readFile(filePath, 'utf-8');

        // Parse the JSON data
        const courses = JSON.parse(jsonData);

        // Find the course with the specified ID
        const course = courses.find(course => course.id === courseId);

        if (course) {
            // Send the found course as the response
            res.status(200).json(course);
        } else {
            // If the course with the specified ID is not found, send a 404 response
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log("Server running now");
});
