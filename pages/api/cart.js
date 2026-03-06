const mockCartData = {
  cartItems: [
    {
      product_id: 101,
      product_name: "Bamboo Toothbrush (Pack of 4)",
      product_price: 299,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=300&auto=format&fit=crop"
    },
    {
      product_id: 102,
      product_name: "Reusable Cotton Produce Bags",
      product_price: 450,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1610419207601-a5698b5ce5ed?q=80&w=300&auto=format&fit=crop"
    }
  ],
  shipping_fee: 50,
  discount_applied: 0
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(mockCartData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
