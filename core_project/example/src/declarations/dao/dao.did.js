export const idlFactory = ({ IDL }) => {
  const Subaccount = IDL.Vec(IDL.Nat8);
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const Proposal = IDL.Record({
    'status' : IDL.Variant({
      'Passed' : IDL.Null,
      'Open' : IDL.Null,
      'Rejected' : IDL.Null,
    }),
    'creator' : Account,
    'votes' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'timestamp' : IDL.Int,
    'payload' : IDL.Text,
  });
  return IDL.Service({
    'get_all_proposals' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Int, Proposal))],
        ['query'],
      ),
    'get_proposal' : IDL.Func([IDL.Int], [IDL.Opt(Proposal)], ['query']),
    'submit_proposal' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : Proposal, 'Err' : IDL.Text })],
        [],
      ),
    'vote' : IDL.Func(
        [IDL.Int, IDL.Bool],
        [IDL.Variant({ 'Ok' : IDL.Tuple(IDL.Nat, IDL.Nat), 'Err' : IDL.Text })],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
