const Wssss = require('ws');

const asr = new Wssss('ws://localhost:31001/ws/assistant/vioce/asr?ID=123id&first=true');
const user = new Wssss('ws://localhost:31001/ws/assistant/vioce/user?ID=123id&first=true');

// 打开WebSocket连接后立刻发送一条消息:
asr.on('open', () => {
  console.log('[CLIENT] open()');
  asr.send('Hello!');
});
user.on('open', () => {
  console.log('[CLIENT] open()');
  user.send('Hello!');
});
// 响应收到的消息:
asr.on('message', (message) => {
  console.log(`[CLIENT] Received: ${message}`);
});
user.on('message', (message) => {
  console.log(`[CLIENT] Received: ${message}`);
});
