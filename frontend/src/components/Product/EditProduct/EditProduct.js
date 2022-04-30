import "./EditProduct.css";
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTheme } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { getCats, getSubCats } from "../../../actions/catandsubcat";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getSpecificProd,
  updateProd,
  deleteProd,
  clearErrors,
  clearMessages,
} from "../../../actions/product";
import SendNotif from "../../../utils/SendNotif";
import Loading from "../../Design/Loading/Loading";
import {
  sizesArray,
  coloursArray,
  isDarkBg,
  daysUpto7,
} from "../../../utils/hardcoded";
import MetaData from "../../../utils/MetaData";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cats, subcats } = useSelector((state) => state.catandsubcat);
  const { error, message, loading, product, errorInUorD } = useSelector(
    (state) => state.product
  );
  const { _id } = useParams();
  useEffect(() => {
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
      navigate("/");
    }
    if (errorInUorD) {
      dispatch(SendNotif("error", errorInUorD));
      dispatch(clearErrors());
    }
    if (message) {
      dispatch(SendNotif("success", message));
      dispatch(clearMessages());
      navigate(`/product/${product._id}`);
    }
    if (!cats) dispatch(getCats());
    if (!product) dispatch(getSpecificProd(_id));
    else {
      setPreviews(product.images.map((each) => each.url));
    }
  }, [dispatch, cats, navigate, error, message]);
  const initialState = {
    title: "",
    description: "",
    thumbnail: "",
    sizes: [],
    colours: [],
    inStock: "",
    productId: "",
    specifications: { isExchangable: null, isReturnable: null },
    disCost: "",
    cost: "",
    category: null,
    subcategory: null,
  };
  const [values, setValues] = useState(
    product
      ? {
          ...product,
          ["category"]: product.category._id,
          ["subcategory"]: product.subcategory._id,
          ["thumbnail"]: Number(product.thumbnail) + 1,
        }
      : initialState
  );
  const {
    title,
    description,
    thumbnail,
    sizes,
    colours,
    inStock,
    productId,
    specifications,
    disCost,
    cost,
    category,
    subcategory,
  } = values;
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const theme = useTheme();
  const handleSelect = (e, v, type) => {
    let newState = { ...values };
    if (type === "Category") {
      newState.category = v._id;
      dispatch(getSubCats(v._id));
    } else if (type === "Subcategory") {
      newState.subcategory = v._id;
    } else if (type === "Return") {
      newState.specifications.isReturnable = v._id;
    } else if (type === "Exchange") {
      newState.specifications.isExchangable = v._id;
    }
    setValues(newState);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(name, personName, theme, key) {
    let css = {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
    if (key === "Colours") {
      css.background = name;
      if (isDarkBg(name)) css.color = "white";
    }
    return css;
  }
  const handleSubmit = () => {
    const myForm = new FormData();
    if (title) myForm.append("title", title);
    if (category) myForm.append("category", category);
    if (subcategory) myForm.append("subcategory", subcategory);
    if (description) myForm.append("description", description);
    images.forEach((image) => {
      myForm.append("theimages", image);
    });
    // return console.log(myForm.get("theimages"));
    // return console.log(images);
    sizes.forEach((size) => myForm.append("sizes", size));
    colours.forEach((colour) => myForm.append("colours", colour));
    if (thumbnail) myForm.append("thumbnail", Number(thumbnail) - 1);
    if (inStock) myForm.append("inStock", inStock);
    if (productId) myForm.append("productId", productId);
    if (cost) myForm.append("cost", cost);
    if (disCost) myForm.append("disCost", disCost);
    myForm.append("specifications.isReturnable", specifications.isReturnable);
    myForm.append("specifications.isExchangable", specifications.isExchangable);
    dispatch(updateProd(_id, myForm));
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Successfully", "Logged Out.", "success");
        dispatch(deleteProd(_id));
      }
    });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);

    setImages([]);
    setPreviews([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviews((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    let newstate = { ...values };
    newstate[name] = value;
    setValues(newstate);
  };
  return (
    <>
      {loading ? (
        <Loading show={true} />
      ) : (
        <MetaData title="Add Product | Alasca Fashion" />
      )}
      <div className="editProdBigDiv">
        <div className="editProdHeight"></div>
        <form className="editProdForm dFlexWrap justfyeven">
          <div>
            <img
              src="https://blog.sellfy.com/wp-content/uploads/2019/05/graphic-desgin-products.png"
              alt=""
              className="editProdImage"
            />
          </div>
          <div className="editProdForInputs">
            <p className="editProdPreState">
              Selected Category: <span>{product.category.title}</span>
              <br></br>To change click below
            </p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cats ? cats : [{ label: "None", _id: "" }]}
              onChange={(e, v) => handleSelect(e, v, "Category")}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
            <p className="editProdPreState">
              Selected Subcategory: <span>{product.subcategory.title}</span>
              <br></br>To change click below
            </p>
            <Autocomplete
              disablePortal
              id="combo-box-demo-1"
              options={subcats ? subcats : [{ label: "None", _id: "" }]}
              onChange={(e, v) => handleSelect(e, v, "Subcategory")}
              sx={{ width: 300, mt: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Subcategory" />
              )}
            />
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={title}
              sx={{ width: "300px", mt: 1 }}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              multiline
              rows={4}
              sx={{ width: "300px", mt: 1 }}
              onChange={handleChange}
            />
            <div className="editProdImgUpload">
              <FormControl fullWidth>
                <label htmlFor="icon-button-file">
                  <input
                    accept="image/*"
                    name="images"
                    id="icon-button-file"
                    multiple
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    sx={{ marginLeft: "-9px" }}
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                  {previews.length ? (
                    <div className="previewDiv">
                      {previews.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="..."
                          className="previewImg"
                        />
                      ))}
                    </div>
                  ) : (
                    <span style={{ color: "black", cursor: "pointer" }}>
                      Add Upto 5 images of Product
                    </span>
                  )}
                </label>
              </FormControl>
            </div>
            <FormControl sx={{ mt: 1, width: "300px" }}>
              <InputLabel>Sizes</InputLabel>
              <Select
                multiple
                name="sizes"
                value={sizes}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} color="primary" label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {sizesArray.map((size) => (
                  <MenuItem
                    key={size}
                    value={size}
                    style={getStyles(size, sizes, theme)}
                  >
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </form>
        <div className="dFlexWrap justfyeven editProdBelowDiv">
          <FormControl sx={{ m: 1, width: "300px" }}>
            <InputLabel>Colours</InputLabel>
            <Select
              multiple
              name="colours"
              value={colours}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      sx={{ background: value }}
                      label={value}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {coloursArray.map((colour) => (
                <MenuItem
                  key={colour}
                  value={colour}
                  style={getStyles(colour, colours, theme, "Colours")}
                >
                  {colour}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Thumbnail Image"
            type="number"
            name="thumbnail"
            value={thumbnail}
            sx={{ m: 1 }}
            onChange={handleChange}
          />
          <TextField
            label="Stock Available"
            type="number"
            name="inStock"
            value={inStock}
            sx={{ m: 1 }}
            onChange={handleChange}
          />
          <TextField
            label="Product Id"
            type="text"
            name="productId"
            value={productId}
            sx={{ m: 1 }}
            onChange={handleChange}
          />
          <div>
            <p className="editProdPreState">
              Selected Return:{" "}
              <span>
                {product.specifications.isReturnable === "null"
                  ? "0 Days"
                  : product.specifications.isReturnable}
              </span>
              <br></br>To change click below
            </p>
            <Autocomplete
              disablePortal
              options={daysUpto7}
              onChange={(e, v) => handleSelect(e, v, "Return")}
              sx={{ width: 300, m: 1 }}
              renderInput={(params) => <TextField {...params} label="Return" />}
            />
          </div>
          <div>
            <p className="editProdPreState">
              Selected Exchange:{" "}
              <span>
                {product.specifications.isExchangable === "null"
                  ? "0 Days"
                  : product.specifications.isExchangable}
              </span>
              <br></br>To change click below
            </p>
            <Autocomplete
              disablePortal
              options={daysUpto7}
              onChange={(e, v) => handleSelect(e, v, "Exchange")}
              sx={{ width: 300, m: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Exchange" />
              )}
            />
          </div>
          <TextField
            label="Cost Without Discount"
            type="number"
            name="cost"
            value={cost}
            sx={{ m: 1 }}
            onChange={handleChange}
          />
          <TextField
            label="Cost After Discount"
            type="number"
            name="disCost"
            value={disCost}
            sx={{ m: 1 }}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            startIcon={<BorderColorIcon />}
            onClick={handleSubmit}
            sx={{
              mt: 1,
              height: "40px",
              background: "#7b1fa2",
              "&:hover": {
                color: "#7b1fa2",
                backgroundColor: "white",
                border: "3px solid #7b1fa2",
              },
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteForeverIcon />}
            onClick={handleDelete}
            sx={{
              mt: 1,
              ml: 2,
              height: "40px",
              background: "red",
              "&:hover": {
                color: "red",
                backgroundColor: "white",
                border: "3px solid red",
              },
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
