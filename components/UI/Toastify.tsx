import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = props => {
  return (
    <ToastContainer
      newestOnTop={false}
      rtl={false}
      limit={1}
    />
  )
}

export default Toastify