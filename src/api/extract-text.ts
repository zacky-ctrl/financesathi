import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
});

export async function extractTextFromImage(base64Image: string, mimeType: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please extract all text from this image. Return only the text content, maintaining the original formatting and structure as much as possible. If there's no text in the image, respond with 'No text found'."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.1
    });

    return response.choices[0]?.message?.content || 'No text found';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to extract text using OpenAI API');
  }
}