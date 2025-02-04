import toast from "react-hot-toast";

export const showEmptyTranscriptionWarning = () => {
  return toast(
    (t) => (
      <div className="flex items-center gap-2">
        <div className="text-amber-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-medium">
            No Transcription Data Available
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    ),
    {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f3f4f6",
        minWidth: "300px",
      },
    }
  );
};

// Add more toast notifications as needed
export const showSuccessToast = (message) => {
  return toast.success(message, {
    duration: 3000,
    position: "top-center",
    style: {
      background: "#fff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f3f4f6",
    },
  });
};

export const showErrorToast = (message) => {
  return toast.error(message, {
    duration: 4000,
    position: "top-center",
    style: {
      background: "#fff",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f3f4f6",
    },
  });
};
