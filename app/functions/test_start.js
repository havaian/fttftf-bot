const {
    Markup
} = require("telegraf");
const { readAll } = require("../db/question");

const testStartHandler = async (ctx) => {
    const response = await readAll();
    let message = `Выберите тему, по которой будет проводиться проверка:`
    // Create an array of emojis for item numbers
    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    for (let x in response) {
        let index = x;
        message += '\n'
        if (x > 9) {
            index = x.split("");
            for (let y in index) {
                message += `${emojis[index[y]]}`
            }
        } else {
            message += `${emojis[index]}`
        }
        message += ` - ${response[x].mainTopic}\n`
    }
    const keyboard = Markup.inlineKeyboard(
        response.map(({ _id }, index) =>
            Markup.button.callback(emojis[index], `subtopic:${_id}`)
        )
    );
    ctx.reply(message, keyboard);
}

module.exports = testStartHandler;