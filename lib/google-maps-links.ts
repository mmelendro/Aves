/** External Maps actions only. No SDK, requests, private origin or API credentials. */
export function googleMapsLink(action: "search" | "directions", publicQuery: string) {
  const url = new URL(action === "search" ? "https://www.google.com/maps/search/" : "https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set(action === "search" ? "query" : "destination", publicQuery);
  return url.toString();
}
