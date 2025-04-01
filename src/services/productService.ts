
// Re-export all product services
export * from './products/basicProductService';
export * from './products/searchProductService';
export * from './products/productDetailsService';
export * from './products/updateProductsService';

// Re-export common types
export type { ProductFilterParams, SortOption } from './products/searchProductService';

// Re-export utility functions
export { formatPrice } from './utils/formatters';
