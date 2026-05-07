export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  messageKey: string;
  titleKey?: string;
  type: ToastType;
}
