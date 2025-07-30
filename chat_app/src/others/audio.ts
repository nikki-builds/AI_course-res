import OpenAI from "openai";
import { writeFileSync, createReadStream } from "fs";

const openai = new OpenAI();

async function createTranscription() {
  const response = await openai.audio.transcriptions.create({
    file: createReadStream('AudioSample.m4a'),
    model: 'whisper-1',
    language: 'en'
  });
  console.log(response)
}

async function translate() {
  const response = await openai.audio.translations.create({
    file: createReadStream('FrenchSample.m4a'),
    model: 'whisper-1'
  })
  console.log(response);
}

async function textToSpeech() {
  const sampleText = 'French is a Romance language of the Indo-European family. Like all other Romance languages, it descended from the Vulgar Latin of the Roman Empire. '
  const response = await openai.audio.speech.create ({
    input: sampleText,
    voice: 'alloy',
    model: 'tts-1',
    response_format: 'mp3'
  })
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync('France.mp3', buffer)

}

textToSpeech();