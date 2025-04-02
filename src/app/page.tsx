"use client";

import { Suspense } from "react";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function IndexPage() {
  return (
    <Suspense>
      <Authenticated key="chat">
        <NavigateToResource resource="chat" />
      </Authenticated>
    </Suspense>
  );
}