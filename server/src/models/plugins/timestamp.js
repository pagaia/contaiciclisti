module.exports = function timestamp(schema) {
  // Add the two fields to the schema
  schema.add({
    created_at: Date,
    updated_at: Date,
  });

  function updateTimeStamp(next) {
    let now = Date.now();

    // Set a value for updated_at only if it is undefined
    this.updated_at = this.updated_at || now;
    // Set a value for created_at only if it is undefined
    this.created_at = this.created_at || now;

    // Call the next function in the pre-save chain
    next();
  }
  // Create a pre-save hook
  schema.pre("save", updateTimeStamp);
  schema.pre("updateOne", updateTimeStamp);
};
