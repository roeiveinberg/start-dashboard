"use client"

import { Toaster } from "react-hot-toast"

export const ToasterProvider = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                className: 'error',
                style: {
                    borderRadius: '0px',
                    border: '0.6px solid #9E9E9E',
                    boxShadow: '0 0 0 0',
                    padding: '12px 8px',
                    paddingLeft: '17px',
                    color: '#000000',
                    backgroundColor: '#F3F4F6',
                },
                iconTheme: {
                    primary: '#FF2424',
                    secondary: '#FFFAEE',
                },
                success: {
                    className: 'success',
                    style: {
                        borderRadius: '0px',
                        border: '0.6px solid #9E9E9E',
                        boxShadow: '0 0 0 0',
                        padding: '12px 8px',
                        paddingLeft: '17px',
                        color: '#000000',
                        backgroundColor: '#F3F4F6',
                    },
                    iconTheme: {
                        primary: '#61D345',
                        secondary: '#FFFAEE',
                    },
                }
            }}
        />
    )
}