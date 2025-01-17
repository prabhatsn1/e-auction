// components/editor.tsx
import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, className }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-4 border border-gray-300 rounded-md ${className}`}
      rows={8}
    />
  );
};

export default Editor;