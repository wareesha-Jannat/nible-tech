import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import ServicePage from "./ServicePage";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { ServiceItem } from "@/lib/types";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

// -----------------------------
// CACHED FETCH (IMPORTANT)
// -----------------------------
const getService = cache(
  async (category: string, slug: string): Promise<ServiceItem | null> => {
    await connectDB();

    const service = await Service.findOne({
      category,
      slug,
    }).lean();

    if (!service) return null;

    return JSON.parse(JSON.stringify(service)) as ServiceItem;
  },
);

// -----------------------------
// METADATA
// -----------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const service = await getService(category, slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service does not exist.",
    };
  }

  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.shortDescription,
  };
}

// -----------------------------
// PAGE
// -----------------------------
const Page = async ({ params }: Props) => {
  const { category, slug } = await params;
  const service = await getService(category, slug);

  if (!service) return notFound();

  return (
    <div>
      <ServicePage service={service} />
    </div>
  );
};

export default Page;
