const { Telegraf, Markup } = require('telegraf')
const api = require('covid19-api')
const COUNTRY_LIST = require('./constant')


const bot = new Telegraf('2094406632:AAFYLt5fU61fLtST2ztwmgSsWusEA4aS48A')
bot.start((ctx) => ctx.reply(`
Добрый день ${ctx.message.from.first_name}!
Узнай статистику по коронавирусу.
Введи на английском название страны и получи статистику.
Посмотреть весь список стран можно командой /help.`, 
Markup.keyboard([
  ['US', 'Russia'],
  ['Azerbaijan', 'Kazakhstan']
])
))
bot.help((ctx) => ctx.reply(COUNTRY_LIST))
bot.on('text',async(ctx) => {
let data = {}
try{
data = await api.getReportsByCountries(ctx.message.text)
const formData = `
Страна: ${data[0][0].country}
Случаи: ${data[0][0].cases}
Смертей: ${data[0][0].deaths}
Вылечились: ${data[0][0].recovered}
 ` 
 ctx.reply(formData)
} catch { 
  ctx.reply('Ошибка такой страны не существует, посмотрите /help')
} 
})

bot.launch()

console.log('бот запущен')


