const User = require("../models/userModel");
const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

function fillMissingDates(data, startDate) {
  if (!data.length) {
    return [];
  }

  const endDate = new Date();

  const dateMap = new Map(data.map((item) => [item.day, item.sales]));
  const filledData = [];

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    filledData.push({ day, sales: dateMap.get(day) || 0 });
  }

  return filledData;
}

exports.getStatics = catchAsync(async (req, res, next) => {
  const { lastDays } = req.query;

  if (!lastDays) {
    return next(new ApiError("Please provide lastDays query parameter", 400));
  }

  const filterDate = new Date();
  filterDate.setDate(filterDate.getDate() - parseInt(lastDays));

  const [usersAggregate, ordersCount, ordersAggregate, dailySalesAggregate] =
    await Promise.all([
      User.aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 }, // Count all users
            coursesSold: { $sum: { $size: "$courses" } }, // Sum the lengths of courses arrays
          },
        },
        {
          $project: {
            _id: 0,
            totalUsers: 1,
            coursesSold: 1,
          },
        },
      ]),

      Order.countDocuments().lean(),

      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: filterDate },
            status: { $ne: "cancelled" },
          },
        },
        // Group and calculate statistics
        {
          $group: {
            _id: null,
            // totalSales: { $sum: "$totalPrice" }, // Sum of totalPrice
            totalSales: {
              $sum: {
                $cond: [{ $eq: ["$status", "delivered"] }, "$totalPrice", 0],
              },
            },
            avgOrderPrice: { $avg: "$totalPrice" }, // Average totalPrice
            deliveries: {
              $sum: { $cond: [{ $eq: ["$status", "delivered"] }, 1, 0] }, // Count delivered orders
            },
          },
        },
        {
          $project: {
            _id: 0,
            avgOrderPrice: { $round: ["$avgOrderPrice", 2] }, // Round avgOrderPrice to 2 decimal places
            totalSales: 1,
            deliveries: 1,
          },
        },
      ]),

      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: filterDate },
            status: { $ne: "cancelled" },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by day
            sales: { $sum: "$totalPrice" }, // Sum of totalPrice for each day
          },
        },
        {
          $sort: { _id: 1 }, // Sort by day in ascending order
        },
        {
          $project: {
            day: "$_id", // Rename _id to date
            sales: 1,
            _id: 0,
          },
        },
      ]),
    ]);

  const [{ totalUsers, coursesSold } = { totalUsers: 0, coursesSold: 0 }] =
    usersAggregate;

  const [
    { totalSales, avgOrderPrice, deliveries } = {
      totalSales: 0,
      avgOrderPrice: 0,
      deliveries: 0,
    },
  ] = ordersAggregate;

  const dailySales = fillMissingDates(dailySalesAggregate, filterDate);

  res.status(200).json({
    status: "success",
    data: {
      totalUsers,
      coursesSold,
      ordersCount,
      totalSales,
      avgOrderPrice,
      deliveries,
      dailySales,
    },
  });
});
