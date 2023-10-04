import express from "express"
import mysql from "mysql"
const router = express.Router()

const port = 3001;

const dbCon = {
  host: 'precios-1.c0f6dm2ucnlg.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'candidatoPrueba',
  password: 'gaspre21.M',
  database: 'prueba',
}

const conectarbd = async () => {
  const conexion = await mysql.createConnection(dbCon)

  conexion.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión a la base de datos establecida');
  }); 
  router.get('/estaciones', (req, res) => {
    

    


// endpoint para obtener todas las estaciones cercanas
    const competidoresQuery = `SELECT * FROM stations`;

    conexion.query(competidoresQuery, (err, competidoresResults) => {
      if (err) {
        console.error('Error al obtener información de los competidores:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

     


      res.json({
        competidoresResults
      });
    });

  });

  router.get('/estaciones/:estacionId', (req, res) => {
    const estacionId = req.params.estacionId;
    console.log(req.params.estacionId)
    // Consulta SQL para obtener información de la estación




    // Consulta SQL para obtener información de los competidores cercanos
    const competidoresQuery = `SELECT * FROM station where cre_id= ${estacionId}`;

    conexion.query(competidoresQuery, (err, competidoresResults) => {
      if (err) {
        console.error('Error al obtener información de los competidores:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

    


      res.json({
        competidoresResults
      });
    });

  });
}



export { router, conectarbd, port }