export interface IProduct {
  id: string;
  images: Array<{
    altText: string;
    height: number;
    url: string;
    width: number;
  }>;
  priceRange: {
    maxVariantPrice: string;
    minVariantPrice: string;
  };
  salePriceRange: {
    maxVariantPrice: string;
    minVariantPrice: string;
  } | null;
  title: string;
  url: string;
  variants: {
    colors: string[];
    sizes: string[];
  };
}
