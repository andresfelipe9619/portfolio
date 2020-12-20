import React from "react";
import Title from "../components/text/Title";
import { i18n } from "@lingui/core";

export default function MyWork() {
  return <Title>{i18n._("workTitle")}</Title>;
}
