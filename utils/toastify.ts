import { toast } from 'react-toastify';

export function toastify(msg){
  toast(msg, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
}