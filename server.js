require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("MASTER DENT API працює ✅");
});

app.post("/send", async (req, res) => {
    try {
        const { name, phone, service, comment } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                ok: false,
                message: "Заповніть ім'я та телефон"
            });
        }

        const currentTime = new Date().toLocaleString("uk-UA");

        const text = `
🦷 <b>НОВА ЗАЯВКА - MASTER DENT</b>

👤 <b>Ім'я:</b> ${name}

📞 <b>Телефон:</b>
<code>${phone}</code>

🦷 <b>Послуга:</b>
${service || "Не вказано"}

💬 <b>Коментар:</b>
${comment || "Немає"}

🕒 <b>Дата:</b>
${currentTime}

━━━━━━━━━━━━━━
📥 <i>Новий запис із сайту</i>
`;

        await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text,
                parse_mode: "HTML"
            }
        );

        console.log(`✅ Нова заявка від ${name}`);

        res.json({
            ok: true,
            message: "Заявку успішно надіслано"
        });

    } catch (error) {

        console.error(
            "❌ Telegram Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            ok: false,
            message: "Помилка сервера"
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running: http://localhost:${PORT}`);
});