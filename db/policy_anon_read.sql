create policy "Allow anonymous access"
  on pettycash.cash_transaction
  for select to anon
    using (true);

/*
drop policy "Allow anonymous access" on pettycash.cash_transaction
*/