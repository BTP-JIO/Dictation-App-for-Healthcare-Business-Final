import React, { useEffect, useRef, useState } from "react";
import { RecordButton } from "../components/RecordButton";
import RadioButton from "../components/ui/RadioButtons";
import { Alert, AlertDescription } from "../components/ui/Alert";
import "./Dictate.css";
import { redirect, useLoaderData } from "react-router-dom";
import { getStoredTranscription, saveTranscription } from "../utils/transcriptionStorage";

export const dictateLoader = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  if (!userDetails?.username) {
    return redirect("/login");
  }
  return userDetails;
};

const Dictate = () => {
  const data = useLoaderData();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // Initialize transcription from local storage
  useEffect(() => {
    const storedTranscription = getStoredTranscription();
    if (storedTranscription) {
      setTranscription(storedTranscription);
    }
  }, []);

  // Update local storage when transcription changes
  useEffect(() => {
    saveTranscription(transcription);
  }, [transcription]);

  return (
    <div className="bg-[#6881fd]/10 h-[90vh] w-screen flex justify-center items-center py-6">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 h-[600px]">
          {/* Visualizer Card */}
          <div className="min-w-[300px] md:min-w-[400px] border border-[#9DCEFF] bg-[#ecf5ff] bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6 flex flex-col justify-between h-full">
            <div className="bg-gradient-to-r from-[#61b0ff] to-[#6881fd] text-white text-center py-2 rounded-md">
              <h2 className="text-xl font-semibold">Audio Recorder</h2>
            </div>
            <div className="mt-2 flex flex-col items-center">
              <RecordButton
                setTranscription={setTranscription}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
              />
              <p className="mt-1 italic text-sm bg-gradient-to-r from-[#0080ff] to-[#002aff] bg-clip-text text-transparent">
                {isProcessing
                  ? "Processing..."
                  : isRecording
                  ? "Recording..."
                  : "Click to start recording"}
              </p>
            </div>
          </div>

          {/* Transcription Card */}
          <div className="min-w-[400px] md:w-[800px] bg-gradient-to-r from-[#9DCEFF]/30 to-[#92A3FD]/30 bg-opacity-80 backdrop-blur-md border border-[#9DCEFF] rounded-lg shadow-lg p-6 flex flex-col h-full">
            <div className="bg-gradient-to-r from-[#61b0ff] to-[#6881fd] text-white text-center py-2 rounded-md">
              <h2 className="text-xl font-semibold">Real-Time Transcription</h2>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <textarea
              className={`w-full h-full text-slate-900 font-mono mt-4 p-4 bg-white border border-indigo-300 rounded-lg resize-none ${
                isRecording ? "animate-glow caret-yellow-400 caret-glow" : ""
              }`}
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              placeholder="Your transcription will appear here in real-time..."
              readOnly={isProcessing}
            />
            <div className="flex justify-center mt-4">
              <RadioButton transcription={transcription} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictate;
