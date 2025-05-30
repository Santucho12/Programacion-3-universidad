const turnosModel = require('../../models/sqlite/turno.model.js');

class TurnosController {

  async getTurnos(req, res) {
    try {
      const { idPaciente } = req.params;
      const turnos = await turnosModel.getTurnosPacienteModel(idPaciente);
      res.status(200).json(turnos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async borrarTurno(req, res) {
    try {
      const { idTurno } = req.params;
      const turno = await turnosModel.borrarTurnoModel(idTurno);
      res.status(200).json(turno);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async crearTurno(req, res) {
    try {
      const { fecha, hora, motivo, pacienteId } = req.body;

      // Validaciones simples de entrada
      if (!fecha || !hora || !motivo || !pacienteId) {
        throw new Error('Faltan datos obligatorios: fecha, hora, motivo y pacienteId');
      }

      const nuevoTurno = await turnosModel.crearTurnoModel({ fecha, hora, motivo, pacienteId });
      res.status(201).json(nuevoTurno);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new TurnosController();
