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

const ProductCard = ({ data }) => {
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
      <CardActionArea
        onClick={() => window.open(`/product/${data._id}`, "_blank")}
      >
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
              value={data.avgRating}
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
