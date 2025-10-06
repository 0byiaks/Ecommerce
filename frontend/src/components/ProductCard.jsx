function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product?.name || 'Product Name'}</h3>
      <p>${product?.price || '0.00'}</p>
    </div>
  );
}

export default ProductCard;
