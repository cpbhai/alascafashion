function payment(
  product = {
    title: "Blue Saree",
    _id: 1,
    quantity: 2,
    disCost: 100,
    sizes: ["XL"],
    size: 0,
    colours: ["Red"],
    colour: 0,
  },
  amount = 1000,
  name = "Harsh",
  phone = "8077015752"
) {
  const data = { currency: "INR", amount: amount * 100 };

  const options = {
    key: "rzp_live_43gEiC95hG74ZX",
    currency: data.currency,
    amount: data.amount.toString(),
    name: "Alasca Fashion",
    description: `${product.title.slice(0, 20)}...${product._id}`,
    handler: function (response) {
      let payload = {
        payment_id: response.razorpay_payment_id,
        quantity: product.quantity,
        product: product._id,
        name,
        phone,
        address,
        disCost: product.disCost,
        otherDetails: {
          size: product.sizes[product.size],
          colour: product.colours[product.colour],
          status: "Ordered",
        },
      };
      //   dispatch(createOrder(payload));
    },
    prefill: {
      name,
      // email: user.email,
      //   email:"hvsreal.223@gmail.com",
      contact: phone,
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
