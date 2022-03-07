ami

suivi_ami
conversation_ami

CREATE TABLE IF NOT EXISTS ami(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_friend INT,
    confirmed BOOLEAN,
    confirmed_at DATETIME,
    CONSTRAINT fk_ami_user FOREIGN KEY (id_user) REFERENCES user(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_ami_friend FOREIGN KEY (id_friend) REFERENCES user(id)
    ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS suivi_ami(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    nom_user VARCHAR(256),
    type_info VARCHAR(150),
    id_info INT,
    date_send DATETIME
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS conversation_ami(
    id INT PRIMARY KEY AUTO_INCREMENT,
    sending INT,
    sending_name VARCHAR(256),
    receiving INT,
    receiving_name VARCHAR(256),
    comment TEXT,
    date_send DATETIME
)ENGINE=INNODB;