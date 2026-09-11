// @refresh reset
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Check,
  CheckCheck,
  Loader2,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNotificationStore } from "../../store/notificationStore";
import { useNotificationWebSocket } from "../../hooks/useNotificationWebSocket";

const getErrorMessage = (error) =>
  error?.response?.data?.detail ||
  error?.response?.data?.message ||
  "Could not update notifications. Please try again.";

const formatNotificationTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 1000),
  );
  if (elapsedSeconds < 60) return "Just now";
  if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`;
  if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)}h ago`;
  if (elapsedSeconds < 604800) return `${Math.floor(elapsedSeconds / 86400)}d ago`;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  }).format(date);
};

const NotificationDrawer = ({
  open,
  onClose,
  onUnreadCountChange,
  onRealtimeNotification,
}) => {
  const [pendingAction, setPendingAction] = useState(null);
  const notifications = useNotificationStore((state) => state.notifications);
  const isLoading = useNotificationStore((state) => state.isLoading);
  const error = useNotificationStore((state) => state.error);
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications,
  );
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  const removeNotification = useNotificationStore(
    (state) => state.deleteNotification,
  );
  const unreadCount = notifications.filter((item) => !item.is_read).length;

  useNotificationWebSocket(onRealtimeNotification);

  useEffect(() => {
    fetchNotifications().catch(() => {});
  }, [fetchNotifications]);

  useEffect(() => {
    if (open) fetchNotifications().catch(() => {});
  }, [fetchNotifications, open]);

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [onUnreadCountChange, unreadCount]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const acknowledge = async (id) => {
    setPendingAction(`read-${id}`);
    try {
      await markAsRead(id);
    } catch (actionError) {
      toast.error(getErrorMessage(actionError));
    } finally {
      setPendingAction(null);
    }
  };

  const deleteNotification = async (id) => {
    setPendingAction(`delete-${id}`);
    try {
      await removeNotification(id);
    } catch (actionError) {
      toast.error(getErrorMessage(actionError));
    } finally {
      setPendingAction(null);
    }
  };

  const readAll = async () => {
    setPendingAction("read-all");
    try {
      await markAllAsRead();
    } catch (actionError) {
      toast.error(getErrorMessage(actionError));
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close notifications"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default bg-black/35 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border-primary bg-surface-primary shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border-primary px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-dark text-text-inverted">
                  <Bell size={20} />
                </div>
                <div>
                  <h2
                    id="notification-drawer-title"
                    className="text-lg font-black tracking-tight text-text-primary"
                  >
                    Notifications
                  </h2>
                  <p className="text-xs font-semibold text-text-secondary">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
                      : "You're all caught up"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close notifications"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-surface-secondary hover:text-text-primary"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-border-secondary px-5 py-3 sm:px-6">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
                Recent
              </p>
              <button
                type="button"
                onClick={readAll}
                disabled={unreadCount === 0 || pendingAction === "read-all"}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-default disabled:opacity-40"
              >
                {pendingAction === "read-all" ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <CheckCheck size={15} />
                )}
                Read all
              </button>
            </div>

            <div className="styled-scrollbar flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-text-secondary">
                  <Loader2 size={28} className="animate-spin" />
                  <p className="text-sm font-bold">Loading notifications...</p>
                </div>
              ) : error ? (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <Bell size={26} />
                  </div>
                  <h3 className="font-black text-text-primary">
                    Couldn't load notifications
                  </h3>
                  <p className="mt-1 max-w-xs text-sm font-medium text-text-secondary">
                    {getErrorMessage(error)}
                  </p>
                  <button
                    type="button"
                    onClick={() => fetchNotifications().catch(() => {})}
                    className="mt-5 flex cursor-pointer items-center gap-2 rounded-xl bg-surface-dark px-4 py-2.5 text-sm font-bold text-text-inverted"
                  >
                    <RefreshCw size={15} />
                    Try again
                  </button>
                </div>
              ) : notifications.length > 0 ? (
                <div className="divide-y divide-border-secondary">
                  <AnimatePresence initial={false}>
                    {notifications.map((notification) => (
                      <motion.article
                        layout
                        key={notification.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, height: 0 }}
                        className={`relative px-5 py-5 sm:px-6 ${
                          notification.is_read
                            ? "bg-surface-primary"
                            : "bg-surface-secondary/70"
                        }`}
                      >
                        {!notification.is_read && (
                          <span className="absolute left-2 top-7 h-2 w-2 rounded-full bg-text-primary" />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-sm font-black text-text-primary">
                              {notification.title}
                            </h3>
                            <button
                              type="button"
                              onClick={() => deleteNotification(notification.id)}
                              disabled={pendingAction === `delete-${notification.id}`}
                              aria-label={`Delete ${notification.title}`}
                              className="-mt-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-wait disabled:opacity-50"
                            >
                              {pendingAction === `delete-${notification.id}` ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                          <p className="mt-1 text-sm font-medium leading-5 text-text-secondary">
                            {notification.message}
                          </p>
                          <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                            {formatNotificationTime(notification.created_at)}
                          </p>
                          {!notification.is_read && (
                            <button
                              type="button"
                              onClick={() => acknowledge(notification.id)}
                              disabled={pendingAction === `read-${notification.id}`}
                              className="mt-4 flex cursor-pointer items-center gap-1.5 rounded-lg border border-border-primary bg-surface-primary px-3 py-2 text-xs font-bold text-text-primary shadow-sm transition-colors hover:bg-surface-secondary disabled:cursor-wait disabled:opacity-50"
                            >
                              {pendingAction === `read-${notification.id}` ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Check size={14} />
                              )}
                              Acknowledge
                            </button>
                          )}
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary text-zinc-400">
                    <Bell size={26} />
                  </div>
                  <h3 className="font-black text-text-primary">No notifications</h3>
                  <p className="mt-1 max-w-xs text-sm font-medium text-text-secondary">
                    New updates will appear here when they arrive.
                  </p>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDrawer;
