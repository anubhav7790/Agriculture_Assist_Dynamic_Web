CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  address TEXT NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'Farmer',
  farm_size VARCHAR(100) NOT NULL DEFAULT '',
  crop_focus VARCHAR(255) NOT NULL DEFAULT '',
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listings (
  id CHAR(36) PRIMARY KEY,
  crop_name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  quantity VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  tags JSON NOT NULL,
  seller_type VARCHAR(30) NOT NULL DEFAULT 'Farmer',
  owner_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_listings_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS soil_reports (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  crop VARCHAR(255) NOT NULL,
  n_value DECIMAL(10, 2) NOT NULL,
  p_value DECIMAL(10, 2) NOT NULL,
  k_value DECIMAL(10, 2) NOT NULL,
  ph_value DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  recommendations JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_soil_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_listings_owner_id ON listings(owner_id);
CREATE INDEX idx_listings_created_at ON listings(created_at);
CREATE INDEX idx_soil_reports_user_id ON soil_reports(user_id);
CREATE INDEX idx_soil_reports_created_at ON soil_reports(created_at);
