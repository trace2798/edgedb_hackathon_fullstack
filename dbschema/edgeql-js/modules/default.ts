// GENERATED by @edgedb/generate v0.5.3

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _cal from "./cal";
export type $MemberRole = {
  "admin": $.$expr_Literal<$MemberRole>;
  "member": $.$expr_Literal<$MemberRole>;
  "owner": $.$expr_Literal<$MemberRole>;
} & $.EnumType<"default::MemberRole", ["admin", "member", "owner"]>;
const MemberRole: $MemberRole = $.makeType<$MemberRole>(_.spec, "8cec14b5-10f6-11ef-ba3d-3bffaf86c6f1", _.syntax.literal);

export type $AccountλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "provider": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "providerAccountId": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "access_token": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "expires_at": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "id_token": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "refresh_token": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "scope": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "session_state": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "token_type": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "type": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "<accounts[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<accounts": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Account = $.ObjectType<"default::Account", $AccountλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {provider: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },providerAccountId: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
  {providerAccountId: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Account = $.makeType<$Account>(_.spec, "b1b6a034-103f-11ef-9e2f-a9ad8001e360", _.syntax.literal);

const Account: $.$expr_PathNode<$.TypeSet<$Account, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Account, $.Cardinality.Many), null);

export type $ActivityλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "workspaceId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "message": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "updated": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "<activity[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<activity[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<activity": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Activity = $.ObjectType<"default::Activity", $ActivityλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Activity = $.makeType<$Activity>(_.spec, "57afc9de-113b-11ef-87f6-1f54bd7e55a8", _.syntax.literal);

const Activity: $.$expr_PathNode<$.TypeSet<$Activity, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Activity, $.Cardinality.Many), null);

export type $BoardλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "backgroundImage": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "creatorUserId": $.PropertyDesc<_std.$uuid, $.Cardinality.AtMostOne, false, false, false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "workspaceMember": $.LinkDesc<$WorkspaceMember, $.Cardinality.One, {}, false, false,  false, false>;
  "lists": $.LinkDesc<$List, $.Cardinality.Many, {}, false, true,  false, false>;
  "<boards[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<boards[is WorkspaceMember]": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, false,  false, false>;
  "<board[is List]": $.LinkDesc<$List, $.Cardinality.Many, {}, false, false,  false, false>;
  "<board": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<boards": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Board = $.ObjectType<"default::Board", $BoardλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Board = $.makeType<$Board>(_.spec, "01469bc0-14ea-11ef-b733-c3a1def64096", _.syntax.literal);

const Board: $.$expr_PathNode<$.TypeSet<$Board, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Board, $.Cardinality.Many), null);

export type $IssueλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "assigneeId": $.PropertyDesc<_std.$uuid, $.Cardinality.AtMostOne, false, false, false, false>;
  "workspaceId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "priority": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, true>;
  "status": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, true>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "duedate": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "workspaceMember": $.LinkDesc<$WorkspaceMember, $.Cardinality.One, {}, false, false,  false, false>;
  "issueactivity": $.LinkDesc<$IssueActivity, $.Cardinality.Many, {}, false, true,  false, false>;
  "websiteaddresses": $.LinkDesc<$WebsiteAddress, $.Cardinality.Many, {}, false, true,  false, false>;
  "<issue[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<issue[is WorkspaceMember]": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, false,  false, false>;
  "<issue[is WebsiteAddress]": $.LinkDesc<$WebsiteAddress, $.Cardinality.Many, {}, false, false,  false, false>;
  "<issue[is IssueActivity]": $.LinkDesc<$IssueActivity, $.Cardinality.Many, {}, false, false,  false, false>;
  "<issue": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Issue = $.ObjectType<"default::Issue", $IssueλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Issue = $.makeType<$Issue>(_.spec, "1c47c383-11fc-11ef-8d18-8560f367f593", _.syntax.literal);

const Issue: $.$expr_PathNode<$.TypeSet<$Issue, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Issue, $.Cardinality.Many), null);

export type $IssueActivityλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "message": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "issue": $.LinkDesc<$Issue, $.Cardinality.One, {}, false, false,  false, false>;
  "<issueactivity[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<issueactivity": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $IssueActivity = $.ObjectType<"default::IssueActivity", $IssueActivityλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $IssueActivity = $.makeType<$IssueActivity>(_.spec, "b17f1c26-141d-11ef-ba0a-e53b6b507fca", _.syntax.literal);

const IssueActivity: $.$expr_PathNode<$.TypeSet<$IssueActivity, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($IssueActivity, $.Cardinality.Many), null);

export type $ListλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "boardId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "workspaceId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "order": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_cal.$local_datetime, $.Cardinality.AtMostOne, false, false, false, true>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "board": $.LinkDesc<$Board, $.Cardinality.One, {}, false, false,  false, false>;
  "<lists[is Board]": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, false,  false, false>;
  "<lists[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<lists": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $List = $.ObjectType<"default::List", $ListλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $List = $.makeType<$List>(_.spec, "791a68c9-1672-11ef-839a-116c36cdff47", _.syntax.literal);

const List: $.$expr_PathNode<$.TypeSet<$List, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($List, $.Cardinality.Many), null);

export type $SessionλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "expires": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
  "sessionToken": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "<sessions[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<sessions": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Session = $.ObjectType<"default::Session", $SessionλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {sessionToken: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Session = $.makeType<$Session>(_.spec, "b1bdaf37-103f-11ef-84ea-9d8c5d8eb2d1", _.syntax.literal);

const Session: $.$expr_PathNode<$.TypeSet<$Session, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Session, $.Cardinality.Many), null);

export type $UserλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "email": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "emailVerified": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "image": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "accounts": $.LinkDesc<$Account, $.Cardinality.Many, {}, false, true,  false, false>;
  "sessions": $.LinkDesc<$Session, $.Cardinality.Many, {}, false, true,  false, false>;
  "workspaces": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, true,  false, false>;
  "workspacesMember": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, true,  false, false>;
  "activity": $.LinkDesc<$Activity, $.Cardinality.Many, {}, false, true,  false, false>;
  "<user[is Account]": $.LinkDesc<$Account, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Session]": $.LinkDesc<$Session, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is WorkspaceMember]": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user[is Activity]": $.LinkDesc<$Activity, $.Cardinality.Many, {}, false, false,  false, false>;
  "<user": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {email: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $User = $.makeType<$User>(_.spec, "b1ba0040-103f-11ef-bc38-bff39f8b844a", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null);

export type $VerificationTokenλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "identifier": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "token": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "expires": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
}>;
type $VerificationToken = $.ObjectType<"default::VerificationToken", $VerificationTokenλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {identifier: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },token: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
  {token: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $VerificationToken = $.makeType<$VerificationToken>(_.spec, "b1ca5c9d-103f-11ef-b07c-cb80b5c71272", _.syntax.literal);

const VerificationToken: $.$expr_PathNode<$.TypeSet<$VerificationToken, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($VerificationToken, $.Cardinality.Many), null);

export type $WebsiteAddressλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "url": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "issue": $.LinkDesc<$Issue, $.Cardinality.One, {}, false, false,  false, false>;
  "<websiteaddresses[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<websiteaddresses": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $WebsiteAddress = $.ObjectType<"default::WebsiteAddress", $WebsiteAddressλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $WebsiteAddress = $.makeType<$WebsiteAddress>(_.spec, "516fef45-13b4-11ef-8888-89121fce0fff", _.syntax.literal);

const WebsiteAddress: $.$expr_PathNode<$.TypeSet<$WebsiteAddress, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($WebsiteAddress, $.Cardinality.Many), null);

export type $WorkspaceλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "updated": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "workspaceMember": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, true,  false, false>;
  "activity": $.LinkDesc<$Activity, $.Cardinality.Many, {}, false, true,  false, false>;
  "issue": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, true,  false, false>;
  "boards": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, true,  false, false>;
  "lists": $.LinkDesc<$List, $.Cardinality.Many, {}, false, true,  false, false>;
  "<workspace[is List]": $.LinkDesc<$List, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaces[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is WorkspaceMember]": $.LinkDesc<$WorkspaceMember, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is Activity]": $.LinkDesc<$Activity, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace[is Board]": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspace": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaces": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Workspace = $.ObjectType<"default::Workspace", $WorkspaceλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Workspace = $.makeType<$Workspace>(_.spec, "9cd892bb-107a-11ef-851b-25267d2d35ff", _.syntax.literal);

const Workspace: $.$expr_PathNode<$.TypeSet<$Workspace, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Workspace, $.Cardinality.Many), null);

export type $WorkspaceMemberλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "userId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "workspaceId": $.PropertyDesc<_std.$uuid, $.Cardinality.One, false, true, false, false>;
  "created": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "memberRole": $.PropertyDesc<$MemberRole, $.Cardinality.AtMostOne, false, false, false, true>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "updated": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "user": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "workspace": $.LinkDesc<$Workspace, $.Cardinality.One, {}, false, false,  false, false>;
  "issue": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, true,  false, false>;
  "boards": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, true,  false, false>;
  "<workspacesMember[is User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMember[is Workspace]": $.LinkDesc<$Workspace, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMember[is Issue]": $.LinkDesc<$Issue, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMember[is Board]": $.LinkDesc<$Board, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspaceMember": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<workspacesMember": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $WorkspaceMember = $.ObjectType<"default::WorkspaceMember", $WorkspaceMemberλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $WorkspaceMember = $.makeType<$WorkspaceMember>(_.spec, "8cec22f0-10f6-11ef-a0ec-917cc6ef562f", _.syntax.literal);

const WorkspaceMember: $.$expr_PathNode<$.TypeSet<$WorkspaceMember, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($WorkspaceMember, $.Cardinality.Many), null);



export { MemberRole, $Account, Account, $Activity, Activity, $Board, Board, $Issue, Issue, $IssueActivity, IssueActivity, $List, List, $Session, Session, $User, User, $VerificationToken, VerificationToken, $WebsiteAddress, WebsiteAddress, $Workspace, Workspace, $WorkspaceMember, WorkspaceMember };

type __defaultExports = {
  "MemberRole": typeof MemberRole;
  "Account": typeof Account;
  "Activity": typeof Activity;
  "Board": typeof Board;
  "Issue": typeof Issue;
  "IssueActivity": typeof IssueActivity;
  "List": typeof List;
  "Session": typeof Session;
  "User": typeof User;
  "VerificationToken": typeof VerificationToken;
  "WebsiteAddress": typeof WebsiteAddress;
  "Workspace": typeof Workspace;
  "WorkspaceMember": typeof WorkspaceMember
};
const __defaultExports: __defaultExports = {
  "MemberRole": MemberRole,
  "Account": Account,
  "Activity": Activity,
  "Board": Board,
  "Issue": Issue,
  "IssueActivity": IssueActivity,
  "List": List,
  "Session": Session,
  "User": User,
  "VerificationToken": VerificationToken,
  "WebsiteAddress": WebsiteAddress,
  "Workspace": Workspace,
  "WorkspaceMember": WorkspaceMember
};
export default __defaultExports;
