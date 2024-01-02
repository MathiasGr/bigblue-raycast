import { LaunchProps, Toast, closeMainWindow, open, showToast } from "@raycast/api";

function getQuadri(str: string) {
  const match = str.match(/[A-Z0-9]{4}/);
  if (!match) throw new Error("Missing quadri");
  return match.join();
}

export default async function Command(props: LaunchProps) {
  try {
    const query = props.arguments.quadri || props.fallbackText;
    const quadri = getQuadri(query);
    try {
      await open(`https://app.bigblue.co/impersonate?t=${quadri}`);
      await closeMainWindow();
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Could not impersonate merchant",
        message: String(error),
      });
    }
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "No valid Bigblue quadri provided",
      message: String(error),
    });
  }
}
