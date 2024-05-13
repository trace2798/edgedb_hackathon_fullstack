"use server";

import { configureNile } from "@/lib/AuthUtils";
import nile from "@/lib/NileServer";
import { cookies } from "next/headers";

export async function addMember(
  tenantId: string,
  email: string,
  user_id: string,
  roles: string
) {
  configureNile(cookies().get("authData"), tenantId);
  console.log(
    "adding member " +
      email +
      "with id of" +
      user_id +
      " to tenant:" +
      nile.tenantId +
      " with role: " +
      roles
  );
  try {
    // const id = uuid.v4();
    // need to set tenant ID because it is a required field
    const existingMembers = await nile
      .db("users.tenant_users")
      .where({ tenant_id: tenantId, user_id: user_id });

    if (existingMembers.length > 0) {
      console.log("User already exists in the organization");
      return { message: "User already exists in the organization" };
    }
    const userInfo = await nile.db("users.users").where({
      id: user_id,
    });
    console.log(userInfo);
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    console.log(rolesArray);
    console.log(roles);
    const res = await nile.db("users.tenant_users").insert({
      tenant_id: tenantId,
      user_id: userInfo[0].id,
      email: userInfo[0].email,
      roles: rolesArray,
    });
    console.log(res);
    return { message: "User Added" };
    // console.log("FRMO MEMBER ADD ACTION");
  } catch (e) {
    console.error(e);
    return { message: "Failed to add member" };
  }
}

// export async function removeMember(tenantId: string, user_id: string) {
//   configureNile(cookies().get("authData"), tenantId);
//   console.log(
//     "removing member " +
//       // email +
//       "with id of" +
//       user_id +
//       " from tenant:" +
//       nile.tenantId +
//       " by :" +
//       nile.userId
//   );
//   try {

//     await nile
//       .db("users.tenant_users")
//       .where({
//         tenant_id: tenantId,
//         user_id: user_id,
//       })
//       .del();
//     console.log("Member Removed");
//   } catch (e) {
//     console.error(e);
//     return { message: "Failed to remove member" };
//   }
// }
export async function removeMember(tenantId: string, user_id: string) {
  configureNile(cookies().get("authData"), tenantId);
  console.log(
    "removing member " +
      // email +
      "with id of" +
      user_id +
      " from tenant:" +
      nile.tenantId +
      " by :" +
      nile.userId
  );
  console.log(nile);
  const roleArray = await nile
    .db("users.tenant_users")
    .where({ tenant_id: nile.tenantId, user_id: nile.userId })
    .select("roles");
  const role = roleArray[0].roles;
  console.log(role);
  const roleToString = role.toString();
  console.log(roleToString);
  if (nile.userId === user_id && roleToString === "owner") {
    return { message: "Owner cannot be removed." };
  }
  try {
    if (
      nile.userId === user_id ||
      roleToString === "admin" ||
      roleToString === "owner"
    ) {
      await nile
        .db("users.tenant_users")
        .where({
          tenant_id: tenantId,
          user_id: user_id,
        })
        .del();
      console.log("Member Removed");
    } else {
      console.log("Operation not permitted. User IDs do not match.");
      return { message: "Operation not permitted." };
    }
  } catch (e) {
    console.error(e);
    return { message: "Failed to remove member" };
  }
}
