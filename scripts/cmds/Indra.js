 const axios = require('axios');

const Prefixes = ['indra'];

// Fonction pour transformer le texte normal en gras mathématique (style cool)
function toBold(text) {
  const fonts = {
    a: "𝒂", b: "𝒃", c: "𝒄", d: "𝒅", e: "𝒆", f: "𝒇", g: "𝒈", h: "𝒉", i: "𝒊", j: "𝒋", k: "𝒌", l: "𝒍", m: "𝒎",
    n: "𝒏", o: "𝒐", p: "𝒑", q: "𝒒", r: "𝒓", s: "𝒔", t: "𝒕", u: "𝒖", v: "𝒗", w: "𝒘", x: "𝒙", y: "𝒚", z: "𝒛",
    A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬", F: "𝑭", G: "𝑮", H: "𝑯", I: "𝑰", J: "𝑱", K: "𝑲", L: "𝑳", M: "𝑴",
    N: "𝑵", O: "𝑶", P: "𝑷", Q: "𝑸", R: "𝑹", S: "𝑺", T: "𝑻", U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿", Y: "𝒀", Z: "𝒁"
  };
  return text.split('').map(c => fonts[c] || c).join('');
}

module.exports = {
  config: {
    name: "ask",
    version: "1.2",
    author: "le vide",
    longDescription: "Indra AI Bold Mode", 
    category: "ai",
    guide: { en: "{p} questions" },
  },

  onStart: async function () {},

  onChat: async function ({ api, event, args, message }) {
    try {
      const body = event.body ? event.body.toLowerCase() : "";
      const prefix = Prefixes.find((p) => body.startsWith(p));
      
      if (!prefix) return;

      const prompt = event.body.substring(prefix.length).trim();

      if (!prompt) {
        return message.reply("⛩️ **𝑲𝒐𝒏'𝒏𝒊𝒄𝒉𝒊𝒘𝒂**, **𝒎𝒐𝒊** **𝒄'𝒆𝒔𝒕** **𝑰𝒏𝒅𝒓𝒂**. **𝑸𝒖𝒆** **𝒗𝒆𝒖𝒙-𝒕𝒖** ?");
      }

      const res = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      let answer = res.data.answer;

      // Conversion de toute la réponse en GRAS
      const boldAnswer = toBold(answer);

      const responseMessage = 
`⛩️ 【 𝐈𝐍𝐃𝐑𝐀 𝐎𝐓𝐒𝐔𝐓𝐒𝐔𝐊𝐈 】 ⛩️
✧════════════════✧
${boldAnswer}
✧════════════════✧
🌀 **𝑳𝒆𝒔** **𝒚𝒆𝒖𝒙** **𝒅𝒖** **𝒎𝒂𝒍𝒉𝒆𝒖𝒓**... 🎲`;

      await message.reply({ body: responseMessage });

    } catch (error) {
      console.error("Erreur Indra:", error.message);
      await message.reply("❌ **𝑬𝒓𝒓𝒆𝒖𝒓** **𝒅𝒆** **𝒄𝒉𝒂𝒌𝒓𝒂**...");
    }
  }
};
