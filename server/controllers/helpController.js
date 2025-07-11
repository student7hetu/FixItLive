import HelpRequest from "../models/helpRequestModel.js";

const createHelpRequest = async (req, res) => {
  try {
    const { title, description, category, experienceLevel } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newRequest = await HelpRequest.create({
      title,
      description,
      category,
      experienceLevel,
      createdBy: req.user._id, // comes from authMiddleware
    });

    res.status(201).json({
      message: 'Help request created successfully',
      helpRequest: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllHelpRequests = async (req, res) => {
  try {
    const { category, status, experienceLevel, keyword, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' }; // case-insensitive title match
    }

    const total = await HelpRequest.countDocuments(filter);

    const requests = await HelpRequest.find(filter)
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createHelpRequest, getAllHelpRequests };
