// function demologin () {






//     fetch(`${process.env.REACT_APP_BACKEND}/product/update`,{
//         method:"PUT",
//         body:JSON.stringify(
//             {
//                 title: 'test product',
//                 price: 13.5,
//                 description: 'lorem ipsum set',
//                 image: 'https://i.pravatar.cc',
//                 category: 'electronic'
//             }
//         )
//     })
//         .then(res=>res.json())
//         .then(json=>console.log(json))









//     fetch(`${process.env.REACT_APP_BACKEND}/product/update`, {
//         method: "PUT",
//         body: JSON.stringify(
//             {
//                 "name": "jimmy",
//                 "job": "developer"
//             }
//         ),
//       })
//       .then(res=> {
//         if (res.ok) {console.log("put request successful")}
//         else {console.log("put request unsuccessful")}
//         return res
//       })
//       .then(res => res.json())
//       .then(dats => console.log(data))
//       .catch(error => console.log(error))


//     return(
//         <div>
//             srgpjkrem
//         </div>
//     )
// }

// export default demologin;








































// fetch(`${process.env.REACT_APP_BACKEND}/product/addProduct`, {
//     method: "POST",
//     body: formData,
//   })
//     // The .json() method will convert a 'stringified' object to a JavaScript object
//     .then((backendResponseJson) => backendResponseJson.json())
//     // 2.1 If the submission is successful, set state to "successful"
//     .then((backendResponse) => {
//       if (backendResponse.message === "User created") {
//         setFormState("successful");
//         // history.replace('/')
//         //history.replace('/HomeScreen')  //////////////////////////////////////
//       } else {
//         setFormState("unsuccessful");
//       }
//     })
//     // 2.2 If the submission is successful, set state to "unsucessful"
//     .catch((err) => {
//       console.log(err);
//       setFormState("unsuccessful");
//     });





//     fetch(`${process.env.REACT_APP_BACKEND}/product/update`, {
//         method: "PUT",
//         body: formData,
//       })

    



//       fetch(`${process.env.REACT_APP_BACKEND}/product/update`, {
//         method: "PUT",
//         body: JSON.stringify(
//             {
//                 "name": "jimmy",
//                 "job": "developer"
//             }
//         ),
//       })
//       .then(res=> {
//         if (res.ok) {console.log("put request successful")}
//         else {console.log("put request unsuccessful")}
//         return res
//       })
//       .then(res => res.json())
//       .then(dats => console.log(data))
//       .catch(error => console.log(error))













// router.put("/update", function (req, res) {
//     // The search criteria
//     const search = { _id: mongoose.Types.ObjectId(req.body._id) };
  
//     // The replacement of the document
//     const updatedDocument = {
//       name: req.body.name,
//       price: req.body.price,
//       category: req.body.category,
//       description: req.body.description,
//     };
  
//     // This will tell MongoDB to show the updated document
//     const options = { new: true };
  
//     ProductModel.findOneAndUpdate(search, updatedDocument, options)
//       .then(function (updatedDocument) {
//         res.send(updatedDocument);
//       })
//       .catch(function (error) {
//         console.log("Error /product/update", error);
//       });
//   });




















//   //////////////////////////////////////////////////////////////
//   router.put("/update", function (req, res) {
//     // The search criteria
//     const search = { _id: mongoose.Types.ObjectId(req.body._id) };
  
//     // The replacement of the document
//     const updatedDocument = {
//       name: req.body.name,
//       price: req.body.price,
//       category: req.body.category,
//       description: req.body.description,
//     };
  
//     // This will tell MongoDB to show the updated document
//     const options = { new: true };
  
//     ProductModel.findOneAndUpdate(search, updatedDocument, options)
//       .then(function (updatedDocument) {
//         res.send(updatedDocument);
//       })
//       .catch(function (error) {
//         console.log("Error /product/update", error);
//       });
//   });
// //////////////////////////////////////////////////////////////
