CREATE MIGRATION m1gaygirsefmmaxlgqf6mgdkgfhm52r6nhuo2fkjx3b6q34fmbn6qa
    ONTO m1p4j43buybz4tun6vhm4wyaa6c2fg52rrwqglitvdfeefn3tongwq
{
  ALTER TYPE default::WorkspaceMember {
      DROP LINK issueactivities;
  };
  ALTER TYPE default::IssueActivity {
      DROP LINK workspaceMember;
  };
};
