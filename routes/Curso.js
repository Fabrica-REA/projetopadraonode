/*
Descrição: API para a tabela Curso
Autor    : Gerado por GitHub Copilot
*/
const express = require('express');
const router = express.Router();
const { getPool } = require('../db');
const { body, validationResult, param } = require('express-validator');

// Validação de entrada para Curso
const validateCursoInput = [
  body('nome').notEmpty().withMessage('Nome é obrigatório.'),
  body('link').notEmpty().withMessage('Link é obrigatório.'),
  body('campus').notEmpty().withMessage('Campus é obrigatório.'),
  body('id').optional({ values: 'falsy' }).isInt({ min: 1 }).withMessage('ID deve ser um inteiro positivo se informado.'),
];

// Validação de parâmetros para DELETE Curso
const validateParamsCursoDelete = [
  body('id').if(body('id').exists()).isInt({ min: 1 }).withMessage('ID deve ser um inteiro positivo.'),
];

const validateParamsCursoDeleteRoute = [
  param('id').isInt({ min: 1 }).withMessage('ID deve ser um inteiro positivo.'),
];

// GET /cursoapi?id=ID
router.get('/cursoapi', async (req, res) => {
  const id = req.query.id;
  try {
    const pool = await getPool();
    let query = 'SELECT * FROM Curso';
    let params = [];
    if (id) {
      query += ' WHERE ID = ?';
      params.push(id);
    }
    const [results] = await pool.query(query, params);
    const json_results = results.map(row => ({
      id: row.ID,
      nome: row.Nome,
      link: row.Link,
      campus: row.Campus,
    }));
    res.json(json_results);
  } catch (err) {
    console.error('Erro GET /cursoapi', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /cursoapi
router.post('/cursoapi', validateCursoInput, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados de entrada inválidos',
      errors: errors.array()
    });
  }
  const { id, nome, link, campus } = req.body;
  try {
    const pool = await getPool();
    let query;
    let queryParams;
    let insertedId;
    if (!id) {
      query = `INSERT INTO Curso (Nome, Link, Campus) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Nome = VALUES(Nome), Link = VALUES(Link), Campus = VALUES(Campus);`;
      queryParams = [nome, link, campus];
    } else {
      query = `INSERT INTO Curso (ID, Nome, Link, Campus) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Nome = VALUES(Nome), Link = VALUES(Link), Campus = VALUES(Campus);`;
      queryParams = [id, nome, link, campus];
    }
    await pool.query(query, queryParams);
    if (!id) {
      const [lastInsertIdResults] = await pool.query('SELECT LAST_INSERT_ID() as ID');
      insertedId = lastInsertIdResults[0].ID;
    } else {
      insertedId = id;
    }
    res.status(200).json({
      success: true,
      message: 'Curso inserido/atualizado com sucesso!',
      data: { id: insertedId },
    });
  } catch (err) {
    console.error('Erro ao inserir/atualizar Curso:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// DELETE /cursoapi/:id
router.delete('/cursoapi/:id', validateParamsCursoDeleteRoute, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Parâmetros inválidos para remover Curso', errors: errors.array() });
  }
  const id = parseInt(req.params.id, 10);
  try {
    const pool = await getPool();
    const [result] = await pool.query('DELETE FROM Curso WHERE ID=?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Registro não encontrado!' });
    }
    return res.json({ success: true, message: 'Registro apagado com sucesso!' });
  } catch (err) {
    console.error('Erro ao apagar Curso:', err);
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
