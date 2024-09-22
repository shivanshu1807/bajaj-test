const base64topdf = require('base64topdf');
const fs = require('fs');

// POST request logic
const handlePost = (req, res) => {
    const { data, file_b64 } = req.body;
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

    // File handling (optional)
    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = 0;

    if (file_b64) {
        try {
            const file = base64topdf.base64Decode(file_b64, 'outputFile');
            const stats = fs.statSync('outputFile');
            file_size_kb = stats.size / 1024;
            file_mime_type = 'image/png'; // Example, change as necessary
            file_valid = true;
        } catch (error) {
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

// GET request logic
const handleGet = (req, res) => {
    res.status(200).json({ operation_code: 1 });
};

module.exports = { handlePost, handleGet };
