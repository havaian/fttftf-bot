const {
    Markup
} = require("telegraf");

const startHandler = async (ctx) => {
    // Create buttons for the menu
    const buttons = ['Начать тестирование'];

    // Send the menu to the user
    ctx.reply("Добро пожаловать в бот-тренер от команды FTTFTF!");
    ctx.reply("Нажмите на кнопку ниже, чтобы начать тестирование", Markup.keyboard(buttons))
}

module.exports = startHandler;