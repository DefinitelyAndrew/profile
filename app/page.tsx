import { cookies } from "next/headers";
import ClientShell from "./components/ClientShell";

export default function Home() {
  // Read the viewedIntro cookie on the server so the SSR'd markup matches
  // what the client will render after hydration. Without this, server-side
  // document is undefined → skipIntro defaults to false → hydration mismatch
  // when the client sees the cookie and flips skipIntro to true.
  const hasViewedIntro = cookies().get("viewedIntro")?.value === "1";
  return <ClientShell hasViewedIntro={hasViewedIntro} />;
}
