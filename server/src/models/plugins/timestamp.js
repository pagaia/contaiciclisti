module.exports = function timestamp(schema) {
  // Add the two fields to the schema
  schema.add({
    createdAt: Date,
    updatedAt: Date,
  });

  // Create a pre-save hook
  schema.pre("save", function (next) {
    let now = Date.now();

    // Set a value for updatedAt only if it is undefined 
    this.updatedAt = this.updatedAt || now;
    // Set a value for createdAt only if it is undefined
    this.createdAt = this.createdAt || now;

    // Call the next function in the pre-save chain
    next();
  });
};
