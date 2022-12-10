import React from "react";
import Card from "../Shared/Card/Card";
import Section from "../Shared/Section/Section";
import Chart from "./Chart";

export default function Today() {
  return (
    <Section>
      <h1>오늘의 날씨</h1>
      <Card height="h-[600px]">
        <Chart />
      </Card>
    </Section>
  );
}
