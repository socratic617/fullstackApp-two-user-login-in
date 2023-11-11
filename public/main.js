var trash = document.getElementsByClassName("trash");
var moodUpdate = document.getElementsByClassName("moodUpdate")

// // document.querySelector('#create').addEventListener('click', addUserDetails)

// // function addUserDetails(){

// // }

Array.from(moodUpdate).forEach(function(element) {
  console.log("wanting to update mood : ", element);

    element.addEventListener('click', function(){
      console.log('MOOD UPDATE : ')
      console.log("this.id : " , this.id )
      // console.log("before my fetch loggedInUserId :")
      // console.log( document.querySelector('#loggedInUserId'))
      // fetch('recipes', {
      //   method: 'put',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     id: this.id, //this(button) is what got triggered
      //     loggedInUserId: document.querySelector('#loggedInUserId').innerText
      //   })
      // }).then(function (response) {
      //   window.location.reload()
      // })
    });
});


Array.from(trash).forEach(function(element) {
  console.log("adding delete listner too : ", element);

    element.addEventListener('click', function(){

      fetch('feelings', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.id //this(button) is what got triggered
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});
