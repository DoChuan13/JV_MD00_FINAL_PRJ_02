import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Default = (notify) => toast(notify);
export const Info = (notify) => toast.info(notify);
export const Success = (notify) => toast.success(notify);
export const Warning = (notify) => toast.warning(notify);
export const Error = (notify) => toast.error(notify);

function Toast(props) {
  return (
    <div>
      {/* <button onClick={Default}>Default !</button>
      <button onClick={Info}>Info !</button>
      <button onClick={Success}>Success !</button>
      <button onClick={Warning}>Warning !</button>
      <button onClick={Error}>Error !</button> */}

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Toast;
