-- Trust Formation Database Schema
-- MySQL Database Setup Script

-- Create Database
CREATE DATABASE IF NOT EXISTS trustfo1_web;
USE trustfo1_web;

-- Create Admin User
GRANT ALL PRIVILEGES ON trustfo1_web.* TO 'trustfo1_jub'@'localhost' IDENTIFIED BY 'Pjokjict4@#$%';
FLUSH PRIVILEGES;

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    service VARCHAR(255) DEFAULT 'General Inquiry',
    message LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    status ENUM('new', 'contacted', 'closed', 'spam') DEFAULT 'new',
    notes LONGTEXT,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT,
    price_from DECIMAL(10, 2),
    icon VARCHAR(100),
    active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (active)
);

-- Consultations Table
CREATE TABLE IF NOT EXISTS consultations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    country VARCHAR(100),
    company_type VARCHAR(100),
    service_interest VARCHAR(255),
    timeline VARCHAR(50),
    message LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    scheduled_date DATETIME,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    ip_address VARCHAR(45),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_scheduled (scheduled_date)
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'moderator', 'support') DEFAULT 'support',
    active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    INDEX idx_email (email),
    INDEX idx_active (active)
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value LONGTEXT,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Email Logs Table
CREATE TABLE IF NOT EXISTS email_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    to_email VARCHAR(255),
    subject VARCHAR(255),
    status ENUM('sent', 'failed', 'bounced') DEFAULT 'sent',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    error_message LONGTEXT,
    INDEX idx_status (status),
    INDEX idx_sent (sent_at)
);

-- Insert Default Services
INSERT INTO services (service_id, category, title, description, price_from) VALUES
('usa', 'Formation', 'USA Company Formation (LLC)', 'Register your LLC or C-Corp in Delaware, Wyoming, or any state. EIN, registered agent & operating agreement included.', 499),
('uk', 'Formation', 'UK Limited Company Setup', 'Form a UK Ltd in 24 hours. Companies House filing, registered office, and HMRC tax registration.', 299),
('ca', 'Formation', 'Canada Corporation Setup', 'Federal or provincial incorporation. NUANS search, articles, and CRA business number.', 449),
('bd', 'Formation', 'Bangladesh Company Formation', 'Private Limited or branch office. RJSC registration, BIN, TIN and trade license handling.', 599),
('tax', 'Compliance', 'Tax & Annual Compliance', 'Annual returns, corporate tax filing, VAT/GST, BOI reports — done by licensed professionals.', 199),
('kyc', 'Compliance', 'AML / KYC Advisory', 'Anti-money-laundering policies, KYC frameworks, and ongoing monitoring for regulated entities.', 349),
('apostille', 'Documentation', 'Apostille & Attestation', 'Apostille certification and embassy attestation for documents used abroad.', 149),
('notary', 'Documentation', 'Notary & Translation', 'Certified translations and notarization of legal documents in 30+ languages.', 89),
('website', 'Web', 'Website Development', 'Custom websites built with React, Next.js, Vue.js. Responsive, SEO-optimized, fast-loading.', 1200),
('webapp', 'Web', 'Web Application Development', 'Full-stack web apps: Node.js, Express, PostgreSQL, MongoDB backends with React/Next.js frontends.', 2500),
('ecommerce', 'Web', 'E-commerce Solutions', 'End-to-end e-commerce platforms with Shopify, WooCommerce, or custom builds.', 3000),
('pwa', 'Web', 'Progressive Web Apps (PWA)', 'App-like web experiences. Offline functionality, push notifications, installable.', 1800),
('ios-android', 'Mobile', 'iOS & Android Apps', 'Native apps using Swift/Kotlin or cross-platform React Native/Flutter.', 3500),
('react-native', 'Mobile', 'React Native Development', 'Single codebase for iOS & Android. JavaScript/TypeScript stack.', 2800),
('flutter', 'Mobile', 'Flutter App Development', 'Beautiful, fast mobile apps. Dart language, Material & Cupertino designs.', 2600),
('app-deployment', 'Mobile', 'App Store & Play Store Deployment', 'Complete app release management. Store optimization, app signing, beta testing.', 500),
('electron', 'Desktop', 'Electron Desktop Apps', 'Cross-platform desktop apps for Windows, Mac, Linux. Built with Node.js & Chromium.', 2200),
('tauri', 'Desktop', 'Tauri Desktop Apps', 'Lightweight, secure desktop apps using Rust & web tech.', 2400),
('native-desktop', 'Desktop', 'Native Desktop Applications', 'Windows (C#/.NET), Mac (Swift), Linux (C++) native apps.', 3200),
('chatbot', 'AI', 'AI Chatbot Solutions', 'GPT-4/Claude-powered chatbots. Custom training on your data, multi-language support.', 1500),
('ai-custom', 'AI', 'Custom AI Models', 'Fine-tuned LLMs for your business. Document processing, data classification.', 4000),
('ml-pipeline', 'AI', 'Machine Learning Pipeline', 'End-to-end ML solutions. Data preprocessing, model training.', 3500),
('data-analytics', 'AI', 'Data Analytics & BI', 'Business intelligence dashboards. Power BI, Tableau, custom dashboards.', 2500),
('computer-vision', 'AI', 'Computer Vision Solutions', 'Image recognition, object detection, facial recognition, OCR.', 3800),
('nlp-services', 'AI', 'NLP & Text Analytics', 'Sentiment analysis, named entity recognition, summarization, translation.', 2000);

-- Insert Default Settings
INSERT INTO settings (setting_key, setting_value, description) VALUES
('site_title', 'Trust Formation', 'Website Title'),
('site_description', 'Global Company Formation & Tech Solutions', 'Website Description'),
('site_url', 'https://trustformation.net', 'Website URL'),
('admin_email', 'hello@trustformation.net', 'Admin Email'),
('whatsapp_number', '8801343118676', 'WhatsApp Number'),
('phone_display', '+880-1343-118676', 'Phone Display Format'),
('address', 'Mirpur, Dhaka-1216, Bangladesh', 'Business Address');

-- Insert Admin User
INSERT INTO admin_users (username, email, password_hash, role, active) VALUES
('admin', 'admin@trustformation.net', '$2y$10$YourHashedPasswordHere', 'admin', 1);

-- Set proper permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON trustfo1_web.* TO 'trustfo1_jub'@'localhost';
FLUSH PRIVILEGES;
