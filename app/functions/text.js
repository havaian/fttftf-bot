const textHandler = async (ctx) => {
    ctx.reply(ctx.message.text);
}

module.exports = textHandler;