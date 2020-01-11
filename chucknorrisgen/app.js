document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {

  const number = document.querySelector('#number').value;

  if (parseInt(number) > 0) {
    
    const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      let output = '';

      if (response.type === 'success') {
        response.value.forEach(function(joke) {
          output += `<li class="list-group-item bg-light text-dark">${joke.joke}</li>`
        })

        document.querySelector('.jokes').innerHTML = output;
        
      }

      else {
        output += '<li>Something went wrong...</li>';
      }
      
      console.log(response);
    }
  }

  xhr.send();
  e.preventDefault();
  }

  else {
    showError("test");
  }

}

function showError(error) {
  //Create a div
  const errorDiv = document.createElement('div');

  //Add class
  errorDiv.className = 'alert alert-danger';

  //Add UI Var
  const warning = document.querySelector('.warning-area');
  const heading = document.querySelector('.heading');

  //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
    warning.insertBefore(errorDiv, heading);
  
  //Clear error after 3 seconds
   setTimeout(clearError, 20000);
  }

 function clearError() {
   document.querySelector('.alert').remove();
 }