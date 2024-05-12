CREATE MIGRATION m1naqezouhay5tk7bmokfqtfspy4vmnlfr3fgnbovalhv7s36yb4lq
    ONTO m1uznznvd4uwqxynqhymijcaa77le6aey6oz34xarnlzyxtpyvqz5q
{
  ALTER TYPE default::Account {
      ALTER PROPERTY createdAt {
          RESET default;
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Session {
      ALTER PROPERTY createdAt {
          RESET default;
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      ALTER PROPERTY expires {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY createdAt {
          RESET default;
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      ALTER PROPERTY emailVerified {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::VerificationToken {
      ALTER PROPERTY createdAt {
          RESET default;
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      ALTER PROPERTY expires {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Workspace {
      DROP PROPERTY createdBy;
  };
};
