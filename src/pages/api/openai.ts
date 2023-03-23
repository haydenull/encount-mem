import { OpenAIStream } from '~/utils/openaiStream'

export const config = {
  runtime: 'edge',
}
const OPENAI_PARAMS = {
  model: 'gpt-3.5-turbo',
  temperature: 0,
  max_tokens: 1000,
  top_p: 1,
  frequency_penalty: 1,
  presence_penalty: 1,
  stream: true,
}

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string
  }

  const payload = {
    ...OPENAI_PARAMS,
    prompt: prompt,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}

export default handler