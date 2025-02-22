export enum ErrorMessage {
  INVALID_HOSTNAME_OR_KEY = "Invalid API hostname or key!",
  CATALOG_ID = "Invalid catalog ID!",
  CATALOG_SIZE = "Couldn't get catalog size!",
  SEARCH = "Failed to get search results!",
  PRODUCTS = "Error fetching products!",
  PRODUCT = "Couldn't fetch product!",
  SCHEMA = "Couldn't load schema info!",
  CUSTOMER_ID = "Couldn't get customer ID for API!",
  PHOTO_SEARCH = "Couldn't process uploaded image!",
  FILE_UPLOAD_FORMAT = "Uploaded file does not match our expected schema! Please make sure it has the fields 'title' or 'description'.",
  FILE_UPLOAD = "Couldn't process uploaded file!",
  NO_INSTANCES = "User does not have any instances!",
  INVALID_FEEDBACK = "Error submitting feedback!",
}
