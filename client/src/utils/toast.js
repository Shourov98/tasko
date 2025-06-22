import { toast } from "sonner";

export const notify = {
  success: (msg) => toast.success(msg),
  error:   (msg) => toast.error(msg),
  warn:    (msg) => toast.warning?.(msg) || toast(msg, { theme: "warning" }),
};
