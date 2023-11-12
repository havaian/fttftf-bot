const { Telegraf, session } = require('telegraf');

const bot = new Telegraf(process.env.TG_BOT_TOKEN);

// Initialize the session middleware
bot.use(session());

// Simple message handler
bot.command('start', async (ctx) => {
    ctx.session = ctx.session || {};
    await require("./functions/start")(ctx);
});

// Simple message handler
bot.hears('Начать тестирование', async (ctx) => {
    ctx.session = ctx.session || {};
    ctx.session.subtopic_id = null;
    await require("./functions/test_start")(ctx);
});

// Simple message handler
bot.action(/back-to-start/, async (ctx) => {
    ctx.session = ctx.session || {};
    ctx.session.subtopic_id = null;
    await require("./functions/test_start")(ctx);
});

// Simple message handler
bot.action(/subtopic:(\w+)/, async (ctx) => {
    ctx.session.subtopic_id = ctx.match[1];
    await require("./functions/subtopic")(ctx);
});

// // Simple message handler
// bot.action(/back-to-subtopic/, (ctx) => {
//     ctx.session.questions = {};
//     require("./functions/subtopic")(ctx);
// });

// Simple message handler
bot.action(/open:(\w+)/, async (ctx) => {
    const callback_query = await ctx.callback_query.message.message_id
    console.log(callback_query);
    ctx.session.questions = {};
    ctx.session.question_id = null;
    ctx.session.correct_variant = null;
    ctx.session.msg_id = await callback_query;
    // Start the 'openScene' scene
    ctx.scene.enter('openScene', { match: ctx.match });
    await require("./functions/questions").openQuestionsWizard(ctx);
});

// Simple message handler
bot.action(/multiple:(\w+)/, async (ctx) => {
    ctx.session.questions = {};
    ctx.session.question_id = null;
    ctx.session.correct_variant = null;
    await require("./functions/questions").multiple(ctx);
});

// Simple message handler
bot.action(/multiple-answer:(\w+)/, async (ctx) => {
    ctx.session.questions = ctx.session.questions;
    ctx.session.question_id = ctx.session.question_id;
    ctx.session.correct_variant = ctx.session.correct_variant;
    await require("./functions/questions").multiple_2(ctx);
});

// Voice message handler
bot.on('voice', (ctx) => {
    require("./functions/voice")(ctx);   
});

bot.on("text", async (ctx) => {
    console.log(ctx.update);
});

// Start the bot
bot.launch();
console.log("✅ Bot");