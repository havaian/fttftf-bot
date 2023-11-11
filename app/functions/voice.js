const fs = require('fs');
const axios = require('axios');
const { Telegraf } = require('telegraf');
const path = require('path');

const voiceHandler = async (ctx) => {
    try {
        // Get the file information
        const fileID = ctx.message.voice.file_id;
        const fileLink = await ctx.telegram.getFileLink(fileID);

        // Define the directory to save the file
        const directoryPath = path.join(__dirname, '..', 'data', 'voice-msgs', `${ctx.chat.id}`);
        const fileName = `${fileID}.wav`; // Adjust the file extension as needed
        const filePath = path.join(directoryPath, fileName);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        // Download the file
        const response = await axios({
            method: 'GET',
            url: fileLink,
            responseType: 'stream',
        });

        // Save the file locally
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log(`Voice message saved at: ${filePath}`);
            ctx.reply('Voice message saved successfully');
        });

        writer.on('error', (err) => {
            console.error(`Error saving voice message`);
            ctx.reply('Error saving voice message.');
        });
    } catch (error) {
        console.error(`Error handling voice message: ${error.message}`);
        ctx.reply('Error handling voice message.');
    }
};

module.exports = voiceHandler;
