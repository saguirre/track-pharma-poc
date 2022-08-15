import { useState } from "react";

export interface Notification {
  title: string;
  message: string;
  isError?: boolean;
}

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification>();

  const createNotification = (notification: Notification) => {
    setNotification(notification);
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return { createNotification, closeNotification, notification, showNotification };
};
