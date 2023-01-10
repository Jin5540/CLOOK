import React from "react";

export default function Section({ styles, children }) {
  return (
    <section className={`w-full mb-14 ${styles ? styles : ""}`}>
      {children}
    </section>
  );
}
