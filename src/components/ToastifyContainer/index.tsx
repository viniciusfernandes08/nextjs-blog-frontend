'use client'

import { Bounce, ToastContainer } from "react-toastify";

export function ToastifyContainer() {
    return (
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce} 
        />
    )
}