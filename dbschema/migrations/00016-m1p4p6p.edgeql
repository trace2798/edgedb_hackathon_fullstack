CREATE MIGRATION m1p4p6ptj3bofntghly22matzkwmber7e63ydd6ogbixbppkvlkvla
    ONTO m1gaygirsefmmaxlgqf6mgdkgfhm52r6nhuo2fkjx3b6q34fmbn6qa
{
  ALTER TYPE default::IssueActivity {
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
};
