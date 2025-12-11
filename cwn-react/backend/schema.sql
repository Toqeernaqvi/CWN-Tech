CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  excerpt TEXT NULL,
  body LONGTEXT NOT NULL,
  cover_url VARCHAR(255) NULL,
  category_id INT UNSIGNED NULL,
  seo_title VARCHAR(200) NULL,
  seo_description VARCHAR(255) NULL,
  seo_keywords VARCHAR(255) NULL,
  published_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO categories (name, slug) VALUES
  ('Frontend', 'frontend'),
  ('Backend', 'backend'),
  ('Career', 'career')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO posts (title, slug, excerpt, body, cover_url, category_id, seo_title, seo_description, seo_keywords, published_at, created_at, updated_at)
VALUES
('Crafting Clean UI with Tailwind', 'crafting-clean-ui-tailwind',
 'Practical tips for spacing, hierarchy, and component polish using Tailwind.',
 '<p>Design systems live and die by consistency. In this guide we cover spacing scales, type rhythm, and reusable patterns you can drop into your next build.</p>',
 '/uploads/sample-tailwind.jpg', 1,
 'Crafting Clean UI with Tailwind', 'Practical tips for spacing and hierarchy with Tailwind', 'tailwind, ui, css',
 NOW(), NOW(), NOW()),

('Shipping Secure APIs with PHP 7.4', 'shipping-secure-apis-php74',
 'A lean approach to routing, validation, and auth for small PHP services.',
 '<p>Learn how to keep a lightweight PHP service maintainable: PDO, prepared statements, auth tokens, and predictable JSON responses.</p>',
 '/uploads/sample-php.jpg', 2,
 'Shipping Secure APIs with PHP 7.4', 'Lean routing, validation, and auth in PHP', 'php, api, backend',
 NOW(), NOW(), NOW())
ON DUPLICATE KEY UPDATE title = VALUES(title);
