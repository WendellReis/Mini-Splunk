CREATE TABLE Users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    login VARCHAR(50),
    password VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE Logs (
    id INTEGER NOT NULL AUTO_INCREMENT,
    ip VARCHAR(20),
    timestamp DATETIME,
    hostname VARCHAR(100),
    user_id INTEGER,
    message VARCHAR(300),
    service VARCHAR(100),
    process VARCHAR(100),
    unit VARCHAR(100),
    boot_id VARCHAR(100),
    mac VARCHAR(20),
    priority TINYINT,
    PRIMARY KEY(id)
);