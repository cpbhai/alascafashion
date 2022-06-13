function gateway(
  product,
  size,
  colour,
  quantity,
  amount,
  name,
  phone,
  address
) {
  const data = { currency: "INR", amount: 1 * 100 };

  const options = {
    key: "rzp_live_43gEiC95hG74ZX",
    currency: data.currency,
    amount: data.amount.toString(),
    name: "Alasca Fashion",
    description: `${product.title.slice(0, 20)}...${product._id}`,
    handler: function (response) {
      console.log(response);
      let payload = {
        payment_id: response.razorpay_payment_id,
        quantity,
        product: product._id,
        name,
        phone,
        address,
        disCost: product.disCost,
        otherDetails: {
          size,
          colour,
          status: "Ordered",
        },
      };
      $.post("/order/place", payload, function (response) {
        if (response.success) Swal.fire("Thanks", response.message, "success");
        // sendMail
        setTimeout(() => {
          window.open("/my/orders", "_self");
        }, 5000);
      });
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

function payment(payload) {
  const name = $(`#shipping-name`).val(),
    phone = $(`#shipping-phone`).val(),
    state = $(`#shipping-state`).val(),
    city = $(`#shipping-city`).val(),
    streetAddr = $(`#shipping-streetAddr`).val(),
    pincode = $(`#shipping-pincode`).val(),
    landmark = $(`#shipping-landmark`).val();

  if (!name) return Swal.fire("Oops", "Name is empty", "error");
  if (!phone) return Swal.fire("Oops", "Phone is empty", "error");
  if (!state) return Swal.fire("Oops", "State is empty", "error");
  if (!city) return Swal.fire("Oops", "City is empty", "error");
  if (!streetAddr) return Swal.fire("Oops", "Street Address is empty", "error");
  if (!pincode) return Swal.fire("Oops", "PIN Code is empty", "error");
  if (!landmark) return Swal.fire("Oops", "Landmark is empty", "error");
  const address = {
    state,
    city,
    pincode,
    streetAddr,
    landmark,
  };
  $.get(`/collection/product-data/${payload.product._id}`, function (response) {
    const { success, data } = response;
    let amount = data.disCost;
    payload.quantity = isNaN(Number(payload.quantity))
      ? 1
      : parseInt(payload.quantity);
    amount *= payload.quantity;
    if (success) {
      gateway(
        data,
        payload.size,
        payload.colour,
        payload.quantity,
        amount,
        name,
        phone,
        address
      );
    } else Swal.fire("Oops", "No such product was found", "error");
  });
}

function shippingHandler(key) {
  let shipping = localStorage.getItem("shippingInfo"),
    value = $(`#shipping-${key}`).val();
  if (shipping) {
    shipping = JSON.parse(shipping);
    shipping[`shipping-${key}`] = value;
    console.log(shipping);
    localStorage.setItem("shippingInfo", JSON.stringify(shipping));
  } else {
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify({ [`shipping-${key}`]: value })
    );
  }
}

function initCart() {
  let shipping = localStorage.getItem("shippingInfo");
  if (shipping) {
    shipping = JSON.parse(shipping);
    const keys = Object.keys(shipping);
    for (const k of keys) {
      $(`#${k}`).val(shipping[k]);
    }
  }
}
