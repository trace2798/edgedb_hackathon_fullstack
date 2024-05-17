CREATE MIGRATION m1yvjm4pquoxze2dcbn53bjybmoo4osd7eripe3ntf34ti55embqfq
    ONTO m1v5qnq2zqdzf2f3exyp4swqz33xiypqbb2eqp47ygsl3epjnl4luq
{
  CREATE TYPE default::WebsiteAddress {
      CREATE REQUIRED LINK issue: default::Issue {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY issueId := (.issue.id);
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY url: std::str;
  };
  ALTER TYPE default::Issue {
      CREATE MULTI LINK websiteaddress := (.<issue[IS default::WebsiteAddress]);
  };
};
