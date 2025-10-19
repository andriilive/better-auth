"use client";

import { type ExternalToast, toast as toastFn, useSonner } from "sonner";

type ToastTypes =
  | "normal"
  | "action"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading"
  | "default";

interface ToastOptions extends ExternalToast {
  message: string;
  type?: ToastTypes;
}

/**
 * Custom ShadCN-compatible toaster using Sonner.
 */
export const useToast = () => {
  const { toasts } = useSonner();

  function toast({ message, type = "default", ...options }: ToastOptions) {
    switch (type) {
      case "success":
        return toastFn.success(message, options);
      case "info":
        return toastFn.info(message, options);
      case "warning":
        return toastFn.warning(message, options);
      case "error":
        return toastFn.error(message, options);
      case "loading":
        return toastFn.loading(message, options);
      case "action":
        return toastFn(message, { action: options.action, ...options });
      default:
        return toastFn(message, options);
    }
  }

  function errorToast(message: string, options?: Omit<ExternalToast, "message">) {
    return toastFn.error(message, options);
  }

  function infoToast(message: string, options?: Omit<ExternalToast, "message">) {
    return toastFn.info(message, options);
  }

  function successToast(message: string, options?: Omit<ExternalToast, "message">) {
    return toastFn.success(message, options);
  }

  function warningToast(message: string, options?: Omit<ExternalToast, "message">) {
    return toastFn.warning(message, options);
  }

  function actionToast(message: string, action: ExternalToast["action"], options?: Omit<ExternalToast, "message" | "action">) {
    return toastFn(message, { action, ...options });
  }

  function defaultToast(message: string, options?: Omit<ExternalToast, "message">) {
    return toastFn(message, options);
  }

  function loadingToast(message: string, options?: Omit<ExternalToast, "message">) {
    return toastFn.loading(message, options);
  }

  return { toasts, toast, errorToast, infoToast, successToast, warningToast, actionToast, defaultToast, loadingToast };
};
