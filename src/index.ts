import { showHUD } from "@raycast/api";
import { exec } from "child_process";
import timers from "node:timers/promises";

export default async function Command(props: { arguments: { timer: string } }) {
  const { timer } = props.arguments;
  const minutes = parseInt(timer);

  if (isNaN(minutes) || minutes <= 0) {
    await showHUD("Please enter a positive number of minutes.");
    return;
  }

  const milliseconds = minutes * 60 * 1000;
  await showHUD(`Timer set for ${minutes} minute${minutes !== 1 ? "s" : ""}`);
  await timers.setTimeout(milliseconds);
  exec('osascript -e \'display notification "Timer is up!" with title "Simple Timer"\'');
}
