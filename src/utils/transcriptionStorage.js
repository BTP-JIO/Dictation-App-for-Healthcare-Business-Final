export const TRANSCRIPTION_STORAGE_KEY = 'current_transcription';

export const saveTranscription = (transcription) => {
  localStorage.setItem(TRANSCRIPTION_STORAGE_KEY, transcription);
};

export const getStoredTranscription = () => {
  return localStorage.getItem(TRANSCRIPTION_STORAGE_KEY) || '';
};

export const clearTranscription = () => {
  localStorage.removeItem(TRANSCRIPTION_STORAGE_KEY);
}; 