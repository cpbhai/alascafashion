import "./AddProduct.css";
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PostAddIcon from "@mui/icons-material/PostAdd";
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
import { useNavigate } from "react-router-dom";
import {
  addProduct,
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
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cats, subcats } = useSelector((state) => state.catandsubcat);
  const { error, message, loading } = useSelector((state) => state.product);
  useEffect(() => {
    if (!cats) dispatch(getCats());
    if (error) {
      dispatch(SendNotif("error", error));
      dispatch(clearErrors());
    }
    if (message) {
      dispatch(SendNotif("success", message));
      dispatch(clearMessages());
      navigate("/");
    }
  }, [dispatch, cats, navigate, error, message]);
  const [values, setValues] = useState({
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
  });
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
    if (!title) return dispatch(SendNotif("error", "Title is blank."));
    if (!category)
      return dispatch(SendNotif("error", "Category was not selected."));
    if (!subcategory)
      return dispatch(SendNotif("error", "Subcategory was not selected."));
    if (!description)
      return dispatch(SendNotif("error", "Description is blank."));
    if (images.length === 0)
      return dispatch(SendNotif("error", "At least 1 image is required."));
    if (sizes.length === 0)
      return dispatch(SendNotif("error", "At least 1 Size is must."));
    if (colours.length === 0)
      return dispatch(SendNotif("error", "At least 1 Colour is must."));
    if (inStock === "")
      return dispatch(SendNotif("error", "Stock is missing."));
    if (productId === "")
      return dispatch(SendNotif("error", "Product Id is missing."));
    if (cost === "")
      return dispatch(SendNotif("error", "Cost Without Discount is blank."));
    if (disCost === "")
      return dispatch(SendNotif("error", "Cost After Discount is blank."));
    if (thumbnail === "")
      return dispatch(SendNotif("error", "Thumbnail Image Number is missing."));
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("category", category);
    myForm.append("subcategory", subcategory);
    myForm.append("description", description);
    images.forEach((image) => {
      myForm.append("theimages", image);
    });
    sizes.forEach((size) => myForm.append("sizes", size));
    colours.forEach((colour) => myForm.append("colours", colour));
    myForm.append("thumbnail", Number(thumbnail) - 1);
    myForm.append("inStock", inStock);
    myForm.append("productId", productId);
    myForm.append("cost", cost);
    myForm.append("disCost", disCost);
    myForm.append("specifications.isReturnable", specifications.isReturnable);
    myForm.append("specifications.isExchangable", specifications.isExchangable);
    dispatch(addProduct(myForm));
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
    if (name === "thumbnail") {
      if (Number(value) >= 1 && Number(value) <= images.length)
        newstate[name] = value;
      else {
        newstate[name] = "";
        dispatch(SendNotif("warning", "Allowed Values are: 1-5"));
      }
    } else newstate[name] = value;
    setValues(newstate);
  };
  return (
    <>
      <Loading show={loading} />
      <div className="addProdBigDiv">
        <div className="addProdHeight"></div>
        <form className="addProdForm dFlexWrap justfyeven">
          <div>
            <img
              src="https://blog.sellfy.com/wp-content/uploads/2019/05/graphic-desgin-products.png"
              alt=""
              className="addProdImage"
            />
          </div>
          <div className="addProdForInputs">
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
            <div className="addProdImgUpload">
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
        <div className="dFlexWrap justfyeven addProdBelowDiv">
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
          <Autocomplete
            disablePortal
            options={daysUpto7}
            onChange={(e, v) => handleSelect(e, v, "Return")}
            sx={{ width: 300, m: 1 }}
            renderInput={(params) => <TextField {...params} label="Return" />}
          />
          <Autocomplete
            disablePortal
            options={daysUpto7}
            onChange={(e, v) => handleSelect(e, v, "Exchange")}
            sx={{ width: 300, m: 1 }}
            renderInput={(params) => <TextField {...params} label="Exchange" />}
          />
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
            startIcon={<PostAddIcon />}
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
            Add the product
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
