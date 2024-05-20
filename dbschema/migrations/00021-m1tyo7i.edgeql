CREATE MIGRATION m1tyo7iykefxphjhi6vt5c4kvvticu6azndnnehadirm64pegn7tdq
    ONTO m1jbk3brrpzmjqlohem53xm6eoqwwf26qjio62qdzgx3ve5ihgro7q
{
  ALTER TYPE default::Card {
      CREATE REQUIRED PROPERTY priority: std::str {
          SET default := 'no priority';
      };
      CREATE INDEX ON (.priority);
      CREATE REQUIRED PROPERTY status: std::str {
          SET default := 'todo';
      };
      CREATE INDEX ON (.status);
      CREATE PROPERTY assigneeId: std::uuid;
      CREATE PROPERTY duedate: std::datetime;
  };
};
