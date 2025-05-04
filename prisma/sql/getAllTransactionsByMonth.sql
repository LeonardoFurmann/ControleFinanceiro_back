SELECT
  t.id,
  t.date,
  t.amount,
  tt.id AS "transactionType",
  c.description AS "category",
  p.description AS "paymentMethod"
FROM transactions t
JOIN transaction_types tt ON t.transaction_type_id = tt.id
JOIN categories c ON t.category_id = c.id
JOIN payment_methods p ON t.payment_method_id = p.id
WHERE t.user_id = $1
   AND t.date >= $2
   AND t.date < $3
ORDER BY t.date;