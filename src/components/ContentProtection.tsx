import { useEffect } from "react";

/**
 * ContentProtection Component
 * Disables right-click, text selection, image dragging, and common
 * keyboard shortcuts used for copying or saving content.
 *
 * IMPORTANT: links, buttons, and form inputs remain fully functional —
 * clicks/taps on <a>, <button>, <input>, <textarea>, and [role="button"]
 * are never blocked, so navigation works every time.
 */
const ContentProtection = () => {
  useEffect(() => {
    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return !!el.closest(
        'a, button, input, textarea, select, label, [role="button"], [role="link"], [contenteditable="true"]'
      );
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as Element | null;
      if (target && (target.tagName === "IMG" || target.tagName === "VIDEO")) {
        e.preventDefault();
      }
    };

    const handleSelectStart = (e: Event) => {
      if (isInteractive(e.target)) return;
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      if (isInteractive(e.target)) return;
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block DevTools / view-source / save shortcuts
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) {
        e.preventDefault();
        return;
      }
      if (ctrl && ["S", "U", "P"].includes(e.key.toUpperCase())) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("keydown", handleKeyDown);

    // Apply CSS user-select: none globally, but allow inputs
    const style = document.createElement("style");
    style.setAttribute("data-content-protection", "true");
    style.textContent = `
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      img, video {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
        pointer-events: auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keydown", handleKeyDown);
      style.remove();
    };
  }, []);

  return null;
};

export default ContentProtection;
