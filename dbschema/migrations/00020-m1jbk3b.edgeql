CREATE MIGRATION m1jbk3brrpzmjqlohem53xm6eoqwwf26qjio62qdzgx3ve5ihgro7q
    ONTO m1x2jers2xwhggile5cg34crz4a7mh3hug4o75xjutez72leoebpda
{
  CREATE TYPE default::Card {
      CREATE REQUIRED LINK list: default::List {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.list);
      CREATE REQUIRED PROPERTY listId := (.list.id);
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY order: std::int64;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
          CREATE REWRITE
              UPDATE 
              USING (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::List {
      CREATE MULTI LINK cards := (.<list[IS default::Card]);
  };
};
