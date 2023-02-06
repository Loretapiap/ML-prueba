const cors = require('cors');

const express = require('express');
const app = express();
const MercadolibreService = require('./MercadolibreService');

const mercadolibreService = new MercadolibreService();

app.use(cors());


// getUser endpoint

app.get('/user', async (req, res) => {
  try {
    const user = await mercadolibreService.getUser();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las restricciones del usuario');
  }
});

// getUserRestrictions endpoint

app.get('/restrictions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const restrictions = await mercadolibreService.getUserRestrictions(userId);
    res.json(restrictions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las restricciones del usuario');
  }
});

// getUserPurchases endpoint

app.get('/user-purchases/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit, offset } = req.query;
    const userPurchases = await mercadolibreService.getUserPurchases(userId, limit, offset);
    res.status(200).json(userPurchases);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

// getLevel endpoint

app.get('/getLevel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const restrictions = await mercadolibreService.getLevel(id);
    res.json(restrictions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el nivel del usuario');
  }
});

// getShipment endpoint
app.get('/shipment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await mercadolibreService.getShipment(id);
    res.json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los envíos del usuario');
  }
});

// getPayment endpoint

app.get('/payment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await mercadolibreService.getPayment(id);
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los pagos del usuario');
  }
});


app.listen(8081, () => {
  console.log('Server started on port 8081');
});