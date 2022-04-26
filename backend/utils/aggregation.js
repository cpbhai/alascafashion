const { ObjectId } = require("mongoose").Types;
exports.get = (
  keyword,
  category,
  subcategory,
  low,
  high,
  page,
  sortBy,
  productsPerPage
) => {
  //
  let matchObj = {},
    sortObj = {};
  let pipeline = [{ $match: matchObj }];
  if (keyword) matchObj.title = { $regex: keyword, $options: "i" };
  if (category) matchObj.category = ObjectId(category);
  if (subcategory) matchObj.subcategory = ObjectId(subcategory);
  if (low || high) {
    matchObj.disCost = {};
    if (low) matchObj.disCost.$gte = Number(low);
    if (high) matchObj.disCost.$lte = Number(high);
  }
  if (sortBy) {
    pipeline.push({ $sort: sortObj });
    if (sortBy == "latest") {
      sortObj.createdAt = -1;
    } else if (sortBy == "oldest") {
      pipeline.pop();
    } else if (sortBy == "low-high") {
      sortObj.disCost = 1;
    } else if (sortBy == "high-low") {
      sortObj.disCost = -1;
    } else pipeline.pop();
  }
  pipeline.push(
    {
      $facet: {
        beforePaginate: [
          {
            $count: "count",
          },
        ],
        afterPaginate: [
          {
            $skip: productsPerPage * (Number(page) - 1),
          },
          {
            $limit: productsPerPage,
          },
        ],
      },
    },
    {
      $unwind: "$beforePaginate",
    }
  );
  return pipeline;
};
