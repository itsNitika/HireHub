const express = require("express");

const Job = require("../models/Job");
const Application = require("../models/Application");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Job Route
router.post("/create", protect, async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Apply Job Route
router.post("/apply/:jobId", protect, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Only students can apply for jobs",
      });
    }

    const { jobId } = req.params;
    const { resumeLink } = req.body;

    if (!resumeLink || !resumeLink.trim()) {
      return res.status(400).json({
        message: "Resume link is required",
      });
    }

    const existingApplication = await Application.findOne({
      student: req.user.id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied to this job",
      });
    }

    const application = await Application.create({
      student: req.user.id,
      job: jobId,
      resumeLink,
    });

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get My Applications
router.get("/my-applications", protect, async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    }).populate("job");

    res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get Applicants For A Job
router.get("/applicants/:jobId", protect, async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({
      job: jobId,
    })
      .populate("student", "name email role")
      .populate("job", "title company");

    res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update Application Status
router.put("/application-status/:applicationId", protect, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get Recruiter Posted Jobs
router.get("/my-jobs", protect, async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete Job
router.delete("/delete/:jobId", protect, async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;