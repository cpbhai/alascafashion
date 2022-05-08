import { useEffect, useState } from "react";
import { getProducts, getSpecificProd } from "../../../actions/product";
import { addToCart } from "../../../actions/design";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Design/Loading/Loading";
import SendNotif from "../../../utils/SendNotif";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import MetaData from "../../../utils/MetaData";
import ProductCard from "../ProductCard/ProductCard";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link as RLink } from "react-router-dom";
import $ from "jquery";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error, productsData } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);
  const { _id } = useParams();
  useEffect(() => {
    if (error) {
      navigate("/");
      dispatch(SendNotif("error", error));
    }
    if (!product) dispatch(getSpecificProd(_id));
    else {
      setImg(product.thumbnail);
      dispatch(
        getProducts(
          `category=${product.category._id}&subcategory=${product.subcategory._id}&type=similar&exclude=${product._id}`
        )
      );
    }
  }, [dispatch, product, error, navigate]);
  const [size, setSize] = useState(null);
  const [colour, setColour] = useState(null);
  const [img, setImg] = useState(0);
  const isActive = (idx) => (img === idx ? "prodImgActive" : "");
  const StyledRating = styled(Rating)({
    color: "#ff3d47",
  });
  const handleChipClick = (idx, key) => {
    if (key === "Size") {
      setSize(idx === size ? null : idx);
      alert(
        `${idx === size ? "Deselected" : "Selected"} ${key}: ${
          product.sizes[idx]
        }`
      );
    } else {
      setColour(idx === colour ? null : idx);
      alert(
        `${idx === colour ? "Deselected" : "Selected"} ${key}: ${
          product.colours[idx]
        }`
      );
    }
  };
  const daysMapper = (v) => {
    return v === "null" ? "No" : v;
  };
  const handleCart = () => {
    // console.log(cart);
    if (colour === null)
      return dispatch(
        SendNotif(
          "error",
          "Please select the colour , out of available colours"
        )
      );
    if (size === null)
      return dispatch(
        SendNotif("error", "Please select the size , out of available sizes")
      );
    dispatch(
      addToCart({ ...product, size, colour, quantity: 1 }, "product-page")
    );
    dispatch(
      SendNotif("success", `${product.title.slice(0, 20)}... was Added to Cart`)
    );
    setColour(null);
    setSize(null);
    // console.log(cart);
  };

  return (
    <>
      {loading ? (
        <Loading show={true} />
      ) : (
        <MetaData
          title={product ? `${product.title} | Alasca Fashion` : "Loading..."}
        />
      )}
      <div className="productHeight"></div>
      {product && (
        <>
          <div className="dFlexWrap justfyeven">
            <div>
              <img
                src={product.images[img].url}
                alt="///"
                className="prodImg"
                id="prodImg"
                title={product.description}
              />
              <br></br>
              {product.images.map((each, idx) => (
                <img
                  src={product.images[idx].url}
                  alt="///"
                  key={idx}
                  onClick={() => {
                    $("#prodImg").fadeOut();
                    $("#prodImg").fadeIn();
                    setImg(idx);
                  }}
                  className={`prodImgPrev ${isActive(idx)}`}
                  title={product.description}
                />
              ))}
            </div>
            <div className="productDetails">
              <p className="productTitle">{product.title}</p>
              <p className="productDesc">
                {product.description.substring(0, 500)}...
              </p>
              <p className="productCosts">
                <span className="productCosts-1">₹ {product.disCost}</span>
                <span className="productCosts-2">
                  <del>₹ {product.cost}</del>
                </span>
                <span className="productCosts-3">
                  {Math.ceil(100 - (product.disCost * 100) / product.cost)}% off
                </span>
              </p>
              <p
                title="Colour that you like"
                className="productArrTitle"
                style={{ marginTop: "10px" }}
              >
                Colours?
              </p>
              {product.colours.map((each, idx) => (
                <Chip
                  key={idx}
                  sx={{
                    border: `3px solid ${each}`,
                    m: 1,
                    background: `${idx === colour ? each : ""}`,
                  }}
                  label={each}
                  variant={idx === colour ? "contained" : "outlined"}
                  onClick={() => handleChipClick(idx, "Colour")}
                />
              ))}
              <br></br>
              <div className="productArrSpacing"></div>
              <p title="Size which fits you" className="productArrTitle">
                Sizes?
              </p>
              {product.sizes.map((each, idx) => (
                <Chip
                  key={idx}
                  color="primary"
                  label={each}
                  sx={{ m: 1 }}
                  variant={idx === size ? "contained" : "outlined"}
                  onClick={() => handleChipClick(idx, "Size")}
                />
              ))}
              <div className="productArrSpacing"></div>
              <div className="dFlexWrap justcent">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCart}
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to Cart
                </Button>
                <StyledRating
                  value={4.5}
                  readOnly
                  precision={0.5}
                  sx={{
                    ml: 2,
                    mt: 0.5,
                  }}
                  icon={<FavoriteIcon fontSize="medium" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="medium" />}
                />
              </div>
              <p className="productInfo">
                Stock:{" "}
                <span className={product.inStock > 0 ? "green fwb" : "red fwb"}>
                  {product.inStock > 0 ? "In Stock" : "Out of Stock."}
                </span>
              </p>
              <p className="productInfo">
                Delivery Cost: <span>FREE DELIVERY</span>
              </p>
              <p className="productInfo">
                Exchangable: {daysMapper(product.specifications.isExchangable)}
              </p>
              <p className="productInfo">
                Returnable: {daysMapper(product.specifications.isReturnable)}
              </p>
              {user && user._id.toString() === product.postedBy.toString() && (
                <RLink
                  to={`/edit-product/${product._id}`}
                  className="negateUnderLine"
                >
                  {/* <p>
                    {user._id} {product.postedBy} {user.phone}
                  </p> */}
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<BorderColorIcon />}
                    sx={{ mt: 3 }}
                  >
                    Edit Product
                  </Button>
                </RLink>
              )}
            </div>
          </div>
          <p className="productSimilar">Similar Products</p>
          <div className="productSimilarDiv">
            {productsData &&
              productsData.products &&
              productsData.products.map((each, idx) => (
                <ProductCard key={idx} data={each} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Product;
