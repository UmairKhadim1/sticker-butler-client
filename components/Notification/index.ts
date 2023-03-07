import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NotifMessages(type: string, message: string): any {
  switch (type) {
    case 'info':
      return toast.info(message, {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    case 'success':
      return toast.success(message, {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    case 'warning':
      return toast.warning(message, {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    // break;
    case 'error':
      return toast.error(message, {
        position: 'top-right',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    // break;
    default:
      return false;
  }
}
