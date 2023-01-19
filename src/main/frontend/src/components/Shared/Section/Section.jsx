import React from "react";

export default function Section({ styles, children }) {
  return (
    <section
      className={`w-full min-w-[17rem] mb-14 ${styles ? styles : ""} md:mb-10`}
    >
      {children}
    </section>
  );
}
