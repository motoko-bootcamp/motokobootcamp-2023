import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export interface Proposal {
  'status' : { 'Passed' : null } |
    { 'Open' : null } |
    { 'Rejected' : null },
  'creator' : Account,
  'votes' : [bigint, bigint],
  'timestamp' : bigint,
  'payload' : string,
}
export type Subaccount = Uint8Array;
export interface _SERVICE {
  'get_all_proposals' : ActorMethod<[], Array<[bigint, Proposal]>>,
  'submit_proposal' : ActorMethod<
    [string],
    { 'Ok' : Proposal } |
      { 'Err' : string },
  >,
  'vote' : ActorMethod<
    [bigint, boolean],
    { 'Ok' : [bigint, bigint] } |
      { 'Err' : string },
  >,
}
