SELECT * FROM USUARIOS WHERE NOMBRE = 'Nombre1';

SELECT  U.NOMBRE AS NOMBRE, COUNT(*) AS NUMERO_POLIZAS 
FROM POLIZAS P
JOIN USUARIOS U 
    ON U.ID_USUARIO = P.ID_USUARIO
GROUP BY U.NOMBRE
ORDER BY NUMERO_POLIZAS DESC;