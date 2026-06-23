const TelegramBot = require("node-telegram-bot-api");

// Токен твоего бота
const TOKEN = "8595605524:AAGj2bwwot2ZIc_0RMuxt8Ro4bmqjgfu-Xs";
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🤖 БОТ УСПЕШНО ЗАПУЩЕН...");

// Когда ты напишешь боту в Телеграмме, этот код покажет твой ID
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    console.log(`====================================`);
    console.log(`👉 ТВОЙ ЦИФРОВОЙ ID: ${chatId}`);
    console.log(`====================================`);
    
    bot.sendMessage(chatId, `Привет! Твой цифровой ID: ${chatId}\nСкопируй эти цифры и вставь в index.html!`);
});