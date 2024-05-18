CREATE MIGRATION m1uwxj42jy25ropaz5lk4ccidqcwmxng5jtk6x3bhm7uytzzcut6ma
    ONTO m1p4p6ptj3bofntghly22matzkwmber7e63ydd6ogbixbppkvlkvla
{
  CREATE TYPE default::Board {
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.workspace);
      CREATE REQUIRED LINK workspaceMember: default::WorkspaceMember;
      CREATE PROPERTY backgroundImage: std::str;
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY creatorUserId: std::uuid;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
          CREATE REWRITE
              UPDATE 
              USING (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK boards := (.<workspace[IS default::Board]);
  };
  ALTER TYPE default::WorkspaceMember {
      CREATE MULTI LINK boards := (.<workspaceMember[IS default::Board]);
  };
};
