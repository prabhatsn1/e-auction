"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center px-4 py-16 text-center"
  >
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <p className="mb-6 max-w-md text-sm text-muted-foreground">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction} className="rounded-xl">
        {actionLabel}
      </Button>
    )}
  </motion.div>
);
