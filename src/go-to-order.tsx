import { LaunchProps, Toast, closeMainWindow, open, showToast } from "@raycast/api";

function getOrderID(str: string) {
  const match = str.match(/[A-Z0-9]{4}[A-Z0-9]{7,12}/);
  if (!match) throw new Error("Missing order ID");
  return match.join();
}

function getQuadri(str: string) {
  return getOrderID(str).substring(0, 4);
}

export default async function Command(props: LaunchProps) {
  try {
    const query = props.arguments.order || props.fallbackText;
    const order = getOrderID(query);
    const quadri = getQuadri(query);
    try {
      await open(`https://app.bigblue.co/impersonate?t=${quadri}#/orders/${order}`);
      await closeMainWindow();
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Could not open order",
        message: String(error),
      });
    }
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "No valid Bigblue order ID provided",
      message: String(error),
    });
  }
}
