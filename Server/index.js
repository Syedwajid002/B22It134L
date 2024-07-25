const express = require('express');
const axios = require('axios');
const { json } = require('body-parser');
const app = express();
const cors=require('cors');
app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/", (req, res) => {
    const autho=Auth();
    res.json(autho);
});
const registerUser = async () => {
    try {
        const response = await axios.post('http://20.244.56.144/test/register', {
            companyName: "goMart",
            ownerName: "Wajid",
            rollNo: "134",
            ownerEmail: "wajid@gmail.com",
            accessCode: "FnaAss"
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error registering user:', error);
    }
};

const Auth = async () => {
    try {
      const response = await axios.post('http://20.244.56.144/test/auth', {
        companyName: "goMart",
        clientID: '9e4b894b-2faf-4c63-9a75-4473065954ae',
        clientSecret: 'cZNFMCZDMxfcEUSD',
        ownerName: 'Wajid',
        ownerEmail: 'wajid@gmail.com',
        rollNo: '134'
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error authenticating:', error);
    }
  };
const getProducts = async (req, res) => {
    try {
      const token = await Auth(); 
      const { companyName, categoryName } = req.params; 
  
      const response = await axios.get(
        `http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            top: req.query.top,          
            minPrice: req.query.minPrice,  
            maxPrice: req.query.maxPrice  
          }
        }
      );
  
      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Error fetching products');
    }
  };
  
  app.get('/api/products/:companyName/:categoryName', getProducts);

app.listen(3000, (req, res) => {
    console.log("Listening at port 3000")
})