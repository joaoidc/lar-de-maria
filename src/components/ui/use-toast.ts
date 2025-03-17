"use client";

// Inspired by react-hot-toast library
import * as React from "react";
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  duration?: number;
};

export interface ToastActionElement
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText: string;
}

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: () => sonnerToast.dismiss(),
    error: (message: string) => sonnerToast.error(message),
    success: (message: string) => sonnerToast.success(message),
    warning: (message: string) => sonnerToast.warning(message),
    info: (message: string) => sonnerToast.info(message),
    loading: (message: string) => sonnerToast.loading(message),
  };
}
