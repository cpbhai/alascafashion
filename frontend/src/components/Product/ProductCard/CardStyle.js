const CardStyle = (theme) => {
  return {
    card: {
      ["@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2)"]:
        {
          //phone
          //   backgroundColor: "red",
          margin: 5,
          width: 140,
        },
      ["@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) "]:
        {
          //Desktop
          // backgroundColor: "blue",
          margin: 10,
          width: 250,
        },
      ["@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) "]:
        {
          //Ipad
          //   backgroundColor: "green",
          margin: 10,
          width: 150,
        },
    },
  };
};
export default CardStyle;
