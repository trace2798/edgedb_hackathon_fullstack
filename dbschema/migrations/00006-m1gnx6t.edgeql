CREATE MIGRATION m1gnx6twodjqe7bz3qsyonzblwvojwt27haqkc5u7ltgxd3663r3vq
    ONTO m13whzt4moi4eygeb7336hridwgojmubzgqf5i5yema7k7wspjmjrq
{
  CREATE TYPE default::Issue {
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY workspaceId := (.workspace.id);
      CREATE REQUIRED LINK workspaceMember: default::WorkspaceMember;
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY priority: std::str {
          SET default := 'no priority';
      };
      CREATE REQUIRED PROPERTY status: std::str {
          SET default := 'todo';
      };
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK issue := (.<workspace[IS default::Issue]);
  };
  ALTER TYPE default::WorkspaceMember {
      CREATE MULTI LINK issue := (.<workspaceMember[IS default::Issue]);
  };
};
