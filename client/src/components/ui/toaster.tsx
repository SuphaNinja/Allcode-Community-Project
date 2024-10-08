"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Bell, ArrowRight } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="border border-neutral-800 rounded-xl bg-slate-950/80">
            <div className="flex flex-col items-start space-y-3">
              {title && (
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                  <ToastTitle className="font-semibold text-neutral-100">{title}</ToastTitle>
                </div>
              )}
              {description && (
                <ToastDescription className="text-sm text-neutral-300">{description}</ToastDescription>
              )}
              {action && (
                <div className="flex items-center space-x-2 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">
                  {action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </div>
            <ToastClose className="text-neutral-400 hover:text-neutral-100" />
          </Toast>
        )
      })}
      <ToastViewport className="p-4 space-y-4" />
    </ToastProvider>
  )
}