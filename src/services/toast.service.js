import { toast } from 'react-toastify'
export const positionType = {
  topCenter: toast.POSITION.TOP_CENTER,
  topLeft: toast.POSITION.TOP_LEFT,
  topRight: toast.POSITION.TOP_RIGHT,
  bottomLeft: toast.POSITION.BOTTOM_LEFT,
  bottomCenter: toast.POSITION.BOTTOM_CENTER,
  bottomRight: toast.POSITION.BOTTOM_RIGHT,
}

export const toastType = {
  success: 'success',
  error: 'error',
  warn: 'warn',
  info: 'info',
}

const toastNotification = {
  showToast: (
    message,
    type = toastType.info,
    position = positionType.topRight
  ) => {
    switch (type) {
      case toastType.success: {
        toast.success(message, {
          position: position,
          className: 'toast-custom-class',
        })
        break
      }
      case toastType.error: {
        toast.error(message, {
          position: position,
          // className: 'toast-custom-class'
        })
        break
      }
      case toastType.warn: {
        toast.warn(message, {
          position: position,
          className: 'toast-custom-class',
        })
        break
      }
      case toastType.info: {
        toast.info(message, {
          position: position,
          className: 'toast-custom-class',
        })
        break
      }
      default: {
        toast.success(message, {
          position: position,
          className: 'toast-custom-class',
        })
        break
      }
    }
  },
}

export default toastNotification
