
import * as React from "react"
import { createContext, useContext } from "react"

import {
  toast as sonnerToast,
  ToastT,
  Toaster as SonnerToaster,
} from "sonner"

type ToastProps = React.ComponentPropsWithoutRef<typeof SonnerToaster>

type ToastActionElement = React.ReactElement<{
  altText: string
}>

type ToastActionProps = {
  altText: string
}

export interface Toast extends Omit<ToastT, "action"> {
  id: string | number
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive" | "success"
}

const TOAST_LIMIT = 10
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = Toast

type ToasterState = {
  toasts: ToasterToast[]
}

const toastState = {
  toasts: [],
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toast = ({ ...props }) => {
  const id = genId()

  const { variant = "default", title, description, ...restProps } = props

  sonnerToast[variant === "destructive" ? "error" : variant === "success" ? "success" : "info"](
    title,
    {
      id,
      description,
      ...restProps,
    }
  )

  return id
}

toast.dismiss = sonnerToast.dismiss
toast.success = (title: string, props: any = {}) => toast({ title, variant: "success", ...props })
toast.error = (title: string, props: any = {}) => toast({ title, variant: "destructive", ...props })
toast.info = (title: string, props: any = {}) => toast({ title, ...props })

const useToast = () => {
  return {
    toast,
    dismiss: toast.dismiss,
  }
}

export { useToast, toast }
export type { ToastProps, ToastActionProps }
