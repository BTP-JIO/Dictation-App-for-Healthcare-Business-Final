// import * as uuid from "uuid";
// import Client from "../../generated/speech_to_text_service_grpc_web_pb.cjs";
// import proto from "../../generated/speech_to_text_service_pb.cjs";

// export async function getSttTranscription(audioChunk, language, domain) {
// const audio = new proto.Audio();
// const audioMetaData = new proto.AudioMetaData();
// const user = new proto.User();
// const session = new proto.Session();
// const audioMessage = new proto.AudioMessage();
// const sttRequest = new proto.SpeechToTextRequest();
// const client = new Client.SpeechToTextClient("10.168.131.225:32000", 34543, {
//   format: "binary",
// });
// console.log(client, "%^&*$#@");
// const userId = uuid.v4();
// audio.setContent(audioChunk);
// audio.setUri("test");
// audioMetaData.setLang(language);
// audioMetaData.setDomain(domain);
// user.setId(userId);
// session.setId(userId);
// session.setEnd(false);
// audioMessage.setAudio(audio);
// audioMessage.setContext(audioMetaData);
// audioMessage.setUser(user);
// audioMessage.setSession(session);
// audioMessage.setId(1);
// sttRequest.setMessage(audioMessage);
// return new Promise((resolve, reject) => {
//   const stream = client.transcribe(sttRequest, {}, (err, response) => {
//     if (err) {
//       console.error("Error during transcription:", err.message);
//       reject(err);
//     } else {
//       console.log("Transcription response:", response);
//       const transcript = response.getResult().getTranscription();
//       resolve(transcript);
//     }
//   });

//   stream.write(sttRequest);
//   stream.on("data", (response) => {
//     console.log("Received data:", response);
//     const transcript = response.getResult().getTranscription();
//   });

//   stream.on("end", () => {
//     console.log("Transcription completed.");
//     resolve("Transcription completed");
//   });
//   stream.on("error", (err) => {
//     console.error("Stream error:", err);
//     reject(err);
//   });
// });
// }
// // // ---PREPROCESS AUDIO---
// function preprocessAudio(audioStream) {
//   return new Promise((resolve, reject) => {
//     const reader = new wav.Reader();
//     const chunks = [];
//     let sampleRate = 0;
//     reader.on("format", (format) => {
//       sampleRate = format.sampleRate;
//     });
//     reader.on("data", (chunk) => {
//       chunks.push(chunk);
//     });
//     reader.on("end", () => {
//       const data = Buffer.concat(chunks);
//       resolve({ data, sampleRate });
//     });
//     reader.on("error", reject);
//     audioStream.pipe(reader);
//   });
// }
// // // ---TRANSCRIBE---
// export async function transcribe(stream, newChunk) {
//   const { data: chunkData, sampleRate } = await preprocessAudio(newChunk);
//   const normalized = Buffer.from(
//     chunkData.map((value) => value / Math.max(...chunkData))
//   );
//   if (stream) {
//     stream = Buffer.concat([stream, normalized]);
//     if (stream.length > 48000 * 30) {
//       stream = normalized;
//     }
//   } else {
//     stream = normalized;
//   }
//   const transcription = await getSttTranscription(
//     stream,
//     "en_IN",
//     "CALLCENTER"
//   );
//   return { stream, transcription };
// }
//   (async () => {
//     // ---`audioStream` IS AN AUDIO STREAM FROM MICROPHONE---
//     let stream = null;
//     const newChunk = fs.createReadStream("path/to/audio.wav");
//     const { stream: updatedStream, transcription } = await transcribe(
//       stream,
//       newChunk
//     );
//     console.log("Transcription:", transcription);
// }

// getSttTranscription();
