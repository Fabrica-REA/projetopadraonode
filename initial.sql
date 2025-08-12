-- initial.sql: Create database, user, and grant privileges for projetopadraonode

-- Create database
CREATE DATABASE IF NOT EXISTS cursonode;

-- Create user
CREATE USER IF NOT EXISTS 'usucursonode'@'%' IDENTIFIED BY 'ma52wsy1ael%6s&nHa12345';

-- Grant privileges
GRANT ALL PRIVILEGES ON cursonode.* TO 'usucursonode'@'%';
FLUSH PRIVILEGES;


CREATE TABLE Sessao (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    codigo VARCHAR(32) NOT NULL,
    status ENUM('ativa', 'encerrada') NOT NULL,
    professorId VARCHAR(36) NOT NULL,
    criadoEm DATETIME NOT NULL,
    FOREIGN KEY (professorId) REFERENCES User(id)
);

CREATE TABLE Question (
    id VARCHAR(36) PRIMARY KEY,
    conteudo TEXT NOT NULL,
    autorAnonimo VARCHAR(255),
    sessaoId VARCHAR(36) NOT NULL,
    status ENUM('pendente', 'respondida', 'destacada') NOT NULL,
    criadoEm DATETIME NOT NULL,
    FOREIGN KEY (sessaoId) REFERENCES Session(id)
);

CREATE TABLE Reacao (
    id VARCHAR(36) PRIMARY KEY,
    tipo ENUM('curtir', 'entendi', 'confuso') NOT NULL,
    perguntaId VARCHAR(36) NOT NULL,
    criadoEm DATETIME NOT NULL,
    FOREIGN KEY (perguntaId) REFERENCES Question(id)
);

CREATE TABLE ExportLog (
    id VARCHAR(36) PRIMARY KEY,
    sessaoId VARCHAR(36) NOT NULL,
    formato ENUM('csv', 'pdf') NOT NULL,
    geradoPor VARCHAR(36) NOT NULL,
    geradoEm DATETIME NOT NULL,
    FOREIGN KEY (sessaoId) REFERENCES Session(id),
    FOREIGN KEY (geradoPor) REFERENCES User(id)
);

