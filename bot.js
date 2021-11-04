const { Telegraf } = require('telegraf')
const api = require('covid19-api')

const bot = new Telegraf('2094406632:AAFYLt5fU61fLtST2ztwmgSsWusEA4aS48A')
bot.start((ctx) => ctx.reply(`Salam alekum ${ctx.message.from.first_name}`))



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
  ctx.reply('Ошибка такой страны не существует')
}

  
})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

console.log('бот запущен')


