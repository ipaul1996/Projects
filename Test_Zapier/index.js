const axios = require('axios');

const url = 'https://hooks.zapier.com/hooks/catch/15514778/3t83y0i/'; 


const postData = {
            
    to: 'educatorindrajit@gmail.com',
    subject: `Happy 5th Anniversary from ABC Company!`,
    customer: 'Asmita Biswas',
    anniversary: 5
    
}

axios.post(url, postData)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
