const {
    Markup
} = require("telegraf");
const { readOne } = require("../db/question");

const subtopicHandler = async (ctx) => {
    const id = ctx.match[1];
    const response = await readOne(id, "empty");
    let message = `Тема:\n${response.mainTopic}\n\nВыберите, на какого типа вопросы вы хотели бы отвечать:`
    const keyboard = Markup.inlineKeyboard(
        [
            [ Markup.button.callback("Открытые вопросы", `open:${id}`) ],
            [ Markup.button.callback("Вопросы с вариантами ответа", `multiple:${id}`) ],
            // [ Markup.button.callback("Вернуться к выбору темы", `back-to-start`) ]
        ]
    );
    ctx.editMessageText(message, keyboard);
}

module.exports = subtopicHandler;