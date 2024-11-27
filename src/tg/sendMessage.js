const TelegramBot = require('node-telegram-bot-api');  
const BigNumber = require('bignumber.js')
// 替换为你从 BotFather 获取的 API 令牌  
const token = '7274159783:AAEjVncHYYnZmoIbrGkvEM-hBBk4gdETW8Y';  

// 创建一 个 Telegram bot 实例  
// const bot = new TelegramBot(token, { polling: true });  

// // // 监听 /start 命令  
// bot.onText(/\/start/, (msg) => {  
//     const chatId = msg.chat.id;  
//     bot.sendMessage(chatId, '欢迎使用我的机器人！'); // 发送欢迎消息  
// });  

// // 监听消息并回覆  
// bot.on('message', (msg) => {  
//     const chatId = msg.chat.id;  
//     console.log("chatId:",chatId)
//     // 发送相同的消息作为回复  
//     bot.sendMessage(chatId, `你发送了: ${msg.text}`);  
// });  

// 发送一条消息
// const sendMessage = (chatId, text, options = {}) => {
//   bot.sendMessage(chatId, text, options);
// };

// 示例：给某个聊天室发送消息（使用特定 chatId）
const chatId = '-1002266431946'; // 你希望发送消息的聊天 ID
const today = new BigNumber(0.66);
const total = new BigNumber(4.24);
// 新增：处理数字中的小数点
function processNumbers(num){
    const text = num.toString();
    return text.replace(/(\d+)\.(\d+)/g, '$1\\.$2');
};

async function send_telegram(total, today) {
  let fire_count = today.mod(new BigNumber(10));
  console.log(fire_count);
  let count = fire_count.integerValue(BigNumber.ROUND_HALF_UP);
  console.log(count);
  let fire = "";
  for (var i = 0; i < count; i++) {
      fire += "🔥";
  }
  const message = `
test
  `;
  console.log(message)
  const bot = new TelegramBot(token, { poling: true });
  bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2', disable_web_page_preview: true });
}
send_telegram(total,today)
return
sendMessage(chatId, message, { parse_mode: 'MarkdownV2', disable_web_page_preview:true},);