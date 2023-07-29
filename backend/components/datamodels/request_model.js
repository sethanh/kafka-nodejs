let requestModel = async (data) => {
   const { Staffs } = data;
   const { Shop } = Staffs[0];
   const { Products } = Shop;
   // const requestData = groupBy(Products, function (o) {
   //    return o.Request_details.id_invoices_request;
   // });
   const lengthProducts= Products.length;
   var body=[]
   for (let i=0; i<lengthProducts; i++) {
      let lengthRq= Products[i].Request_details.length;
      console.log(lengthRq);
      for (let j=0; j<lengthRq; j++) {
         body=[...body,Products[i].Request_details[j]];
      }
      console.log(i,body);
   }
   return body;
};

module.exports = { requestModel };