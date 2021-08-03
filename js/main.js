import 'bootstrap/dist/css/bootstrap.min.css';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
   apiKey: "AIzaSyBmN8uZV2S8PCLCRDzT-fH-nxqveTALhSg",
   authDomain: "fir-project-fc4da.firebaseapp.com",
   projectId: "fir-project-fc4da",
   storageBucket: "fir-project-fc4da.appspot.com",
   messagingSenderId: "714438861798",
   appId: "1:714438861798:web:e46b149876d6eeec136c27"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

db.collection("actors").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        const mylist = document.getElementById('mylist');
        // mylist.classList.add('list-group-flush');
        const list = document.createElement('li');
        list.classList.add('list-group-item');
        list.classList.add('list-group-item-dark');
        mylist.appendChild(list);
        const div1 = document.createElement('div');
        const myData = doc.data();
        div1.innerHTML = myData.first_name + " " + myData.last_name;
        list.appendChild(div1);

        const div2 = document.createElement('div');
        const but1 = document.createElement('button');
        but1.classList.add('btn');
        but1.classList.add('btn-dark');
        but1.innerHTML="details";
        list.appendChild(div2);
        div2.appendChild(but1);
        but1.addEventListener("click",function(){
            // div1.innerHTML = myData.first_name + " " + myData.last_name + ",  Rating: " +myData.rating + ",  Industry: " + myData.industry;
            window.alert("this is " + myData.first_name + " " + myData.last_name + " Details:\nFirst_name : " + myData.first_name+"\nSecond_name : " + myData.last_name + "\nRating : " + myData.rating + "\nIndustry : "+myData.industry);

        })

        const but2 = document.createElement('button');
        but2.classList.add('btn');
        but2.classList.add('btn-danger');
        but2.innerHTML="edit";
        div2.appendChild(but2);
        but2.addEventListener("click",function(){
            var fname= prompt("Enter your firstname:","");
            var lname= prompt("Enter your lastname:","");
            div1.innerHTML = myData.first_name + " " + myData.last_name;
        })

        const but3 = document.createElement('button');
        but3.classList.add('btn');
        but3.classList.add('btn-dark');
        but3.innerHTML="delete";
        div2.appendChild(but3);
        but3.addEventListener("click",function(){
            myData.first_name=" ";
            myData.last_name=" ";
            list.innerHTML=myData.first_name+myData.last_name;
        });

        const but4 = document.createElement('button');
        but4.classList.add('btn');
        but4.classList.add('btn-danger');
        but4.innerHTML="add";
        div2.appendChild(but4);
        but4.addEventListener("click",function(){
            var fname= prompt("Enter your firstname:","");
            var lname= prompt("Enter your lastname:","");
            var rating = prompt("Enter your rating:","");
            var industry = prompt("Enter your industry:","");
            list.innerHTML=myData.first_name+myData.last_name;
            db.collection("actors").add({
                first_name: fname ,
                last_name: lname,
                rating : rating ,
                industry : industry

            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        });
    });
});

