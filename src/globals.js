import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

window.showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};

<ToastContainer />;
