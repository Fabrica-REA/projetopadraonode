/*
Descrição: API para a Página de cadastro da tabela Usuario
Autor    : CYI 05/03/2025
*/
const express = require('express');
const { param, body, validationResult } = require('express-validator');
const router = express.Router();
const { getPool } = require('../db');

router.get('/usuarioapi', async (req, res) => {
	const id = req.query.id;
    try {
      const pool = await getPool(); 
      const [[results]] = await pool.query('CALL UsuarioS(?)', [id]);

      const json_results = results.map(row => ({
		id: row.Id,
		nome: row.Nome,
		login: row.login,
		email: row.email,
		senha: row.senha,
		
      }));

      res.json(json_results);
    } catch (err) {
      console.error('Erro GET /usuarioapi', err);
      res.status(500).json({ "error": err.message });
    }
  });

const validateUsuarioInput = [
	body('nome').notEmpty().withMessage('Nome é obrigatória.'),
	body('login').notEmpty().withMessage('login é obrigatória.'),
	body('email').notEmpty().withMessage('email é obrigatória.'),
	body('senha').notEmpty().withMessage('senha é obrigatória.'),
	body('id').optional({ values: 'falsy' }).isInt({ min: 1 }).withMessage('Código Id deve ser um inteiro positivo se informado.'),
];
router.post('/usuarioapi', validateUsuarioInput, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Dados de entrada inválidos',
      errors: errors.array() 
    });
  }
    const { id, nome, login, email, senha } = req.body;

    try {
      const pool = await getPool();
      let query;
      let queryParams;
      let insertedId;

      if (!id) {
        query = `INSERT INTO Usuario (Nome, login, email, senha) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE 
		Nome = VALUES(Nome), login = VALUES(login), email = VALUES(email), senha = VALUES(senha)
		;`;
        queryParams = [nome, login, email, senha];
      } else {
        query = `INSERT INTO Usuario (Id, Nome, login, email, senha) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE 
		Nome = VALUES(Nome), login = VALUES(login), email = VALUES(email), senha = VALUES(senha)
		;`;

        queryParams = [id, nome, login, email, senha];
      }

      await pool.query(query, queryParams);

      if (!id) {
        const [lastInsertIdResults] = await pool.query('SELECT LAST_INSERT_ID() as Id');
		insertedId = lastInsertIdResults[0].Id;
      } else {
        insertedId = id;
      }

      res.status(200).json({
        success: true,
        message: 'Atualizado com sucesso!',
        data: { id: insertedId },
      });
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  });

const validateParamsUsuarioapid = [
  param('id').isInt().withMessage('Id must be an int'),
];
router.delete('/usuarioapid/:id', validateParamsUsuarioapid, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: "Parâmetros inválidos para remover Usuario", errors: errors.array() });
  }

	// mudar o tipo se necessario ***
  const id = parseInt(req.params.id, 10);
  const pool = await getPool();

  try {
    const [result] = await pool.query('DELETE FROM Usuario WHERE Id=?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Registro não encontrado!' });
    }
    return res.json({ success: true, message: 'Registro apagado com sucesso!' });
  } catch (err) {
    console.error('Erro ao apagar Usuario:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;

