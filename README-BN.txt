AdSpark TEST BOT (ছোট বট, শুধু ad চলে কিনা দেখার জন্য)

ফাইল: Dockerfile, bot.php, index.html (এই ৩টা GitHub এ আপলোড করবেন)

ধাপ ১ — BotFather
1. টেলিগ্রামে @BotFather → /newbot → নাম ও username দিন।
2. যে TOKEN দেবে সেটা কপি করে রাখুন (কোথাও GitHub এ লিখবেন না)।

ধাপ ২ — GitHub
1. নতুন Private repository বানান।
2. এই ৩টা ফাইল (Dockerfile, bot.php, index.html) repository-র root এ আপলোড করুন।

ধাপ ৩ — Render
1. render.com → New + → Web Service → আপনার repository বেছে নিন।
2. Runtime: Docker, Instance: Free।
3. Environment Variables:
   BOT_TOKEN = BotFather এর token
4. Deploy চাপুন। শেষ হলে Render এর URL পাবেন (যেমন https://xxxx.onrender.com)।
   ওই URL খুললে "OK" দেখাবে।

ধাপ ৪ — Webhook সেট
ব্রাউজারে এই লিংক খুলুন (YOUR_TOKEN আর YOUR_RENDER_URL বদলে):
https://api.telegram.org/botYOUR_TOKEN/setWebhook?url=https://YOUR_RENDER_URL/bot.php
উত্তরে {"ok":true,...} দেখালে ঠিক আছে।

ধাপ ৫ — টেস্ট
1. টেলিগ্রামে বটে /start পাঠান।
2. "📢 Ad Test" বাটন চাপুন, পেজ খুলবে।
3. "✅ SDK ready" দেখালে "Ad dekhao" চাপুন, নিচের লগ দেখুন।

SDK বদলাতে চাইলে index.html এর উপরের দিকে SDK_URL লাইনে লিংক বদলান।
