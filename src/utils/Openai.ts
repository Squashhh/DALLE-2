import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI,
});  

const Openai = new OpenAIApi(configuration);

export { Openai };