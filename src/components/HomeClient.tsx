"use client";

import Hero from "@/components/Hero";
import ServiceSummary from "@/components/ServiceSummary";
import Introduction from "@/components/Introduction";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import Platform from "@/components/Platform";
import CallToAction from "@/components/CallToAction";

export default function HomeClient() {
  return (
    <>
      <Hero />
      <ServiceSummary />
      <Introduction />
      <ProblemSolution />
      <Features />
      <Platform />
      <CallToAction />
    </>
  );
}
