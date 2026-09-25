import toast from "react-hot-toast";

export const popup = (header, description, type) => {
  // Combine header and description if both exist, otherwise use whichever is provided
  const message = header && description 
    ? `${header}: ${description}` 
    : (description || header || "Notification");

  switch (type) {
    case "success":
    case "login":
    case "register":
    case "save":
      return toast.success(message);
    case "error":
      return toast.error(message);
    case "loading":
      return toast.loading(message);
    case "warning":
      return toast(message, { icon: '⚠️' });
    case "info":
    case "logout":
    default:
      return toast(message);
  }
};
