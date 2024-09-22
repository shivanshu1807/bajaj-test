const base64topdf = require('base64topdf');
const fs = require('fs');
const path = require('path');

const handlePost = (req, res) => {
    const { data, file_b64 } = req.body;

    // Basic validation
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid data format' });
    }

    const user_id = 'shivanshu_singh_12092003'; // Change to your details
    const email = "sr5752@srmist.edu.in";
    const roll_number = "RA2111031010040";

    let numbers = [];
    let alphabets = [];
    let highest_lowercase_alphabet = '';

    // Separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highest_lowercase_alphabet) {
                highest_lowercase_alphabet = item;
            }
        }
    });

    // File handling
    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = 0;

    if (file_b64) {
        try {
            const outputPath = path.join(__dirname, 'outputFile.pdf'); // Use .pdf for the output file
            base64topdf.base64Decode(file_b64, outputPath);
            const stats = fs.statSync(outputPath);
            file_size_kb = stats.size / 1024;
            file_mime_type = 'application/pdf'; // Set to the correct MIME type
            file_valid = true;
        } catch (error) {
            console.error('File processing error:', error);
            file_valid = false;
        }
    }

    res.status(200).json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
        file_valid,
        file_mime_type,
        file_size_kb
    });
};

const handleGet = (req, res) => {
    res.status(200).json({ operation_code: 1 });
};

module.exports = { handlePost, handleGet };
