import axios from "axios";
import { configDotenv } from "dotenv";

configDotenv({ quiet: true });

export const predictCarrer = (req, res) => {
  const { answers } = req.body;
  console.log("Received answers:", answers);

  const API_KEY = process.env.GEMINI_AUTH; 

  async function callGemini() {
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text:
                    process.env.SECRET_SAUCE +
                    ` individual student answer to these question - ${JSON.stringify(
                      answers
                    )}, now suggest which stream or career path is best suited for this individual student. Strictly give answer in only one word`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY,
          },
        }
      );

      const text =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response";

      console.log("Gemini Response:", text);
      res.json({ recommendation: text });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ error: "Failed to fetch from Gemini" });
    }
  }

  callGemini();
};
