CREATE MIGRATION m1p4j43buybz4tun6vhm4wyaa6c2fg52rrwqglitvdfeefn3tongwq
    ONTO m1yvjm4pquoxze2dcbn53bjybmoo4osd7eripe3ntf34ti55embqfq
{
  ALTER TYPE default::Issue {
      CREATE INDEX ON (.priority);
      CREATE INDEX ON (.status);
  };
  CREATE TYPE default::IssueActivity {
      CREATE REQUIRED LINK issue: default::Issue {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED LINK workspaceMember: default::WorkspaceMember;
      CREATE REQUIRED PROPERTY message: std::str;
  };
  ALTER TYPE default::Issue {
      CREATE MULTI LINK issueactivity := (.<issue[IS default::IssueActivity]);
  };
  ALTER TYPE default::Issue {
      ALTER LINK websiteaddress {
          RENAME TO websiteaddresses;
      };
  };
  ALTER TYPE default::Issue {
      DROP PROPERTY urls;
  };
  ALTER TYPE default::WebsiteAddress {
      DROP PROPERTY issueId;
      ALTER PROPERTY url {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::WorkspaceMember {
      CREATE MULTI LINK issueactivities := (.<workspaceMember[IS default::IssueActivity]);
  };
};
