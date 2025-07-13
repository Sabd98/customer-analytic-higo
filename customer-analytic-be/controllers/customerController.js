const Customer = require("../models/customer");
const { cache } = require("../utils/cache");

// Get summary statistics
const getSummary = async (req, res) => {
  try {
    const cacheKey = "summary_stats";
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const genderStats = await Customer.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);

    const brandStats = await Customer.aggregate([
      { $group: { _id: "$Brand Device", count: { $sum: 1 } } },
    ]);

    const locationStats = await Customer.aggregate([
      { $group: { _id: "$Location Type", count: { $sum: 1 } } },
    ]);

    const interestStats = await Customer.aggregate([
      { $group: { _id: "$Digital Interest", count: { $sum: 1 } } },
    ]);

    const result = {
      gender: genderStats,
      brands: brandStats,
      locations: locationStats,
      interests: interestStats,
    };

    // Cache for 1 hour
    cache.set(cacheKey, result, 3600);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get paginated customers
const getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = "number", order = "asc" } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOption = { [sort]: order === "asc" ? 1 : -1 };

    const customers = await Customer.find({})
      .collation({ locale: "en", strength: 2 })
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const totalItems = await Customer.countDocuments({});
    const totalPages = Math.ceil(totalItems / parseInt(limit));

    res.json({
      customers,
      totalPages,
      currentPage: parseInt(page),
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSummary,
  getCustomers,
};
