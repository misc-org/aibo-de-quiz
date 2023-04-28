DROP TABLE IF EXISTS user_credential;

CREATE TABLE user_credential (
  uuid TEXT,
  access_token TEXT,
  expires_at INT,
  refresh_token TEXT,
  PRIMARY KEY (uuid)
);

INSERT INTO
  user_credential (
    uuid,
    access_token,
    expires_at,
    refresh_token
  )
VALUES
  (
    'XXXXXXXX-XXXX-4XXX-xXXX-XXXXXXXXXXXX',
    'access_token',
    1679842639,
    'refresh_token'
  );

DROP TABLE IF EXISTS user_data;

CREATE TABLE user_data (
  uuid TEXT,
  id TEXT,
  name TEXT,
  created_at INT,
  PRIMARY KEY (uuid)
);

INSERT INTO
  user_data (uuid, id, name, created_at)
VALUES
  (
    'XXXXXXXX-XXXX-4XXX-xXXX-XXXXXXXXXXXX',
    'id',
    'name',
    1679842639
  );