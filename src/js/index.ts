import axios, {AxiosResponse, AxiosError} from "../../node_modules/axios/index";

interface ICoin{
    id : number;
    genstand: string;
    bud: number;
    navn: string;
    
}

let allCoins : HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let buttonGetAllCustomer : HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");
buttonGetAllCustomer.addEventListener("click", showAllCoins);

let addbtn : HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
addbtn.addEventListener("click", addCustomer);

let getBtn : HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneButton");
getBtn.addEventListener("click", showOneCoin;



let uri:string = "https://localhost:44364/api/coin";

function showAllCoin():void{

    /**
     * 
     * Axios get request
     * 
     */
    axios.get<ICoin[]>(uri)
    .then(function(respone:AxiosResponse<ICoin[]>):void{ // hvis det går godt
        let result:string = "<ol>"
        
        respone.data.forEach((coin : ICoin) =>{
            if(coin == null) {
                result += "<li> Null Element <li>";
            }
            else{
                console.log(coin);
                result += "<li>" + "<b>Id<b>: " + coin.id.toString()+ " " + "<b>Genstand<b>: " + coin.genstand +" " + "<b>Bud<b>: " +  coin.bud.toString() + "<b>Navn</b>" + coin.navn +" "+  + "</li>";
            }
        });
        
        result += "</ol>";

        allCustomer.innerHTML = result; // alle Customer bliver fremvist nu.
    })
    .catch(function(error:AxiosError):void{ // hvis det går dårligt
        {
        allCustomer.innerHTML = error.message;
        }

    })
}
  /**
     * 
     * Axios get 1 request
     * 
     */
function showOneCustomers():void{

    let getOneCustomer: number = Number((<HTMLInputElement> document.getElementById("addOne")).value); //caster til html og bagefter caster valuen til number
    let oneCustomer: HTMLDivElement = <HTMLDivElement> document.getElementById("idContent");

    axios.get<ICustomer>(uri + "/" + getOneCustomer)
    .then(function(response:AxiosResponse<ICustomer>):void{ // hvis det går godt
        console.log(response);
        let customer: ICustomer = response.data;
        let result:string = "<ol>" + "<li>" + "<b>Id</b>: " + customer.id + " " + "<b>Firstname</b>: " + customer.firstName +" " + "<b>Lastname</b>: " + customer.lastName +" "+ "<b>Year</b>: " + customer.year + "</li>" + "</ol>";

        oneCustomer.innerHTML = result; // Customer bliver fremvist nu.
    })
    .catch(function(error:AxiosError):void{ // hvis det går dårligt
        {
        oneCustomer.innerHTML = error.message;
        }

    })
}
    
     /**
     * 
     * Axios Post request
     * 
     */
        function addCustomer():void{
            
            let addFnameElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addFname");
            let addLnameElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addLname");
            let addYearElement: HTMLInputElement = <HTMLInputElement> document.getElementById("addYear");

            
            let myFname:string = addFnameElement.value;//caster string til Number - man kan også bare putte  plus foran eksmpel +addPriceElement.value
            let myLname:string = addLnameElement.value;
            let myYear:number = Number (addYearElement.value);//caster string til Number - man kan også bare putte  plus foran eksmpel +addPriceElement.value

            axios.post<ICustomer[]>(uri, {firstname:myFname, lastname:myLname, year:myYear})//[] objekt der bliver lavet og sendt 
            .then((response:AxiosResponse) => {
                console.log(response);
                
            })
            .catch((error:AxiosError)=>{
                console.log(error);
            })
         }
    /**
     * 
     * Axios Delete request
     * 
     */
    function deleteCustomer():void{

        let customerDelete: number = Number((<HTMLInputElement> document.getElementById("deleteInput")).value); //caster til html og bagefter caster valuen til number
        axios.delete(uri + "/" + customerDelete)
        .then( function(respone: AxiosResponse) {
            console.log(respone);
        })
        .catch(function(error: AxiosError){
            console.log(error);
        });


    }
    
