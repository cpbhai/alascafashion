import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import "./ProductCard.css";
import CardStyle from "./CardStyle";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const useStyles = makeStyles(CardStyle());
  const classes = useStyles();
  const StyledRating = styled(Rating)({
    color: "#ff3d47",
  });
  return (
    <Card
      className={classes.card}
      title={`${data.description.substring(0, 200)}...`}
    >
      <CardActionArea onClick={() => navigate(`/product/${data._id}`)}>
        <img
          className="prodCardImg"
          src={`${data.images[data.thumbnail].url}`}
          alt="..."
        />
        <span className="prodCardPerc">
          {Math.ceil(100 - (data.disCost * 100) / data.cost)}% off
        </span>
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {data.title}
          </Typography>
          <Typography
            variant="p"
            display="block"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            <span className="green discost">₹ {data.disCost}</span>{" "}
            <span className="tomato maxcost">
              <del>₹ {data.cost}</del>
            </span>{" "}
          </Typography>
          <div className="textCenter">
            <StyledRating
              value={4.5}
              readOnly
              precision={0.5}
              icon={<FavoriteIcon fontSize="small" />}
              emptyIcon={<FavoriteBorderIcon fontSize="small" />}
            />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
