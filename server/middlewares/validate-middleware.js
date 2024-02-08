const validate = (Schema) => async (req, res, next) => {
  try {
    const parseBody = await Schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    // Extracting specific error messages from ZodError
    const errorMessages = error.issues.map((issue) => issue.message);
    res.status(400).json({ errors: errorMessages });
  }
};

module.exports = validate;
