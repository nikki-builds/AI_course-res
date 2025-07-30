import {  writeFileSync, createReadStream } from 'fs';
import path from 'path';
import OpenAI from 'openai'
import { buffer } from 'stream/consumers';

const openai = new OpenAI();

// async function generateFreeImage() {
//   const response = await openai.images.generate({
//     prompt: 'A photo of a dog on a couch',
//     model: 'dall-e-2',
//     size: '256x256',
//     n: 1
//   });
//   console.log(response);
// }

// generateFreeImage();

type ImageResponse = {
  data: {
    b64_json: string;
  }[];
};

async function generateFreeLocalImage() {
  const response = await openai.images.generate({
    prompt: 'A photo of a toy poodle on a couch',
    model: 'dall-e-2',
    size: '256x256',
    n: 1,
    response_format: 'b64_json'
  }) as ImageResponse;
  const rawImage = response.data[0].b64_json;

  if(rawImage) {
    const filePath = path.join(__dirname, 'dogCouch.png')
    writeFileSync(filePath, Buffer.from(rawImage, 'base64'))
    console.log('image saved to:', filePath);
  } else {
    console.log('no image returned in base64 format');
  }
  
}

generateFreeLocalImage();


async function generateAdvancedImage(){
  const response = await openai.images.generate({
    prompt: 'a photo of city at night with skyscrapers',
    model: 'dall-e-3',
    size: '1024x1024',
    response_format: 'b64_json'
  }) as ImageResponse;
  const rawImage = response.data[0].b64_json;
  if(rawImage) {
    const filePath = path.join(__dirname, 'city.png')
    writeFileSync(filePath, Buffer.from(rawImage, 'base64'))
    console.log('image saved to:', filePath)
  } else {
    console.log('no image returned in base64 format')
  }
}
generateAdvancedImage();


async function generateImageVariation() {
  const response = await openai.images.createVariation({
    image: createReadStream('city.png'),
    model: 'dall-e-2',
    response_format: 'b64_json'
  }) as ImageResponse;
  const rawImage = response.data[0].b64_json;
  if(rawImage) {
    writeFileSync('cityVariation.png', Buffer.from(rawImage, 'base64'))
  }
}

generateImageVariation();