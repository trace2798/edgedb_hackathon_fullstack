CREATE MIGRATION m13whzt4moi4eygeb7336hridwgojmubzgqf5i5yema7k7wspjmjrq
    ONTO m1fryh53hf3jmco26kvi7nspj2twsrkhojnwfjpdq7uygj3gmghuca
{
  CREATE TYPE default::Activity {
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY workspaceId := (.workspace.id);
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY message: std::str;
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
      CREATE MULTI LINK activity := (.<user[IS default::Activity]);
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK activity := (.<workspace[IS default::Activity]);
  };
};
