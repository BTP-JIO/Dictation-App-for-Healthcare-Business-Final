import toast from "react-hot-toast";

export const handleApiError = (error) => {
  if (!error.response) {
    toast.error("Network error. Please check your connection.", {
      icon: "🔌",
      duration: 4000,
      className: "bg-red-50 text-red-800 border border-red-200",
    });
    return;
  }

  const message = error.response?.data?.message || "Something went wrong";
  toast.error(message, {
    duration: 4000,
    className: "bg-red-50 text-red-800 border border-red-200",
    style: { maxWidth: "500px" },
  });
};

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    className: "bg-green-50 text-green-800 border border-green-200",
  });
};
