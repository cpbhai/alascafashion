import "./orders.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { myOrders } from "../../../actions/order";
import { Link } from "react-router-dom";
import moment from "moment";
import Loading from "../../Design/Loading/Loading";
const ClientOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  useEffect(() => {
    if (!orders) {
      dispatch(myOrders());
    }
  }, [dispatch, orders]);
  const orderStatusMapColor = {
    Ordered: {
      background: "blue",
    },
    Shipped: {
      background: "tomato",
    },
    Delivered: {
      background: "Green",
    },
  };
  const selectedColorSpan = { padding: "2px" };
  return (
    <>
      <Loading show={loading} />
      <div className="clOrderHeight"></div>
      <div className="clOrderMainDiv">
        {orders &&
          orders.map((each, idx) => (
            <div key={idx} className="clOrderDiv">
              <div>
                <img
                  className="clOrderImg"
                  src={each.product.images[each.product.thumbnail].url}
                  alt="..."
                />
              </div>
              <div className="clOrderDetails textCenter">
                <h2>{each.product.title.slice(0, 20)}...</h2>
                <p>Quantity: {each.quantity}</p>
                <p>
                  {each.quantity} X ₹ {each.disCost} ={" ₹ "}
                  {each.quantity * each.disCost}
                </p>
                <p>
                  Order Status:{" "}
                  <span
                    className="clOrderStatus"
                    style={orderStatusMapColor[each.otherDetails.status]}
                  >
                    {each.otherDetails.status}
                  </span>
                </p>
                <p>Size: {each.otherDetails.size}</p>
                <p>
                  Colour:{" "}
                  <span
                    style={{
                      ...selectedColorSpan,
                      border: `5px solid ${each.otherDetails.colour}`,
                    }}
                  >
                    {each.otherDetails.colour}
                  </span>
                </p>
                <p>
                  Ordered On: {moment(each.createdAt).format("DD MMMM YYYY")}
                </p>
                <Link to={`/product/${each.product._id}`}>
                  <button className="clOrderViewProd">View Product</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ClientOrders;
