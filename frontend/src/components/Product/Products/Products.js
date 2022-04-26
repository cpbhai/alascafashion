import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../actions/product";
import Loading from "../../Design/Loading/Loading";
import { useLocation } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { getCats, getSubCats } from "../../../actions/catandsubcat";
import SearchIcon from "@mui/icons-material/Search";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Pagination from "@mui/material/Pagination";

import { sortByOps } from "../../../utils/hardcoded";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { productsData, loading } = useSelector((state) => state.product);
  const { cats, subcats } = useSelector((state) => state.catandsubcat);

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    if (!cats) dispatch(getCats());
    if (!subcats) dispatch(getSubCats("626505a6a8fc44666c191d7f"));
    if (cats && cats.length && cats[0].label !== "All") {
      cats.unshift({ label: "All", _id: "" });
    }
    if (subcats && subcats.length && subcats[0].label !== "All") {
      subcats.unshift({ label: "All", _id: "" });
    }
    if (!productsData) dispatch(getProducts(query));
    // console.log("we", productsData, cats, subcats);
  }, [dispatch, productsData, cats, subcats]);

  const [values, setValues] = useState({
    keyword: query.get("keyword") ? query.get("keyword") : "",
    cost: [0, 10000],
  });
  const { keyword, cost } = values;
  const [ops, setOps] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    query.set(name, value);
    dispatch(getProducts(query));
    setValues({ ...values, [name]: value });
  };
  const handleSelect = (e, v, type) => {
    if (type === "Category") {
      query.set("category", v._id);
      dispatch(getSubCats(v._id));
    } else if (type === "Subcategory") {
      query.set("subcategory", v._id);
    } else if (type === "SortBy") {
      query.set("sortBy", v._id);
    }
    dispatch(getProducts(query));
  };
  const handleSliderChange = (event, newValue, activeThumb) => {
    setValues({ ...values, cost: newValue });
  };
  const handleSlider = () => {
    query.set("low", cost[0]);
    query.set("high", cost[1]);
    dispatch(getProducts(query));
  };
  const handlePage = (v) => {
    query.set("page", v);
    dispatch(getProducts(query));
  };

  return (
    <>
      <Loading show={loading} />

      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search Products..."
            value={keyword}
            name="keyword"
            onChange={handleChange}
          />
          <button className="searchButton">
            <SearchIcon />
          </button>
        </div>
      </div>
      <FormControlLabel
        control={
          <Switch
            defaultChecked
            onChange={(e) => setOps(e.target.checked)}
            sx={{ ml: 1 }}
          />
        }
        label="Show Filters"
      />
      {ops && (
        <div className="prodsOps dFlexWrap justfyeven hide">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cats ? cats : [{ label: "None", _id: "" }]}
            onChange={(e, v) => handleSelect(e, v, "Category")}
            sx={{ width: 300, m: 1 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo-1"
            options={subcats ? subcats : [{ label: "None", _id: "" }]}
            onChange={(e, v) => handleSelect(e, v, "Subcategory")}
            sx={{ width: 300, m: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Subcategory" />
            )}
          />
          <Autocomplete
            disablePortal
            options={sortByOps}
            onChange={(e, v) => handleSelect(e, v, "SortBy")}
            sx={{ width: 300, m: 1 }}
            renderInput={(params) => <TextField {...params} label="Sort By" />}
          />
          <div>
            <p className="textCenter">
              ₹ {cost[0]} - ₹ {cost[1]}
            </p>
            <br></br>
            <Slider
              onChange={handleSliderChange}
              onChangeCommitted={handleSlider}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => {
                return `₹ ${v}`;
              }}
              sx={{
                width: 300,
              }}
              value={cost}
              max={10000}
              min={0}
              step={500}
              disableSwap
            />
          </div>
        </div>
      )}
      <div className="dFlexWrap justfyeven">
        {productsData &&
          productsData.products.map((each, idx) => (
            <ProductCard data={each} key={idx} />
          ))}
      </div>
      {productsData && (
        <div className="justfycent dFlex">
          <Pagination
            count={productsData.noOfPages}
            color="secondary"
            page={productsData.page}
            size="small"
            onChange={(e, v) => handlePage(v)}
            showFirstButton
            sx={{ mt: 5 }}
            showLastButton
          />
        </div>
      )}
    </>
  );
};

export default Products;
