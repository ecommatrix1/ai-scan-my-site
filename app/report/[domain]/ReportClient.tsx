"use client";

import React from "react";
import AIScanMySite from "@/AIScanMySite";

interface ReportClientProps {
  domain: string;
}

export default function ReportClient({ domain }: ReportClientProps) {
  return <AIScanMySite initialDomain={domain} initialAutostart={true} />;
}
