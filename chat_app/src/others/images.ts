import { writeFileSync } from 'fs';
import path from 'path';
import OpenAI from 'openai'

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