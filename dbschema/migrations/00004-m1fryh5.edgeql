CREATE MIGRATION m1fryh53hf3jmco26kvi7nspj2twsrkhojnwfjpdq7uygj3gmghuca
    ONTO m1naqezouhay5tk7bmokfqtfspy4vmnlfr3fgnbovalhv7s36yb4lq
{
  CREATE SCALAR TYPE default::MemberRole EXTENDING enum<admin, member, owner>;
  CREATE TYPE default::WorkspaceMember {
      CREATE REQUIRED LINK user: default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE REQUIRED PROPERTY workspaceId := (.workspace.id);
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE PROPERTY memberRole: default::MemberRole {
          SET default := 'member';
      };
      CREATE PROPERTY name: std::str;
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
      CREATE MULTI LINK workspacesMember := (.<user[IS default::WorkspaceMember]);
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK workspaceMember := (.<workspace[IS default::WorkspaceMember]);
  };
};
