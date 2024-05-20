CREATE MIGRATION m1dac5zrbbamyu7vremxiceot2wdexx7iqlg2ytsij7votvzy37ava
    ONTO m1tyo7iykefxphjhi6vt5c4kvvticu6azndnnehadirm64pegn7tdq
{
  CREATE TYPE default::CardAttachment {
      CREATE REQUIRED LINK card: default::Card {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.card);
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY fileUrl: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
          CREATE REWRITE
              UPDATE 
              USING (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::Card {
      CREATE MULTI LINK cardattachments := (.<card[IS default::CardAttachment]);
  };
};
