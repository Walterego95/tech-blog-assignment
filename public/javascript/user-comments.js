//edit comment...
async function editFormHandler(event) {
    event.preventDefault();
    //comment text...
    const comments_text = document.querySelector('input[name="comment-content"]').value.trim();
    //comment id...
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1];
    
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        comments_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //after editing old comment take back to comments...
    if (response.ok) {
      document.location.replace('/dashboard/user-comments/');
    } else {
      alert(response.statusText);
    }
  }
  
  //save button listener...
  document.querySelector('.edit-comment').addEventListener('submit', editFormHandler);