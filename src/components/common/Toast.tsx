import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="animate-fade-in"
            style={{
              pointerEvents: 'auto',
              background: 'var(--surface-elevated)',
              border: `1px solid ${
                isSuccess
                  ? 'var(--success-border)'
                  : isError
                  ? 'var(--error-border)'
                  : 'var(--border-default)'
              }`,
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <div style={{ marginTop: '2px', flexShrink: 0 }}>
              {isSuccess && <CheckCircle2 size={18} color="var(--success)" />}
              {isError && <AlertCircle size={18} color="var(--error)" />}
              {!isSuccess && !isError && <Info size={18} color="var(--brand-primary)" />}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                }}
              >
                {toast.title}
              </div>
              {toast.description && (
                <div
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    lineHeight: 1.4,
                  }}
                >
                  {toast.description}
                </div>
              )}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              style={{
                color: 'var(--text-muted)',
                padding: '2px',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
