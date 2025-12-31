"use client";
import React from "react";

export default function BottomSheet({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-[480px] mx-auto bg-white rounded-t-2xl p-4 animate-slideUp">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">{title}</h2>
          <button onClick={onClose} className="text-lg">✕</button>
        </div>

        <div className="text-sm text-gray-700 space-y-3 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
