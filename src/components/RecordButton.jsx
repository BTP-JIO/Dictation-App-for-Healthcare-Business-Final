import React, { useState, useEffect, useRef } from "react";
import { CirclePause, Mic } from "lucide-react";
import AudioAnalyser from "react-audio-analyser";
import io from "socket.io-client";
import { Buffer } from "buffer";
import { downSampleBuffer } from "../utils/getDownSampleBuffer";
import { formatTime } from "../utils/formatTime";

export const RecordButton = ({
  setIsRecording,
  isRecording,
  setTranscription,
}) => {
  const [status, setStatus] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [socket, setSocket] = useState(null);
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const RECORDING_MAX_DURATION = 240;
  const isRecordingRef = useRef(isRecording);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  if (!window.Buffer) {
    window.Buffer = Buffer;
  }

  useEffect(() => {
    const socketConnection = io("http://localhost:4700/");
    setSocket(socketConnection);
    socketConnection.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketConnection.on("transcript", (response) => {
      isRecordingRef.current && setTranscription(response);
    });

    socketConnection.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const controlAudio = (newStatus) => {
    setStatus(newStatus);
    if (newStatus === "recording") {
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          if (prevTime >= RECORDING_MAX_DURATION - 1) {
            controlAudio("inactive");
            clearInterval(timerRef.current);
            return RECORDING_MAX_DURATION;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startAudioStreaming = (audioStream) => {
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaStreamSource(audioStream);
    const scriptNode = audioContext.createScriptProcessor(16384, 1, 1);

    mediaRecorderRef.current = {
      audioContext,
      audioSource,
      scriptNode,
      audioStream,
    };

    scriptNode.onaudioprocess = (event) => {
      const inputData = new Float32Array(event.inputBuffer.getChannelData(0));
      const downsampledData = downSampleBuffer(inputData, 48000, 16000);
      if (socket?.connected) {
        socket.emit("audio-data", downsampledData);
      }
    };

    audioSource.connect(scriptNode);
    scriptNode.connect(audioContext.destination);
  };

  const startRecording = async () => {
    setIsRecording(true);
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    controlAudio("recording");
    startAudioStreaming(audioStream);
  };

  const stopRecording = () => {
    setIsRecording(false);
    controlAudio("inactive");
    if (mediaRecorderRef.current?.audioStream) {
      mediaRecorderRef.current.audioStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (mediaRecorderRef.current?.scriptNode) {
      mediaRecorderRef.current.scriptNode.disconnect();
    }
    if (mediaRecorderRef.current?.audioSource) {
      mediaRecorderRef.current.audioSource.disconnect();
    }
    if (mediaRecorderRef.current?.audioContext) {
      mediaRecorderRef.current.audioContext.close();
    }
    mediaRecorderRef.current = null;
  };

  const handleToggleRecording = (event) => {
    event.preventDefault();
    if (status === "recording") {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const audioProps = {
    audioType: "wav",
    status: status,
    timeslice: 1000,
    startCallback: () => setIsRecording(true),
    pauseCallback: () => console.log("Recording paused"),
    stopCallback: (e) => {
      setIsRecording(false);
    },
    errorCallback: (err) => console.error("Error occurred", err),
  };

  return (
    <div className="flex flex-col items-center gap-[100px]">
      <div className="w-full min-h-[190px] flex items-center justify-center max-w-md bg-gradient-to-r from-[#9DCEFF]/30 to-[#92A3FD]/30 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
        <AudioAnalyser
          {...audioProps}
          backgroundColor="transparent"
          strokeColor="#6781ff"
          className="w-full h-32"
        />
      </div>

      <div className="flex flex-col gap-2 items-center">
        <button
          onClick={handleToggleRecording}
          className="bg-gradient-to-r from-[#80bfff] to-[#738aff] hover:opacity-80 text-white font-bold p-4 rounded-full shadow-xl shadow-purple-200 mb-4 transition-all duration-300 ease-in-out transform hover:scale-105">
          {status === "recording" ? (
            <CirclePause size={32} className="text-red-600" />
          ) : (
            <Mic size={32} className="text-white" />
          )}
        </button>

        <div className="text-lg font-semibold mb-2 text-center bg-gradient-to-r from-[#5badff] to-[#6781ff] bg-clip-text text-transparent">
          {formatTime(recordingTime)}
        </div>
      </div>
    </div>
  );
};
