CREATE MIGRATION m1o5s3gsggvkwwmfd3h3bdd7ci3wckpe5eqn6byosn7lognqpbeckq
    ONTO m1uwxj42jy25ropaz5lk4ccidqcwmxng5jtk6x3bhm7uytzzcut6ma
{
  CREATE TYPE default::List {
      CREATE REQUIRED LINK board: default::Board {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.board);
      CREATE REQUIRED PROPERTY boardId := (.board.id);
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY workspaceId := (.workspace.id);
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY order: std::int64;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
          CREATE REWRITE
              UPDATE 
              USING (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::Board {
      CREATE MULTI LINK lists := (.<board[IS default::List]);
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK lists := (.<workspace[IS default::List]);
  };
};
