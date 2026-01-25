import { Metadata } from "next";
import ValueClient from "./ValueClient";

export const metadata: Metadata = {
  title: "VALUE | TSUNAGU",
  description: "時を、命と捉える。TSUNAGUの4つの行動指針をご紹介します。",
};

export default function ValuePage() {
  return <ValueClient />;
}
