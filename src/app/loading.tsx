import { getServerMessages } from "@/lib/i18n/server";

export default async function Loading() {
  const { m } = await getServerMessages();
  return <p className="text-sm text-muted-foreground">{m.loading.page}</p>;
}
