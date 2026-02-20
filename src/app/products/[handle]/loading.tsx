import { getServerMessages } from "@/lib/i18n/server";

export default async function LoadingProductDetail() {
  const { m } = await getServerMessages();
  return <p className="text-sm text-muted-foreground">{m.loading.productDetail}</p>;
}
