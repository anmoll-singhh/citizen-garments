import type { Metadata } from "next";
import type React from "react";
export const metadata: Metadata = {
title: "Shop All Lingerie | Bras, Panties, Sets & Slips",
description:
"Browse the full collection of bras, panties, lingerie sets, slips and sports bras",
" from Citizen Lingerie. Filter by category. Based in Ulhasnagar, India.",
alternates: {
canonical: "https://citizenslingerie.com/products",
},
openGraph: {
title: "Shop All Lingerie | Citizen Lingerie",
description: "Browse bras, panties, sets, slips & sports bras from Citizen Lingerie.",
url: "https://citizenslingerie.com/products",
type: "website",
},
};
export default function ProductsLayout({
children,
}: {
children: React.ReactNode;
}) {
return <>{children};
}
