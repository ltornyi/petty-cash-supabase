CREATE POLICY "All CRUD operations are allowed for authenticated users" ON pettycash.cash_transaction
AS PERMISSIVE FOR ALL
TO authenticated
USING (true)