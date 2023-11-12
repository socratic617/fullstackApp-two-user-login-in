var trash = document.getElementsByClassName("trash"); // creating a class "trash" to add to my profile.ejs to delete my row for the post working hand in hand w/ id="<%= feelings[i]._id %> which is the unique post of user , this returns a HTMLCollection objects that stores the elements(as objects)  that have the class "trash"
var moodUpdate = document.getElementsByClassName("actions-button") //creating a class "moodUpdate" to add to my profile.ejs to edit mood for my row to help with 'put' method working hand in hand w/ id="<%= feelings[i]._id %> which is the unique post of user 

let currentRowid = "";// created this variable to identify what row the user selects to cater any changes but only gives it a value until the click on that actions button (refer to "Array.from(moodUpdate) ") default why its a global variable 

console.log("Moodupdate:")
console.log(moodUpdate)
document.querySelector('.updatebtn').addEventListener('click', submitUpdate) // adding event listener to my update mood btn

function submitUpdate(){ //this is the function tht runs whe clicking mood Update btn 

  let mood = document.querySelector('#mood').value;// this stores the value of what user select for mood ex: happy tired sad happy etc..
  console.log("this is my new mood : ", mood)
  console.log("this.id  for submit update: " , this.id )

  fetch('feelings', { // this information will be sent to server
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: currentRowid, //this(button) is what got triggered and this is how i will the object in my database 
      currentMood: mood // this will be updating my current mood in server 
    })
  }).then(function (response) {
    window.location.reload()
  })

}

//This is triggered by the ACTIONS BUTTON
Array.from(moodUpdate).forEach(function(element) {// this is an array of like objects 
  console.log("wanting to update mood : ", element);

    element.addEventListener('click', function(){
      console.log('MOOD UPDATE : ')
      console.log(this)
      console.log("this.id : " , this.id )
      currentRowid = this.id // this is me assigning it when i click the actions 
      // this adds the id to my update mood btn of that specific row by using this.id 

      // let currentMood = this.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].childNodes[5].innerText;
      
  
    // //   console.log( document.querySelector('#loggedInUserId'))

    });
});


Array.from(trash).forEach(function(element) {// for each element on the array i want you to perform this action on it (spcfically the element like objects that have class trash )
  console.log("adding delete listner too : ", element);

    element.addEventListener('click', function(){

      fetch('feelings', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: currentRowid  //this(button) is what got triggered
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});
