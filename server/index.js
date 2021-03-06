const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

require('dotenv').config()

const TOKEN = process.env.TELEGRAM_TOKEN
const port = process.env.PORT || 8080
const gameName = process.env.GAME_NAME

const server = express()
const bot = new TelegramBot(TOKEN, { polling: true })

const queries = {}

server.use(express.static(path.join(__dirname, 'minesweeper-project/server')))

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements a Minesweeper game. Say /game if you want to play."))
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName))

// handle "Play" button
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.")
    } else {
        queries[query.id] = query
        let gameurl = process.env.FRONT_URL + "?id=" + query.id;
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    }
});

bot.on("inline_query", function (iq) {
    bot.answerInlineQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);
});

server.get("/highscore/:score", function (req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();

    let score = req.params.score
    let query = queries[req.query.id]
    let GetGameHighScoresOptionsObj
    let options


    if (query.message) {
        GetGameHighScoresOptionsObj = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id
        }

        options = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id,
            force: true
        };
    } else {
        GetGameHighScoresOptionsObj = {
            inline_message_id: query.inline_message_id,
        }

        options = {
            inline_message_id: query.inline_message_id,
            force: true
        };
    }

    bot.getGameHighScores(query.from.id, GetGameHighScoresOptionsObj)
        .then((scoreObj) => {
                console.log('leader board: ' + JSON.stringify(scoreObj))
                let highScore = scoreObj[0].score
    
                if (score < highScore) {
                    bot.setGameScore(query.from.id, parseInt(score), options);
                }
        }).catch((err) => {
            console.log('No high score setup')
            bot.setGameScore(query.from.id, parseInt(score), options);
        })

});


server.get("/", function (req, res, next) {
    res.sendFile(path.join(__dirname, '../game/dist/index.html'))
})

server.use('/', express.static(path.join(__dirname, '../game/dist/')));

server.listen(port);