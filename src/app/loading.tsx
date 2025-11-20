import React from "react";

function Loading() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      {/* Amber colored loader */}
      <div className="border-t-4 border-b-4 border-transparent border-t-amber-500 animate-spin w-16 h-16 rounded-full"></div>
    </div>
  );
}

export default Loading;
