"use client";

import { motion } from "framer-motion";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export default function RenderOnScroll({ list }: { list: JSX.Element[] }) {
  // The scrollable element for your list
  const parentRef = useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div ref={parentRef}>
      <div
        className="flex flex-col gap-4"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            key={virtualItem.key}
          >
            {list[virtualItem.index]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
