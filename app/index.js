const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TG_BOT_TOKEN);

// Simple message handler
bot.command('start', (ctx) => {
    require("./functions/start")(ctx);
});

// Simple message handler
bot.on('text', (ctx) => {
    require("./functions/text")(ctx);
});

// Voice message handler
bot.on('voice', (ctx) => {
    require("./functions/voice")(ctx);   
});

// Start the bot
bot.launch();
console.log("✅ Bot");