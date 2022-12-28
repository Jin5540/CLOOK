import React from "react";

export default function Section({ styles, children }) {
  return (
    <section
      className={`w-full max-w-[992px] bg-white px-1 mb-14 ${styles && styles}`}
    >
      {children}
    </section>
  );
}
