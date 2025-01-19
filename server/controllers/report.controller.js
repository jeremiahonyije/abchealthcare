import Report from '../models/report.model.js';
import { errorHandler } from '../utils/error.js';

export const createReport = async (req, res, next) => {
  try {
    const report = await Report.create(req.body);
    return res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};

export const deleteReport = async (req, res, next) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    return next(errorHandler(404, 'Report not found!'));
  }

  if (req.user.id !== report.userRef) {
    return next(errorHandler(401, 'You can only delete your own reports!'));
  }

  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json('Report has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateReport = async (req, res, next) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    return next(errorHandler(404, 'Report not found!'));
  }
  if (req.user.id !== report.userRef) {
    return next(errorHandler(401, 'You can only update your own reports!'));
  }

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedReport);
  } catch (error) {
    next(error);
  }
};

export const getReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return next(errorHandler(404, 'Report not found!'));
    }
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['xray', 'ct', 'mri'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const reports = await Report.find({
      patientName: { $regex: searchTerm, $options: 'i' },
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};
