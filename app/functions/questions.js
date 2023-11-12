const {
    Markup
} = require("telegraf");
const {
    readOne
} = require("../db/question");

exports.open = async (ctx) => {
    const id = ctx.match[1];
    const response = await readOne(id, "open");
    const questions = response.openQuestions;
    const keys = Object.keys(questions);

    // Get the previously used indexes from ctx.session.questions
    const usedIndexes = ctx.session.questions ? ctx.session.questions.indexes || [] : [];

    // Filter out the used indexes to get the available indexes
    const availableIndexes = keys.filter(index => !usedIndexes.includes(index));

    if (availableIndexes.length > 0) {
        // Choose a random index from the available indexes
        const randInt = Math.floor(Math.random() * availableIndexes.length);
        const randElem = availableIndexes[randInt];
        const randItem = questions[randElem];

        // Add the chosen index to ctx.session.questions.indexes
        ctx.session.question_id = randInt;
        ctx.session.questions[ctx.session.question_id] = "";

        // Use the random index to get a random question from randItem
        const randomIndex = Math.floor(Math.random() * randItem.length);
        const randQuestion = randItem[randomIndex];

        let message = `Тема:\n${response.mainTopic}\n\nПодтема:\n${randElem}\n\nВопрос:\n${randQuestion.question}\n\nОтветы:\n`;

        ctx.session.correct_variant = randQuestion.answer;

        ctx.editMessageText(message);
    } else {
        // Handle the case where all indexes are used
        console.error('Вы ответили на все вопросы!');
    }
}

exports.multiple = async (ctx) => {
    const id = ctx.match[1];
    const response = await readOne(id, "multiple");
    const questions = response.multipleChoice;
    const keys = Object.keys(questions);

    // Get the previously used indexes from ctx.session.questions
    const usedIndexes = ctx.session.questions ? ctx.session.questions.indexes || [] : [];

    // Filter out the used indexes to get the available indexes
    const availableIndexes = keys.filter(index => !usedIndexes.includes(index));

    if (availableIndexes.length > 0) {
        // Choose a random index from the available indexes
        const randInt = Math.floor(Math.random() * availableIndexes.length);
        const randElem = availableIndexes[randInt];
        const randItem = questions[randElem];

        // Use the random index to get a random question from randItem
        const randomIndex = Math.floor(Math.random() * randItem.length);
        const randQuestion = randItem[randomIndex];

        // Add the chosen index to ctx.session.questions.indexes
        ctx.session.question_id = randomIndex;
        ctx.session.questions[ctx.session.question_id] = "";

        let message = `Тема:\n${response.mainTopic}\n\nПодтема:\n${randElem}\n\nВопрос:\n${randQuestion.question}\n\nОтветы:\n`;

        ctx.session.correct_variant = randQuestion.variants.indexOf(randQuestion.answer);

        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
        const buttons = [];

        for (let x in randQuestion.variants) {
            message += `${emojis[x]} - ${randQuestion.variants[x]}\n`;
            buttons.push(Markup.button.callback(`${emojis[x]}`, `multiple-answer:${x}`))
        }

        const keyboard = Markup.inlineKeyboard(buttons);

        ctx.editMessageText(message, keyboard);
    } else {
        // Handle the case where all indexes are used
        console.error('Вы ответили на все вопросы!');
    }
}

exports.multiple_2 = async (ctx) => {
    const response = await readOne(ctx.session.subtopic_id, "multiple");
    const questions = response.multipleChoice;
    const keys = Object.keys(questions);

    const last_correct = (ctx.match[1] === ctx.session.correct_variant);

    if (last_correct) {
        ctx.session.questions[ctx.session.question_id] = true;
        ctx.reply("✅ Верно!");
    } else {
        ctx.reply("❌ Неверно");
    }

    // Get the previously used indexes from ctx.session.questions
    const usedIndexes = ctx.session.questions ? Object.keys(ctx.session.questions) : [];

    // Filter out the used indexes to get the available indexes
    const availableIndexes = keys.filter(index => !usedIndexes.includes(index));

    // console.log(ctx.session.questions);

    if (availableIndexes.length > 0) {
        // Choose a random index from the available indexes
        const randInt = Math.floor(Math.random() * availableIndexes.length)
        const randElem = availableIndexes[randInt];
        const randItem = questions[randElem];

        // Use the random index to get a random question from randItem
        const randomIndex = Math.floor(Math.random() * randItem.length);
        const randQuestion = randItem[randomIndex];

        // Add the chosen index to ctx.session.questions.indexes
        ctx.session.question_id = randomIndex;
        ctx.session.questions[ctx.session.question_id] = "";

        let message = `Тема:\n${response.mainTopic}\n\nПодтема:\n${randElem}\n\nВопрос:\n${randQuestion.question}\n\nОтветы:\n`;

        ctx.session.correct_variant = randQuestion.variants.indexOf(randQuestion.answer);

        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
        const buttons = [];

        for (let x in randQuestion.variants) {
            message += `${emojis[x]} - ${randQuestion.variants[x]}\n`;
            buttons.push(Markup.button.callback(`${emojis[x]}`, `multiple-answer:${x}`))
        }

        const keyboard = Markup.inlineKeyboard(buttons);
        ctx.reply(message, keyboard);
    } else {
        // Handle the case where all indexes are used
        console.error('Вы ответили на все вопросы!');
    }
}