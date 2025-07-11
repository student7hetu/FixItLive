import HelpRequest from '../models/helpRequestModel.js';

// 🆕 Create Help Request
const createHelpRequest = async (req, res) => {
  try {
    const { title, description, category, experienceLevel } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
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

// 📃 Get All Help Requests (with filters + pagination)
const getAllHelpRequests = async (req, res) => {
  try {
    const {
      category,
      status,
      experienceLevel,
      keyword,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' };
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

// 🔍 Get One Help Request by ID
const getAllHelpRequestById = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate('acceptedBy', 'username email');

    if (!request) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Accept Help Request (Only if open)
const acceptHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findById(req.params.id);

    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    if (helpRequest.status !== 'open') {
      return res
        .status(400)
        .json({ message: 'This request is already accepted or closed.' });
    }

    helpRequest.acceptedBy = req.user._id;
    helpRequest.status = 'in-progress';
    helpRequest.updatedAt = new Date();

    await helpRequest.save();

    res.status(200).json({
      message: 'Help request accepted successfully',
      helpRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyHelpRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAcceptedRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find({ acceptedBy: req.user._id }).sort({ updatedAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createHelpRequest,
  getAllHelpRequests,
  getAllHelpRequestById,
  acceptHelpRequest,
  getAcceptedRequests,
  getMyHelpRequests
};
