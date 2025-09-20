import mysql from 'mysql2/promise'
import { DB_CONFIG } from '@/lib/config'

let connection: mysql.Connection | null = null

export async function getConnection(): Promise<mysql.Connection> {
  if (!connection) {
    try {
      connection = await mysql.createConnection(DB_CONFIG)
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Database connection failed:', error)
      throw error
    }
  }
  return connection
}

export async function initializeDatabase(): Promise<void> {
  let tempConn: mysql.Connection | null = null
  try {
    // Ensure database exists (no default DB selected)
    const { database, ...serverConfig } = DB_CONFIG as any
    tempConn = await mysql.createConnection(serverConfig)
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``)
  } catch (error) {
    console.error('Error ensuring database existence:', error)
    throw error
  } finally {
    if (tempConn) {
      await tempConn.end()
      tempConn = null
    }
  }

  try {
    // Reset existing connection so it reconnects to the target DB
    if (connection) {
      await connection.end()
      connection = null
    }

    const conn = await getConnection()

    // Normalize charset/collation (safe)
    await conn.query(`ALTER DATABASE \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)

    // Create base tables without FKs first
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        mobile VARCHAR(15) UNIQUE,
        aadhar VARCHAR(12) UNIQUE,
        name VARCHAR(255),
        email VARCHAR(255),
        profile_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    // Force-drop child tables for clean dev migration
    await conn.query(`SET FOREIGN_KEY_CHECKS = 0`)
    await conn.query(`DROP TABLE IF EXISTS chat_messages`)
    await conn.query(`DROP TABLE IF EXISTS user_profiles`)
    await conn.query(`SET FOREIGN_KEY_CHECKS = 1`)

    // Recreate user_profiles with FK
    await conn.query(`
      CREATE TABLE user_profiles (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT UNSIGNED NOT NULL,
        age INT,
        gender ENUM('male', 'female', 'other'),
        location VARCHAR(255),
        farming_experience VARCHAR(50),
        land_size DECIMAL(10,2),
        crop_types TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_user_profiles_user_id (user_id),
        CONSTRAINT fk_user_profiles_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    // Recreate chat_messages with FK
    await conn.query(`
      CREATE TABLE chat_messages (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT UNSIGNED NOT NULL,
        message TEXT,
        response TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_chat_messages_user_id (user_id),
        CONSTRAINT fk_chat_messages_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    console.log('Database tables initialized successfully')
  } catch (error) {
    console.error('Database initialization failed:', error)
    throw error
  }
}

export async function closeConnection(): Promise<void> {
  if (connection) {
    await connection.end()
    connection = null
  }
}
