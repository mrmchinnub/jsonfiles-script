
//parsing the json files
const fs = require('fs');
const uniqid=require('uniqid');
 function parseJsonFile(filesdata){
    const data=fs.readFileSync(filesdata);
    return JSON.parse(data);
    }
//creating an array and intializing the json files to it
const dataarray=[];
const filesdata=["books.json","clothes.json","electronics.json"];

filesdata.forEach(filesdata =>{
const loop =parseJsonFile(filesdata);
dataarray.push(loop)
});

console.log(dataarray);

let datafilesobj=JSON.stringify(dataarray);
console.log(datafilesobj)
//getting the user inputs

const readline = require('readline');
const userinput =readline.createInterface({
    input:process.stdin,
    output:process.stdout
  });

const category = [1,2,3];
//choosing a wanted category
userinput.question(`choose a category (${category.join(',')}):`,(userchoice)=> {
const chosencategory=parseInt(userchoice); 
 switch(chosencategory){
          case 1:
              console.log('you chose the category :Books');
              preferedct(chosencategory);
              break;
          case 2:
              console.log('you chose the category :Clothes');
              preferedct(chosencategory);
              break;
          case 3:
              console.log(' you chose the category :Electronics');
              preferedct(chosencategory);
              break;
          case 4:
              console.log('Invalid category' );
              break; }

    });
//giving selected category in table format
const {Table}=require('console-table-printer');
const{printTable} = require('console-table-printer');

const table = new Table({
    columns:[
    {name :"id"},{name:"name"},{name:"type"},{name:"price",},{name:"discount"},{name:"currency"},{name:"inventory"}
    ]});

     function preferedct(product){
     const wishedproduct=dataarray.find(item =>item.category==product);
       wishedproduct.products.forEach(item=> {
        table.addRow({id:item.ID, name:item.name, type:item.type,price:item.price,discount:item.discount,currency:item.currency,inventory:item.inventory})
    });
    table.printTable();
   //selecting a json file to apply crud operations
    const jsonfiles=[1,2,3];
    userinput.question(`choose a file to apply CRUD operations 
    1.books.json
    2.clothes.json
    3.electronics.json
    (${jsonfiles.join(' ')}):`,(schoice) => {
    const selected_file=parseInt(schoice);
    switch(selected_file)
     {
       case 1:
        console.log('you selected books.json file');
        crud(selected_file)
        break;
       case 2:
          console.log('you selected clothes.json file')
          crud(selected_file);
           break;
       case 3:
        console.log('you selected the electronics.json file');
        crud(selected_file);
        break;
        default:
          console.log('No such file');
          userinput.close();
          break;
       }
    
    })
  //selecting wished crud operations
    function crud(product){
      selected_item=dataarray.find(item=>item.category==product)
      userinput.question(`Do you want to (c)reate, (u)pdate, (d)elete, or (b)ack? `, (choice) => {
    switch (choice) {
     case 'c':
       createProduct(product);
       break;
     case 'u':
       updateProduct(product);
       break;
     case 'd':
        deleteProduct(product);
       break;
     case 'b':
       userinput.close();
       break;
     default:
       console.log('Invalid option');
       break;
    userinput.close();
   }
   });
  }
   //applying create operation
    const util = require('util');
    const questionAsync = util.promisify(userinput.question).bind(userinput);
    async function createProduct(category) {
  try {
    const ID = await questionAsync('Enter product ID: ');
    const name = await questionAsync('Enter product name: ');
    const type = await questionAsync('Enter product type: ');
    const price = await questionAsync('Enter product price: ');
    const discount = await questionAsync('Enter product discount: ');
    const currency = await questionAsync('Enter product currency: ');
    const inventory = await questionAsync('Enter product inventory: ');
    const newProduct = {
      ID:uniqid(),
      name,
      type,
      price: parseFloat(price),
      discount: parseFloat(discount),
      currency,
      inventory: parseInt(inventory),
    };
    dataarray.find((item) => item.category == category).products.push(newProduct);
    saveData();
  } catch (error) {
    console.error('Error:', error);
  } finally{
    userinput.close();
  }
  
}
//function for update operation
async function updateProduct(category) {
  try {
    const id = await questionAsync('Enter product ID to update: ');
    const categoryData = dataarray.find(item => item.category == category);
    const index = categoryData.products.findIndex(product => product.ID == id);

    if (index !== -1) {
      const newProduct = await NewProductDetails();
      categoryData.products[index] = { ...newProduct, ID:uniqid()};
      saveData();
    } else {
      console.log('Product not found.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    userinput.close();
  }
}

async function NewProductDetails() {
  const name = await questionAsync('Enter new product name: ');
  const type = await questionAsync('Enter new product type: ');
  const price = await questionAsync('Enter new product price: ');
  const discount = await questionAsync('Enter new product discount: ');
  const currency = await questionAsync('Enter new product currency: ');
  const inventory = await questionAsync('Enter new product inventory: ');

  return {
    name,
    type,
    price: parseFloat(price),
    discount: parseFloat(discount),
    currency,
    inventory: parseInt(inventory),
  };
}
//deleting an wished item
async function deleteProduct(category) {
  try {
    const id = await questionAsync('Enter product ID to delete: ');
    const categoryData = dataarray.find(item => item.category == category);
    const index = categoryData.products.findIndex(product => product.ID == id);

    if (index !== -1) {
      categoryData.products.splice(index, 1);
      saveData();
    } else {
      console.log('Product not found.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    userinput.close();
  }
}
//function to save our creations/updates/deletions
 function saveData() {
    datafilesobj = JSON.stringify(dataarray, null, 2);
  
    // Assuming the filenames are in the same order as the category array
    filesdata.forEach((filename, index) => {
      fs.writeFileSync(filename, JSON.stringify(dataarray[index], null, 2));
    });
  
    console.log('Data saved successfully.');
  }
}   

  
      
    
  
     
     

     
