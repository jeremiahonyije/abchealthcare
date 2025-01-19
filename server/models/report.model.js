import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    diagnosticReport: {
      type: String,
      required: true,
    },
    doctorAssigned: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

export default Report;
