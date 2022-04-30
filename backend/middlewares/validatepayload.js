exports.userSignup = (payload) => {
  if (!payload.role) throw { message: "Role is missing" };
  if (!["Client", "Supplier"].includes(payload.role))
    throw { message: "Allowed Roles: Client or Supplier" };
  return payload;
};
exports.userLogin = (payload) => {
  if (!payload.ID) throw { message: "phone or email is missing" };
  if (!payload.password) throw { message: "phone or email is missing" };
  if (payload.ID.includes("@")) payload.email = payload.ID;
  else payload.phone = payload.ID;
  delete payload.ID;
  return payload;
};

exports.addProduct = async (payload, _id) => {
  payload.postedBy = _id;
  payload.avgRating = 0;
  const cloudinary = require("cloudinary");
  if (!payload.theimages) throw { message: "Images Are Missing" };
  if (payload.theimages.length == 0)
    throw { message: "At least One image of product must be choosen" };
  if (!payload.colours) throw { message: "Colours Are Missing" };
  if (payload.colours.length == 0)
    throw { message: "At least One Colour of product must be choosen" };
  if (!payload.sizes) throw { message: "Sizes Are Missing" };
  if (payload.sizes.length == 0)
    throw { message: "At least One size of product must be choosen" };
  let images = [];

  if (typeof payload.theimages === "string") {
    //single image
    images.push(payload.theimages);
  } else {
    images = payload.theimages;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  payload.images = imagesLinks;
  payload.theimages = undefined;
  return payload;
};

exports.deleteProduct = (images) => {
  const cloudinary = require("cloudinary");
  images.forEach((data) => cloudinary.v2.uploader.destroy(data.public_id));
};

exports.updateProduct = async (payload, product) => {
  //sanitize payload
  delete payload.images;
  delete payload.postedBy;
  delete payload.avgRating;
  delete payload.ratings;
  delete payload.createdAt;
  delete payload.updatedAt;
  //check if sizes modified
  if (payload.sizes) {
    //if modified then validate
    if (payload.sizes.length == 0)
      throw { message: "At least One size of product must be choosen" };
  }
  //check if colours modified
  if (payload.colours) {
    //if modified then validate
    if (payload.colours.length == 0)
      throw { message: "At least One colour of product must be choosen" };
  }
  //check if images modified
  if (payload.theimages) {
    //if modified, validate
    if (payload.theimages.length == 0)
      throw { message: "At least One image of product must be choosen" };
    //if modified, save new images link new array
    let images = [];
    const cloudinary = require("cloudinary");
    if (typeof payload.theimages === "string") {
      //single image
      images.push(payload.theimages);
    } else {
      images = payload.theimages;
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    //assign req.body.images->new images links
    payload.images = imagesLinks;
    delete payload.theimages ;
    //delete existing images
    product.images.forEach((data) =>
      cloudinary.v2.uploader.destroy(data.public_id)
    );
  }
  return payload;
};
