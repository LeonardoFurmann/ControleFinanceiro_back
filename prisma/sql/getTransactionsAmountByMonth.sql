SELECT 
  t.transaction_type_id,
  tt.description AS type,
  SUM(t.amount) AS total
FROM transactions AS t
JOIN transaction_types tt ON t.transaction_type_id = tt.id
WHERE t.user_id = $1
    and DATE_TRUNC('month', t.date) = DATE_TRUNC('month', DATE_TRUNC('month', TO_TIMESTAMP($2, 'YYYY-MM-DD')) )
GROUP BY t.transaction_type_id, tt.description
ORDER BY t.transaction_type_id;