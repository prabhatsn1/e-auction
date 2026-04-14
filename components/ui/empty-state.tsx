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
    className="flex flex-col items-center justify-center py-16 px-4 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-md mb-6">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction} className="rounded-xl">
        {actionLabel}
      </Button>
    )}
  </motion.div>
);
