import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [nuevasNotificaciones, setNuevasNotificaciones] = useState(false);

  return (
    <NotificationContext.Provider value={{ nuevasNotificaciones, setNuevasNotificaciones }}>
      {children}
    </NotificationContext.Provider>
  );
};
