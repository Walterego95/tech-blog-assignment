//delete post...
async function deleteFormHandler(event) {
    event.preventDefault();

    //get id from url...
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });

    //if delete ok, go back to post...
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }

  //submit deletion button...
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
  