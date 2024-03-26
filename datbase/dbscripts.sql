stateLogin table

CREATE TABLE stateLogin (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userName varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    role int NOT NULL,
    stateName varchar(100) NOT NULL,
    createddatetime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifieddatetime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
 )


CREATE TABLE condidates (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId int NOT NULL,
    fullName VARCHAR(100) NOT NULL,
    guardianName VARCHAR(100) NOT NULL,
    dateOfBirth VARCHAR(100) NOT NULL,
    address json,
    contactNumber VARCHAR(100) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    primaryRole VARCHAR(100) NOT NULL,
    secondaryRole VARCHAR(100) DEFAULT NULL,
  	otherRole VARCHAR(100) DEFAULT NULL,
    photo TEXT NOT NULL,
    birthCertificate TEXT NOT NULL,
    aadhar TEXT NOT NULL,
    createddatetime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifieddatetime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `email` (`email`),
    UNIQUE KEY `contactNumber` (`contactNumber`),
    FOREIGN KEY (`userId`) REFERENCES `stateLogin` (`id`)
)