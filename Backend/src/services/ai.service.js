const axios = require("axios")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const API_KEY = process.env.GOOGLE_GENAI_API_KEY;
    const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const prompt = `Report for:
                    Resume: ${resume.substring(0, 800)}
                    Job: ${jobDescription.substring(0, 800)}
                    Return ONLY raw JSON.`

    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
            maxOutputTokens: 600,
            temperature: 0.5 
        }
    };

    const response = await axios.post(URL, body);
    const text = response.data.candidates[0].content.parts[0].text;
    
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : text;
        return JSON.parse(jsonString)
    } catch (e) {
        console.error("AI Error:", text);
        throw new Error("AI data error");
    }
}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        args: [ "--no-sandbox", "--disable-setuid-sandbox" ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null
    })
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const API_KEY = process.env.GOOGLE_GENAI_API_KEY;
    const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const prompt = `Generate resume for:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
                        Return JSON: { "html": "..." }`

    const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 2000 }
    };

    const response = await axios.post(URL, body);
    const text = response.data.candidates[0].content.parts[0].text;
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    const jsonContent = JSON.parse(jsonString)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }