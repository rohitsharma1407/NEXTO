const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.summarize = async (text, category, language) => {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You summarize news clearly and concisely." },
      {
        role: "user",
        content: `Summarize in ${language} for ${category} category. The summary must be minimum 60 words:\n${text}`
      }
    ]
  });

  return res.choices[0].message.content;
};
