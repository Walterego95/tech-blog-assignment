//delete comment...
async function deleteFormHandler(event) {
    event.preventDefault();
  
    //get id from url...
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1];
  
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE'
    });
    //if comment deleted, show ok response...
    if (response.ok) {
      document.location.replace('/dashboard/user-comments/');
    } else {
      alert(response.statusText);
    }
  }
  //submit deletion button...
  document.querySelector('#delete-comments-btn').addEventListener('click', deleteFormHandler);