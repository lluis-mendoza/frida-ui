import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Alert, AlertProps } from './Alert';
import { ToastContainer } from './Alert.styled';

interface IProps {
  children: JSX.Element | JSX.Element[];
  maxNumberAlerts?: number;
  delay?: number;
}
interface QueueAlertProps extends AlertProps {
  autoHideDuration?: number;
}
interface QueueAlertItem extends QueueAlertProps {
  id: string;
}
export interface IAlertContext {
  raiseAlert: (alertProps: QueueAlertProps) => void;
}
export const AlertContextEmptyState: IAlertContext = {
  raiseAlert: () => undefined,
};
const AlertContext = createContext<IAlertContext>(AlertContextEmptyState);

export const AlertProvider = ({
  children,
  maxNumberAlerts = 4,
  delay = 300,
}: IProps) => {
  const [alerts, setAlerts] = useState<QueueAlertItem[]>([]);

  const raiseAlert = useCallback((alert: QueueAlertProps) => {
    const id = uuidv4();
    setAlerts((_alerts) => [..._alerts, { id, ...alert }]);
    const autoHideDuration = alert.autoHideDuration ?? 3000;

    setInterval(() => {
      setAlerts((_alerts) => _alerts.filter((_alert) => _alert.id !== id));
    }, autoHideDuration);
  }, []);

  const handleClose = (id: string) => {
    setAlerts((_alerts) => _alerts.filter((_alert) => _alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ raiseAlert }}>
      <ToastContainer>
        <AnimatePresence>
          {alerts.slice(0, maxNumberAlerts).map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ x: '-100%', opacity: 0, display: 'none' }}
              animate={{ x: 0, opacity: 1, display: 'block' }}
              exit={{
                x: '-100%',
                opacity: 0,
                transitionEnd: { display: 'none' },
              }}
              transition={{
                ease: 'easeOut',
                duration: 0.3,
                delay: (delay / 1000) * index,
              }}
            >
              <Alert {...alert} onClose={() => handleClose(alert.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </ToastContainer>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('AlertContext must be used within a AlertProvider');
  }
  return context;
};
