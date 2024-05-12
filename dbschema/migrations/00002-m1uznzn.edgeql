CREATE MIGRATION m1uznznvd4uwqxynqhymijcaa77le6aey6oz34xarnlzyxtpyvqz5q
    ONTO m1aldjjjtw5zar42ajkgwdpv73ckjrac6c3yrwmbxtfwx4vtfua3fa
{
  CREATE TYPE default::Workspace {
      CREATE REQUIRED LINK user: default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY createdBy: std::str;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK workspaces := (.<user[IS default::Workspace]);
  };
};
