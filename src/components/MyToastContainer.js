import React from 'react'
import { ToastContainer } from 'react-toastify';

export default function MyToastContainer() {
  return (
    <ToastContainer position="top-center"
			autoClose={300}
			limit={1}
			hideProgressBar
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			pauseOnHover={false}
			theme="light"/>
  )
}
