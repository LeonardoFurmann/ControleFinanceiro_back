SELECT 
  t.transaction_type_id,
  tt.description AS type,
  SUM(t.amount) AS total
FROM transactions AS t
JOIN transaction_types tt ON t.transaction_type_id = tt.id
WHERE t.user_id = $1
  AND t.date >= $2
  AND t.date < $3
GROUP BY t.transaction_type_id, tt.description
ORDER BY t.transaction_type_id;